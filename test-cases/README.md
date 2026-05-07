# TBO Flight API — Certification Test Cases

## Booking Flow (all cases must follow this pathway)

```
1. Authenticate  →  2. Search  →  3. FareRule  →  4. FareQuote
→  5. SSR (optional, LCC/NDC cases)
→  6. Book (Non-LCC / GDS only)
→  7. Ticket  →  8. GetBookingDetails
```

- **LCC**  (IsLCC=true):  Search → FareRule → FareQuote → SSR (optional) → **Ticket** → GetBookingDetails
- **Non-LCC / GDS** (IsLCC=false): Search → FareRule → FareQuote → SSR (optional) → **Book → Ticket** → GetBookingDetails

---

## API Endpoints

| Service | Base URL |
|---------|----------|
| Authenticate | `https://sharedapi.tektravels.com/SharedData.svc/rest/Authenticate` |
| Search | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search` |
| FareRule | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareRule` |
| FareQuote | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareQuote` |
| SSR | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/SSR` |
| Book | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Book` |
| Ticket | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket` |
| GetBookingDetails | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/GetBookingDetails` |
| GetCalendarFare | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/GetCalendarFare` |
| UpdateCalendarFareOfDay | `https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/UpdateCalendarFareOfDay` |

---

## Mandatory Test Cases (submit all 5 for certification)

| Case | Type | Route | Pax |
|------|------|-------|-----|
| [01](./case-01/README.md) | GDS Domestic Oneway | DEL → BOM | 1A |
| [02](./case-02/README.md) | LCC Domestic Oneway + SSR | DEL → BOM | 1A + 1C + 1I |
| [03](./case-03/README.md) | LCC Domestic Return | DEL ↔ BOM | 2A + 2C + 1I |
| [04](./case-04/README.md) | LCC International Oneway + SSR | DEL → DXB | 1A + 1C + 1I |
| [05](./case-05/README.md) | GDS International Return | DEL ↔ LHR | 2A + 2C + 1I |

## Additional Cases

| Case | Type | Route | Pax |
|------|------|-------|-----|
| [06](./case-06/README.md) | LCC Domestic Special Return | DEL ↔ BOM | 2A + 1C |
| [07](./case-07/README.md) | GDS Domestic Special Return + SSR | DEL ↔ BOM | 2A + 2C + 1I |
| [08](./case-08/README.md) | GDS Multiway | DEL → BOM → MAA | 2A |
| [09](./case-09/README.md) | Domestic Oneway + Calendar Fare | DEL → BOM | 2A |
| [10](./case-10/README.md) | GDS Advance Search (PriceRBD) | DEL → BOM | 2A |
| [11](./case-11/README.md) | NDC International Oneway + SSR | DEL → LHR | 2A + 2C |
| [12](./case-12/README.md) | NDC International Return | DEL ↔ LHR | 2A + 2C |

---

## Per-Case Submission Format

Send each case **separately** to the TBO API team. Each submission must include:

1. **Full JSON request** for every API call in the case
2. **Full JSON response** for every API call (copy from logs)
3. **PNR number(s)** generated
4. **Ticket number(s)** issued
5. **BookingId** from GetBookingDetails

File naming convention: `Case-NN_<Description>_Request.json` + `Case-NN_<Description>_Response.json`

---

## Capturing Logs

The server adapter writes request/response logs. To capture:

```bash
# Set in .env.local
TBO_LOG=true

# Run dev server, make the booking, capture terminal output
# All request/response bodies are logged in JSON
```

---

## Key Rules (from Sample Verification)

1. **TokenId and TraceId must be the same throughout one booking session.** Do not re-authenticate mid-booking.
2. Use the TraceId from **Search response** in FareRule, FareQuote, SSR.
3. Use the TraceId from **FareQuote response** in Book and Ticket (it may be refreshed).
4. `IsLeadPax: true` for exactly **one** passenger (the first in the array).
5. Title must match Gender: `Mr` → Gender 1, `Mrs`/`Ms`/`Miss` → Gender 2, `Mstr` → Gender 1 (child/infant male).
6. **LCC SSR** (Baggage, MealDynamic, SeatDynamic) must be passed as arrays `[ ]` — never objects `{ }`.
7. **Non-LCC SSR** (Meal, Seat preferences) must be passed as objects `{ }` — never arrays.
8. Infants must **not** receive Baggage or Seat SSR — only Meal is allowed.
9. DOB is mandatory for all Child and Infant passengers; optional for domestic Adult.
10. Passport details are mandatory for all International passengers (Adult, Child, Infant).
11. Fare per passenger = `FareBreakdown[PaxType].BaseFare / PassengerCount` (same for Tax, YQTax).

---

## Passenger Master Reference

Used across all cases. Substitute where pax count differs.

### Adults
| Ref | Title | First | Last | Gender | DOB | Passport | Exp |
|-----|-------|-------|------|--------|-----|----------|-----|
| A1 | Mr | RAHUL | SHARMA | 1 | 1985-03-15 | Z1234567 | 2030-12-31 |
| A2 | Mrs | PRIYA | SHARMA | 2 | 1988-07-22 | Z7654321 | 2030-06-30 |
| A3 | Mr | AMIT | KUMAR | 1 | 1982-11-08 | Y1234567 | 2031-03-15 |
| A4 | Ms | NEHA | SINGH | 2 | 1990-04-12 | Y7654321 | 2031-09-20 |

### Children (2–12 yrs)
| Ref | Title | First | Last | Gender | DOB | Passport | Exp |
|-----|-------|-------|------|--------|-----|----------|-----|
| C1 | Mstr | ROHAN | SHARMA | 1 | 2017-05-10 | Z5555555 | 2030-12-31 |
| C2 | Miss | RIYA | SHARMA | 2 | 2016-08-20 | Z6666666 | 2030-12-31 |
| C3 | Mstr | ARJUN | KUMAR | 1 | 2018-02-14 | Y5555555 | 2031-03-15 |
| C4 | Miss | ANANYA | SINGH | 2 | 2019-09-06 | Y6666666 | 2031-09-20 |

### Infant (< 2 yrs)
| Ref | Title | First | Last | Gender | DOB | Passport | Exp |
|-----|-------|-------|------|--------|-----|----------|-----|
| I1 | Mstr | KABIR | SHARMA | 1 | 2025-01-20 | Z9999999 | 2030-12-31 |
