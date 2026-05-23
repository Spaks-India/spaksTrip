#!/usr/bin/env node
/**
 * TBO Certification Test Runner
 *
 * Usage:
 *   TBO_USERNAME=your_user TBO_PASSWORD=your_pass node run-tbo-tests.js [case_number]
 *
 *   case_number  1-12 to run a specific case, omit to choose interactively
 *
 * After each Search step the runner prints available flights and prompts you
 * to paste the ResultIndex of the flight you want to proceed with.
 *
 * Responses are saved to ./tbo-results/<case>/<step>.json
 */

"use strict";

const fs    = require("fs");
const path  = require("path");
const rl    = require("readline").createInterface({ input: process.stdin, output: process.stdout });

// ─── helpers ────────────────────────────────────────────────────────────────

const ask = (q) => new Promise((res) => rl.question(q, res));

function colour(code, text) { return `\x1b[${code}m${text}\x1b[0m`; }
const bold  = (t) => colour("1",  t);
const green = (t) => colour("32", t);
const cyan  = (t) => colour("36", t);
const red   = (t) => colour("31", t);
const dim   = (t) => colour("2",  t);

function safeJson(text) {
  try { return JSON.parse(text); } catch { return null; }
}

// ─── collection loader ───────────────────────────────────────────────────────

const COLLECTION_PATH = path.join(__dirname, "test-cases", "TBO_Certification_Tests.postman_collection.json");

function loadCollection() {
  const raw = fs.readFileSync(COLLECTION_PATH, "utf8");
  return JSON.parse(raw);
}

// ─── variable store ──────────────────────────────────────────────────────────

let VARS = {};
let GLOBAL_VARS = {};  // snapshot of collection-level variables; rebuilt at case reset

function initVars(collection) {
  for (const v of collection.variable || []) {
    VARS[v.key] = v.value || "";
  }
  // override credentials from environment
  if (process.env.TBO_USERNAME) VARS.TBO_USERNAME = process.env.TBO_USERNAME;
  if (process.env.TBO_PASSWORD) VARS.TBO_PASSWORD = process.env.TBO_PASSWORD;
  GLOBAL_VARS = { ...VARS };
}

function substitute(str) {
  if (!str) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => VARS[key] !== undefined ? VARS[key] : `{{${key}}}`);
}

// ─── pm shim ─────────────────────────────────────────────────────────────────

function makePm(responseText, statusCode) {
  const json = safeJson(responseText);
  return {
    response: {
      json:  () => json,
      text:  () => responseText,
      code:  statusCode,
      to: { have: { status: (code) => { if (statusCode !== code) throw new Error(`Expected ${code}, got ${statusCode}`); } } },
    },
    collectionVariables: {
      set: (k, v) => { VARS[k] = v; },
      get: (k)    => VARS[k] !== undefined ? VARS[k] : "",
    },
    test: (name, fn) => {
      try   { fn(); process.stdout.write(green("  ✓ ") + dim(name) + "\n"); }
      catch (e) { process.stdout.write(red("  ✗ ") + dim(name) + " — " + e.message + "\n"); }
    },
  };
}

function runTestScript(events, responseText, statusCode) {
  const ev = (events || []).find((e) => e.listen === "test");
  if (!ev) return;
  const script = ev.script.exec.join("\n");
  const pm = makePm(responseText, statusCode);
  try {
    // eslint-disable-next-line no-new-func
    new Function("pm", "console", script)(pm, {
      log:  (...a) => console.log(dim("  [pm] ") + a.join(" ")),
      warn: (...a) => console.warn(dim("  [pm] ") + a.join(" ")),
    });
  } catch (e) {
    console.error(red(`  [script error] `) + e.message);
  }
}

// ─── HTTP helper ─────────────────────────────────────────────────────────────

