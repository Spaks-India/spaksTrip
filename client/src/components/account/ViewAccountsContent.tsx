"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { sleep } from "@/services/delay";

type LedgerPeriod = "current" | "custom";
type LedgerType = "credit" | "cash" | "both";
type BulkType = "invoice" | "creditnote";

const ACCOUNT_SUMMARY = [
  { label: "Credit Limit", value: "₹0.00" },
  { label: "Credit Used", value: "₹0.00" },
  { label: "Credit Left", value: "₹0.00" },
  { label: "Cash / Hotel A/c Bal", value: "₹2,257.00" },
];

export default function ViewAccountsContent() {
  const toast = useToast();

  const [ledgerPeriod, setLedgerPeriod] = useState<LedgerPeriod>("current");
  const [ledgerFrom, setLedgerFrom] = useState("");
  const [ledgerTo, setLedgerTo] = useState("");
  const [ledgerType, setLedgerType] = useState<LedgerType>("both");
  const [ledgerLoading, setLedgerLoading] = useState(false);

  const [bulkType, setBulkType] = useState<BulkType>("invoice");
  const [bulkFrom, setBulkFrom] = useState("");
  const [bulkTo, setBulkTo] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);

  const handleViewLedger = async () => {
    setLedgerLoading(true);
    await sleep(1200);
    setLedgerLoading(false);
    toast.push({ title: "Ledger fetched", description: "No entries found for the selected period.", tone: "info" });
  };

  const handleBulkDownload = async (format: "pdf" | "bills") => {
    setBulkLoading(true);
    await sleep(1200);
    setBulkLoading(false);
    toast.push({
      title: "Download ready",
      description: `Your ${bulkType === "invoice" ? "Invoice" : "Credit Note"} ${format === "pdf" ? "PDF" : "bills"} will be emailed to you.`,
      tone: "success",
    });
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-[#0E1E3A] px-5 py-3 rounded-t-xl">
        <h2 className="text-sm font-bold text-white">View Accounts</h2>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {/* Row 1 — Account Summary + Unpaid Invoices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Summary */}
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="text-[13px] font-bold text-[#0E1E3A] mb-3">Account Summary</h3>
            <div className="flex flex-col divide-y divide-zinc-100">
              {ACCOUNT_SUMMARY.map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-zinc-600">{row.label}</span>
                  <span className="text-[13px] font-bold text-[#0E1E3A]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Unpaid Invoices */}
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="text-[13px] font-bold text-[#0E1E3A] mb-3">Unpaid Invoices</h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <svg viewBox="0 0 48 48" width={40} height={40} fill="none" className="text-zinc-300 mb-3" aria-hidden>
                <rect x="8" y="6" width="32" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16h16M16 22h16M16 28h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-[13px] text-zinc-400">No unpaid invoices found</p>
            </div>
          </div>
        </div>

        {/* Row 2 — Ledger + Pending Payments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ledger */}
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="text-[13px] font-bold text-[#0E1E3A] mb-3">Ledger</h3>

            {/* Period radio */}
            <div className="flex flex-col gap-2 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ledger-period"
                  checked={ledgerPeriod === "current"}
                  onChange={() => setLedgerPeriod("current")}
                  className="accent-brand-600"
                />
                <span className="text-[13px] text-zinc-700">Current Billing Cycle</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ledger-period"
                  checked={ledgerPeriod === "custom"}
                  onChange={() => setLedgerPeriod("custom")}
                  className="accent-brand-600"
                />
                <span className="text-[13px] text-zinc-700">Custom Period</span>
              </label>
            </div>

            {/* Date range */}
            {ledgerPeriod === "custom" && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[11px] text-zinc-500 mb-1 block">From</label>
                  <input
                    type="date"
                    value={ledgerFrom}
                    onChange={(e) => setLedgerFrom(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-500 mb-1 block">To</label>
                  <input
                    type="date"
                    value={ledgerTo}
                    onChange={(e) => setLedgerTo(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            )}

            {/* Account type radio */}
            <div className="flex flex-col gap-2 mb-4">
              {(["credit", "cash", "both"] as LedgerType[]).map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="ledger-type"
                    checked={ledgerType === t}
                    onChange={() => setLedgerType(t)}
                    className="accent-brand-600"
                  />
                  <span className="text-[13px] text-zinc-700 capitalize">
                    {t === "credit" ? "Credit Account" : t === "cash" ? "Cash / Hotel A/c" : "Both"}
                  </span>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={handleViewLedger} loading={ledgerLoading}>
                View Ledger
              </Button>
              <Button size="sm" variant="outline">
                Export Excel
              </Button>
              <Button size="sm" variant="outline">
                Export PDF
              </Button>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="rounded-lg border border-zinc-200 p-4">
            <h3 className="text-[13px] font-bold text-[#0E1E3A] mb-3">Pending Payments</h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <svg viewBox="0 0 48 48" width={40} height={40} fill="none" className="text-zinc-300 mb-3" aria-hidden>
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
                <path d="M24 15v9l6 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[13px] text-zinc-400 mb-4">No pending payments</p>
            </div>
            <Link
              href="/account/payment-history"
              className="text-[12px] font-semibold text-brand-600 hover:underline"
            >
              View All Payments →
            </Link>
          </div>
        </div>

        <hr className="border-zinc-200" />

        {/* Bulk Invoice/CreditNote Download */}
        <div className="rounded-lg border border-zinc-200 p-4">
          <h3 className="text-[13px] font-bold text-[#0E1E3A] mb-3">Bulk Invoice / CreditNote Download</h3>

          {/* Type radio */}
          <div className="flex gap-6 mb-4">
            {(["invoice", "creditnote"] as BulkType[]).map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="bulk-type"
                  checked={bulkType === t}
                  onChange={() => setBulkType(t)}
                  className="accent-brand-600"
                />
                <span className="text-[13px] text-zinc-700">
                  {t === "invoice" ? "Invoice" : "Credit Note"}
                </span>
              </label>
            ))}
          </div>

          {/* Date range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[11px] text-zinc-500 mb-1 block">From</label>
              <input
                type="date"
                value={bulkFrom}
                onChange={(e) => setBulkFrom(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-500 mb-1 block">To</label>
              <input
                type="date"
                value={bulkTo}
                onChange={(e) => setBulkTo(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-2 justify-end">
            <Button size="sm" onClick={() => handleBulkDownload("pdf")} loading={bulkLoading}>
              Download PDF
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkDownload("bills")} loading={bulkLoading}>
              Download Bills
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