async function httpPost(url, body) {
  const res  = await fetch(url, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const text = await res.text();
  return { status: res.status, text };
}

// ─── search result display ───────────────────────────────────────────────────

// Returns { OB: Map<displayNum, ResultIndex>, IB: Map<displayNum, ResultIndex> }
// so the prompt can resolve a typed number to the full ResultIndex.
function displaySearchResults(json, savedFilePath) {
  const results = json?.Results ?? json?.Response?.Results;
  const indexMaps = { OB: new Map(), IB: new Map() };

  if (!results || !results.length) {
    console.log(red("  No Results found in response."));
    if (savedFilePath) console.log(dim("  Full response saved to: ") + savedFilePath);
    return indexMaps;
  }

  // Results[0] being an array means it's a return trip: Results[0]=OB, Results[1]=IB
  const directions = Array.isArray(results[0]) ? results : [results];

  directions.forEach((dirResults, dirIdx) => {
    const label  = directions.length > 1 ? (dirIdx === 0 ? "OUTBOUND" : "INBOUND") : "RESULTS";
    const mapKey = dirIdx === 0 ? "OB" : "IB";
    console.log("\n" + bold(cyan(`  ── ${label} (${dirResults.length} flights) ──`)));

    dirResults.forEach((flight, i) => {
      const f    = Array.isArray(flight) ? flight[0] : flight;
      if (!f) return;

      const num  = i + 1;
      const seg0 = f.Segments?.[0]?.[0] || f.Segments?.[0] || {};
      const orig = seg0.Origin?.Airport?.AirportCode     || "?";
      const dest = seg0.Destination?.Airport?.AirportCode || "?";
      const dep  = seg0.Origin?.DepTime?.replace("T", " ").slice(0, 16)      || "?";
      const arr  = seg0.Destination?.ArrTime?.replace("T", " ").slice(0, 16) || "?";
      const al   = (f.AirlineCode || seg0.Airline?.AirlineCode || "?") +
                   " " + (seg0.Airline?.FlightNumber || "");
      const fare = f.Fare?.TotalFare || f.Fare?.PublishedFare || "?";
      const lcc  = f.IsLCC ? "LCC" : "GDS";
      const idx  = f.ResultIndex || "";

      indexMaps[mapKey].set(num, idx);

      console.log(
        `\n  [${String(num).padStart(3)}] ${bold(al.trim().padEnd(10))}` +
        `  ${orig}→${dest}  dep ${dep}  arr ${arr}  INR ${fare}  ${dim(lcc)}`
      );
    });
  });

  console.log();
  if (savedFilePath) console.log(dim("  Full response saved to: ") + savedFilePath);
  console.log();

  return indexMaps;
}

// ─── conditional step logic ──────────────────────────────────────────────────

function shouldSkipStep(stepName) {
  const name = stepName.toLowerCase();
  const isLCC = VARS.IS_LCC === "true";

  if (name.includes("skip if lcc") && isLCC)       return "IS_LCC=true, skipping Non-LCC step";
  if (name.includes("skip if non-lcc") && !isLCC)  return "IS_LCC=false, skipping LCC step";
  if (name.includes("skip step 7a") && isLCC)       return "IS_LCC=true, skipping Non-LCC steps";
  if (name.includes("skip 6a/6b") && !isLCC)        return "IS_LCC=false, skipping Non-LCC steps";
  if (name.includes("skip 5a/5b") && !isLCC)        return "IS_LCC=false, skipping Non-LCC steps";
  if (name.includes("skip step 6a") && isLCC)       return "IS_LCC=true, skipping Non-LCC step";
  if (name.includes("if non-lcc") && isLCC)         return "IS_LCC=true, skipping Non-LCC step";
  if (name.includes("if lcc") && !isLCC)            return "IS_LCC=false, skipping LCC step";

  return null;
}

function isSearchStep(stepName) {
  return /search|calendar fare/i.test(stepName);
}

// JT=5 (LCC Domestic Special Return): the search response returns a single
// OB-prefixed ResultIndex that encodes BOTH legs. The supplier rejects
// comma-separated indexes ("error 3: combination not allowed"), so FareQuote
// and FareRule for JT=5 must carry exactly the OB token in `ResultIndex` and
// no Onward/ReturnResultIndex fields. JT=2 and all other types pass through —
// the collection already carries the correct shape for those.
//
// JOURNEY_TYPE is sourced from the Search REQUEST body (see runStep), not
// derived from the number of Segments, because JT=2 and JT=5 can both ship
// two segments and only the request value distinguishes them.
function mutateBodyForJourneyType(stepName, body) {
  if (VARS.JOURNEY_TYPE !== "5") return body;
  if (!/farequote|farerule/i.test(stepName)) return body;

  const json = safeJson(body);
  if (!json) return body;

  const ob = VARS.OB_RESULT_INDEX || VARS.RESULT_INDEX;
  if (!ob) return body;

  json.ResultIndex = ob;
  delete json.OnwardResultIndex;
  delete json.ReturnResultIndex;
  return JSON.stringify(json);
}

async function promptSearchVars(stepName, folderName, responseJson, savedFilePath) {
  displaySearchResults(responseJson, savedFilePath);

  if (/getcalendarfare|calendar/i.test(stepName)) return; // BEST_DATE auto-captured

  // Cases 03, 06, 07 need OB + IB separately.
  // Case 03: folder name contains "dual-pnr"
  // Case 06, 07: step name contains "JT=5"
  // All other cases (including single-PNR returns like Case 05, 12) use a single RESULT_INDEX.
  const needsOBIB   = /dual.pnr/i.test(folderName) || /jt=5/i.test(stepName);
  const isAdvance   = /jt=4|advance search/i.test(stepName);

  if (needsOBIB) {
    VARS.OB_RESULT_INDEX = await askResultIndex("OB_RESULT_INDEX (Outbound)");
    console.log(green("  ✓ OB_RESULT_INDEX set"));
    VARS.IB_RESULT_INDEX = await askResultIndex("IB_RESULT_INDEX (Inbound)");
    console.log(green("  ✓ IB_RESULT_INDEX set"));
  } else if (isAdvance) {
    VARS.SEARCH_RESULT_INDEX = await askResultIndex("SEARCH_RESULT_INDEX");
    console.log(green("  ✓ SEARCH_RESULT_INDEX set"));
  } else {
    VARS.RESULT_INDEX = await askResultIndex("RESULT_INDEX");
    console.log(green("  ✓ RESULT_INDEX set"));
  }
}

async function askResultIndex(label) {
  while (true) {
    const input = (await ask(`  Paste ${label}: `)).trim();
    if (input) return input;
    console.log(red("  [!] Cannot be empty, try again."));
  }
}

// ─── save result ─────────────────────────────────────────────────────────────

function saveResult(caseNum, stepName, status, body) {
  const dir = path.join(__dirname, "tbo-results", `case-${String(caseNum).padStart(2, "0")}`);
  fs.mkdirSync(dir, { recursive: true });
  const safe = stepName.replace(/[^a-zA-Z0-9]/g, "_").replace(/__+/g, "_").toLowerCase();
  const file = path.join(dir, `${safe}.json`);
  const json = safeJson(body);
  fs.writeFileSync(file, JSON.stringify({ status, response: json || body }, null, 2));
  return file;
}

// ─── run a single step ───────────────────────────────────────────────────────

async function runStep(step, caseNum, stepIdx, folderName) {
  const name = step.name;
  const skipReason = shouldSkipStep(name);

  console.log("\n" + bold(`  Step ${stepIdx}: ${name}`));

  if (skipReason) {
    console.log(dim(`  ⟳ SKIPPED — ${skipReason}`));
    return;
  }

  const urlRaw  = typeof step.request.url === "string" ? step.request.url : step.request.url?.raw;
  let   url     = substitute(urlRaw);
  const rawBody = step.request?.body?.raw;
  let   body    = rawBody ? substitute(rawBody) : undefined;

  // Warn about any {{VAR}} placeholders that are still unresolved (empty value)
  if (rawBody) {
    const missing = [...rawBody.matchAll(/\{\{(\w+)\}\}/g)]
      .map(m => m[1])
      .filter(k => !VARS[k]);
    if (missing.length) {
      console.log(red(`  [!] Empty variables in request: `) + missing.join(", "));
    }
  }

  // Capture JourneyType from the search REQUEST body (not the response — JT=2
  // and JT=5 can both ship two Segments, only the request value disambiguates).
  if (isSearchStep(name) && body) {
    const reqJson = safeJson(body);
    const jt = reqJson?.JourneyType;
    if (jt !== undefined && jt !== null) {
      VARS.JOURNEY_TYPE = String(jt);
      console.log(green("  ✓ JOURNEY_TYPE captured: ") + cyan(VARS.JOURNEY_TYPE));
    }
  }

  // For JT=5 FareQuote/FareRule, rewrite ResultIndex shape before POST.
  if (body) body = mutateBodyForJourneyType(name, body);

  // GDS two-step promotion: TBO rejects direct /Ticket for GDS suppliers
  // ("Direct Ticket not allowed. Do booking first and then ticket"). If this
  // step is an LCC-direct-issue Ticket (Passengers payload to /Ticket), POST
  // to /Book instead; after Book we'll conditionally fire /Ticket if IS_LCC=false.
  // Cases that already use the Book→Ticket two-step (Passengers→/Book, PNR/BookingId→/Ticket)
  // are unaffected because their /Ticket body has no Passengers field.
  let promotedFromTicket = false;
  if (/\/Ticket(\?|$)/i.test(url) && /"Passengers"\s*:/.test(body || "")) {
    url = url.replace(/\/Ticket(\?|$)/i, "/Book$1");
    promotedFromTicket = true;
    console.log(dim("  ↪ Promoting /Ticket to /Book (will issue Ticket separately if GDS)"));
  }

  // Pre-flight: warn if Ticket is about to POST with empty SSR bag/meal vars
  if (/ticket/i.test(name) && rawBody?.includes("{{ADT_BAG_CODE}}")) {
    const emptySSR = ["ADT_BAG_CODE","CHD_BAG_CODE","ADT_MEAL_CODE","CHD_MEAL_CODE","INF_MEAL_CODE"]
      .filter(k => !VARS[k]);
    if (emptySSR.length) {
      console.log(red(`  [!] Ticket: ${emptySSR.length} SSR vars still empty — SSR step may not have captured correctly.`));
      console.log(dim(`      Empty: ${emptySSR.join(", ")}`));
      console.log(dim("      Sending anyway; expect TBO error if SSR is mandatory for this LCC."));
    }
  }

  console.log(dim(`  → POST ${url}`));

  let result;
  try {
    result = await httpPost(url, body);
  } catch (e) {
    console.error(red(`  [network error] `) + e.message);
    return;
  }

  const json  = safeJson(result.text);
  const saved = saveResult(caseNum, name, result.status, result.text);

  // Status line
  const statusColour = result.status === 200 ? green : red;
  console.log(statusColour(`  ← HTTP ${result.status}`) + dim(`  (saved to ${path.relative(__dirname, saved)})`));

  // API-level error — check both root-level (Authenticate) and nested (all other endpoints)
  const apiErr = json?.Error ?? json?.Response?.Error;
  if (apiErr?.ErrorCode && apiErr.ErrorCode !== 0 && apiErr.ErrorCode !== "0") {
    console.log(red(`  [API error ${apiErr.ErrorCode}] `) + (apiErr.ErrorMessage || ""));
  }

  // Run embedded test/postman scripts
  runTestScript(step.event, result.text, result.status);

  // Fallback FQ_RESULT_INDEX capture — PM script looks for r.Response.Results.ResultIndex
  // but Results may be an array; handle both shapes.
  if (/farequote/i.test(name) && json && result.status === 200) {
    const res = json?.Response?.Results;
    const fqIdx = (Array.isArray(res) ? res[0]?.ResultIndex : res?.ResultIndex)
               ?? json?.Results?.[0]?.ResultIndex
               ?? json?.Results?.ResultIndex;
    if (fqIdx) {
      VARS.FQ_RESULT_INDEX = fqIdx;
      console.log(green("  ✓ FQ_RESULT_INDEX captured: ") + cyan(fqIdx.slice(0, 60)));
    }
    const traceId = json?.Response?.TraceId ?? json?.TraceId;
    if (traceId) {
      VARS.FQ_TRACE_ID = traceId;
    }
    // IS_LCC fallback — the collection PM script reads r.Response.Results.IsLCC,
    // which misses the array form. Capture both shapes here.
    const isLcc = Array.isArray(res) ? res[0]?.IsLCC : res?.IsLCC;
    if (isLcc !== undefined && isLcc !== null) {
      VARS.IS_LCC = String(isLcc);
      console.log(green("  ✓ IS_LCC captured: ") + cyan(VARS.IS_LCC));
    }
  }

  // Fallback token capture — real TBO Authenticate returns TokenId at root,
  // not at r.Response.TokenAgentDetails.TokenId as the collection script assumes.
  if (/authenticate/i.test(name) && json) {
    const tokenId = json.TokenId ?? json.Response?.TokenId ?? json.Response?.TokenAgentDetails?.TokenId;
    if (tokenId) {
      VARS.TOKEN = tokenId;
      console.log(green("  ✓ TOKEN captured: ") + cyan(tokenId));
    }
    // surface auth errors
    const errCode = json.Error?.ErrorCode ?? json.Response?.Error?.ErrorCode;
    const errMsg  = json.Error?.ErrorMessage ?? json.Response?.Error?.ErrorMessage;
    if (errCode && errCode !== 0 && errCode !== "0") {
      console.log(red(`  [auth error ${errCode}] `) + errMsg);
    }
  }

  // Fallback SSR capture — TBO returns Baggage/MealDynamic at Response root as
  // list[list[option]] (outer=segment, inner=option choices), NOT as SSRDetails.
  // The PM script looks for SSRDetails which never exists, so capSSR silently no-ops.
  if (/\bssr\b/i.test(name) && json && result.status === 200) {
    const r = json?.Response;
    const bagSeg0  = Array.isArray(r?.Baggage?.[0])     ? r.Baggage[0]     : null;
    const mealSeg0 = Array.isArray(r?.MealDynamic?.[0]) ? r.MealDynamic[0] : null;

    const pickBag  = bagSeg0?.find( b => b.Price > 0 && b.Code !== "NoBaggage") ?? bagSeg0?.[0];
    const pickMeal = mealSeg0?.find(m => m.Price > 0 && m.Code !== "NoMeal")    ?? mealSeg0?.[0];

    if (pickBag) {
      for (const pfx of ["ADT", "CHD"]) {
        VARS[`${pfx}_BAG_CODE`]    = pickBag.Code           || "";
        VARS[`${pfx}_BAG_WEIGHT`]  = String(pickBag.Weight  ?? 0);
        VARS[`${pfx}_BAG_PRICE`]   = String(pickBag.Price   ?? 0);
        VARS[`${pfx}_BAG_ORIGIN`]  = pickBag.Origin         || "";
        VARS[`${pfx}_BAG_DEST`]    = pickBag.Destination    || "";
        VARS[`${pfx}_BAG_AIRLINE`] = pickBag.AirlineCode    || "";
        VARS[`${pfx}_BAG_FLIGHT`]  = pickBag.FlightNumber   || "";
        VARS[`${pfx}_BAG_WAYTYPE`] = String(pickBag.WayType ?? 1);
      }
      console.log(green("  ✓ SSR BAG (ADT/CHD): ") + cyan(`${pickBag.Code}  ${pickBag.Weight}kg  INR ${pickBag.Price}`));
    }
    if (pickMeal) {
      for (const pfx of ["ADT", "CHD", "INF"]) {
        VARS[`${pfx}_MEAL_CODE`]    = pickMeal.Code                || "";
        VARS[`${pfx}_MEAL_DESC`]    = pickMeal.AirlineDescription  || "";
        VARS[`${pfx}_MEAL_PRICE`]   = String(pickMeal.Price        ?? 0);
        VARS[`${pfx}_MEAL_ORIGIN`]  = pickMeal.Origin              || "";
        VARS[`${pfx}_MEAL_DEST`]    = pickMeal.Destination         || "";
        VARS[`${pfx}_MEAL_AIRLINE`] = pickMeal.AirlineCode         || "";
        VARS[`${pfx}_MEAL_FLIGHT`]  = pickMeal.FlightNumber        || "";
      }
      console.log(green("  ✓ SSR MEAL (ADT/CHD/INF): ") + cyan(`${pickMeal.Code}  "${pickMeal.AirlineDescription}"  INR ${pickMeal.Price}`));
    }
    if (!pickBag && !pickMeal) {
      console.log(red("  [!] SSR: no Baggage/MealDynamic in response — Ticket SSR vars will be empty"));
    }
  }

  // After Search, show results and prompt for ResultIndex
  if (isSearchStep(name) && json) {
    await promptSearchVars(name, folderName || "", json, path.resolve(saved));
  }

  // GDS Book→Ticket follow-up. If we promoted this step from /Ticket to /Book,
  // the request's own PM script already populated BOOKING_ID / PNR via the
  // FlightItinerary block (Book and Ticket share the same response shape).
  // Now decide on the follow-up:
  //   IS_LCC=true  → Book auto-issued the ticket, nothing more to do.
  //   IS_LCC=false → POST { TokenId, TraceId, PNR, BookingId, Passport: [] }
  //                  to the original /Ticket URL.
  if (promotedFromTicket && result.status === 200 && !(apiErr?.ErrorCode && apiErr.ErrorCode !== 0 && apiErr.ErrorCode !== "0")) {
    // Book response shape: { Response: { Error, TraceId, Response: { PNR, BookingId, FlightItinerary } } }
    // The collection PM script reads Response.FlightItinerary (one level too shallow), so
    // BOOKING_ID/PNR don't end up in VARS for Case 06. Pull directly from the response.
    const bookInner = json?.Response?.Response ?? json?.Response;
    const fi        = bookInner?.FlightItinerary ?? null;
    const bookingId = bookInner?.BookingId ?? fi?.BookingId;
    const pnr       = bookInner?.PNR       ?? fi?.PNR;

    if (bookingId !== undefined && bookingId !== null) VARS.BOOKING_ID = String(bookingId);
    if (pnr) VARS.PNR = pnr;
    if (fi?.IsLCC !== undefined && fi.IsLCC !== null && VARS.IS_LCC === undefined) {
      VARS.IS_LCC = String(fi.IsLCC);
    }

    if (VARS.IS_LCC === "false") {
      // BookingId must be an integer for the TBO WCF deserializer — sending it
      // as "" or as a string both fail with "value '' cannot be parsed as Int32".
      const bookingIdNum = Number(bookingId);
      if (!Number.isFinite(bookingIdNum)) {
        console.log(red("  [!] Book response has no usable BookingId; cannot issue Ticket. Inspect the saved Book response."));
        return;
      }
      const ticketUrl  = url.replace(/\/Book(\?|$)/i, "/Ticket$1");
      const ticketBody = JSON.stringify({
        TokenId:   VARS.TOKEN,
        EndUserIp: "1.1.1.1",
        TraceId:   VARS.FQ_TRACE_ID || json?.Response?.TraceId || VARS.TRACE_ID || "",
        PNR:       pnr || "",
        BookingId: bookingIdNum,
        Passport:  [],
      });
      console.log(dim(`  → POST ${ticketUrl}  (GDS: Ticket after Book, BookingId=${bookingIdNum} PNR=${pnr})`));
      let tRes;
      try { tRes = await httpPost(ticketUrl, ticketBody); }
      catch (e) { console.error(red("  [network error] ") + e.message); tRes = null; }

      if (tRes) {
        const tSaved  = saveResult(caseNum, name + " (auto Ticket)", tRes.status, tRes.text);
        const tJson   = safeJson(tRes.text);
        const tColour = tRes.status === 200 ? green : red;
        console.log(tColour(`  ← HTTP ${tRes.status}`) + dim(`  (saved to ${path.relative(__dirname, tSaved)})`));
        const tErr = tJson?.Error ?? tJson?.Response?.Error;
        if (tErr?.ErrorCode && tErr.ErrorCode !== 0 && tErr.ErrorCode !== "0") {
          console.log(red(`  [API error ${tErr.ErrorCode}] `) + (tErr.ErrorMessage || ""));
        } else {
          const tFi = tJson?.Response?.Response?.FlightItinerary ?? tJson?.Response?.FlightItinerary;
          const nums = (tFi?.Passenger || []).map(p => p?.Ticket?.TicketNumber).filter(Boolean);
          if (nums.length) console.log(green("  ✓ Tickets: ") + cyan(nums.join(", ")));
        }
      }
    } else if (VARS.IS_LCC === "true") {
      console.log(dim("  ↪ LCC: Book auto-issued Ticket; skipping separate /Ticket call"));
    } else {
      console.log(red("  [!] IS_LCC unknown after Book — cannot decide Book→Ticket follow-up. Inspect Book response."));
    }
  }

  // Show a brief summary of key captured vars
  const capturedVars = ["TOKEN","TRACE_ID","RESULT_INDEX","OB_RESULT_INDEX","IB_RESULT_INDEX",
    "FQ_TRACE_ID","FQ_TRACE_OB","FQ_TRACE_IB","IS_LCC","BOOKING_ID","PNR",
    "OB_BOOKING_ID","OB_PNR","IB_BOOKING_ID","IB_PNR","BEST_DATE","RBD_RESULT_INDEX",
    "FQ_RESULT_INDEX","SEARCH_RESULT_INDEX"];

  const changed = capturedVars.filter((k) => {
    return VARS[k] && VARS[k] !== "" && VARS[k] !== "0";
  });
  if (changed.length) {
    const preview = changed.slice(0, 6).map((k) => {
      const v = VARS[k];
      return `${cyan(k)}=${v.length > 30 ? v.slice(0, 30) + "…" : v}`;
    }).join("  ");
    console.log(dim("  vars: ") + preview);
  }
}

// ─── run a test case ─────────────────────────────────────────────────────────

async function runCase(caseFolder, caseNum) {
  console.log("\n" + bold(`\n${"─".repeat(60)}`));
  console.log(bold(cyan(`Case ${caseNum}: ${caseFolder.name}`)));
  console.log(bold(`${"─".repeat(60)}\n`));

  if (!VARS.TBO_USERNAME || !VARS.TBO_PASSWORD) {
    console.log(red("  ✗ TBO_USERNAME / TBO_PASSWORD not set."));
    console.log("  Set them via env: TBO_USERNAME=xxx TBO_PASSWORD=yyy node run-tbo-tests.js\n");
    const u = await ask("  TBO_USERNAME: ");
    const p = await ask("  TBO_PASSWORD: ");
    VARS.TBO_USERNAME = u.trim();
    VARS.TBO_PASSWORD = p.trim();
  }

  // Reset per-case vars: start from the collection's original globals only,
  // then restore the small set of values that must survive across cases.
  const KEEP = ["TBO_USERNAME", "TBO_PASSWORD", "BEST_DATE"];
  const kept = {};
  KEEP.forEach((k) => { if (VARS[k]) kept[k] = VARS[k]; });
  VARS = { ...GLOBAL_VARS, ...kept };

  const steps = caseFolder.item || [];
  for (let i = 0; i < steps.length; i++) {
    await runStep(steps[i], caseNum, i + 1, caseFolder.name);

    // Between steps — option to abort
    if (i < steps.length - 1) {
      const next = steps[i + 1].name;
      const ans = await ask(`\n  Continue to step ${i + 2}: "${next}" ? [Y/n/q]: `);
      if (ans.trim().toLowerCase() === "q") { console.log("  Aborted."); process.exit(0); }
      if (ans.trim().toLowerCase() === "n") { console.log("  Stopped after step " + (i + 1)); break; }
    }
  }

  console.log("\n" + green(`  ✓ Case ${caseNum} complete.`) + "\n");
}

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const collection = loadCollection();
  initVars(collection);

  const cases = collection.item;

  // Case number from CLI arg
  let caseArg = parseInt(process.argv[2], 10);

  if (!caseArg || caseArg < 1 || caseArg > cases.length) {
    console.log(bold(cyan("\nTBO Certification Test Runner")));
    console.log(dim("─".repeat(40)));
    cases.forEach((c, i) => {
      console.log(`  ${String(i + 1).padStart(2)}. ${c.name}`);
    });
    console.log();
    const ans = await ask("Select case number (1-" + cases.length + "): ");
    caseArg = parseInt(ans.trim(), 10);
  }

  if (!caseArg || caseArg < 1 || caseArg > cases.length) {
    console.error(red("Invalid case number."));
    process.exit(1);
  }

  await runCase(cases[caseArg - 1], caseArg);

  rl.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
