"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { sleep } from "@/services/delay";

const PAYMENT_MODES = [
  "Cheque",
  "Draft",
  "Cash",
  "RTGS",
  "Credit Card",
  "Debit Card",
  "Net Banking",
  "NEFT",
  "Transfer",
  "EDC Machine",
  "Pay Through UPI",
];

const BANK_ACCOUNTS = [
  { value: "117", label: "AMD SBI MID — AMD — 22211900430752 ERP-120213079 (INR)" },
  { value: "123", label: "BLR SBI MID — BLR — 22211900394595 ERP-120213085 (INR)" },
  { value: "124", label: "BOM SBI MID — BOM — 22211900442719 ERP-120213086 (INR)" },
  { value: "115", label: "CCU SBI MID — CCU — 22211900376074 ERP-120213077 (INR)" },
  { value: "126", label: "CJB SBI MID — MAA — 22211900461891 ERP-120213091 (INR)" },
  { value: "116", label: "COK SBI MID — COK — 22211900443948 ERP-120213078 (INR)" },
  { value: "133", label: "GGN SBI MID — 022211900465665 ERP-120213096 (INR)" },
  { value: "118", label: "GUR SBI MID — GUR — 22211900344045 ERP-120213080" },
  { value: "83",  label: "HDFC BANK LTD — 50200055783372 ERP-120212079 (INR)" },
  { value: "125", label: "HYD SBI MID — HYD — 22211900451559 ERP-120213087 (INR)" },
  { value: "45",  label: "ICICI BANK A/C-GGN — 114505000274 ERP-120212013" },
  { value: "120", label: "IXC SBI MID — IXC — 22211900432779 ERP-120213082 (INR)" },
  { value: "121", label: "JAI SBI MID — JAI — 22211900477152 ERP-120213083 (INR)" },
  { value: "119", label: "LKO SBI MID — LKO — 22211900481245 ERP-120213081 (INR)" },
  { value: "78",  label: "MOBIKWIK PAYMENT GATEWAY — 00000010 ERP-120213015 (INR)" },
  { value: "132", label: "MUM SBI MID — MUM — 22211900368722 ERP-120213093 (INR)" },
  { value: "43",  label: "PAYU — 6 ERP-120213003" },
  { value: "122", label: "QJU SBI MID — QJU — 22211900445647 ERP-120213084 (INR)" },
  { value: "80",  label: "RAZORPAY PAYMENT GATEWAY — 15 ERP-120213016 (INR)" },
  { value: "76",  label: "STANDARD CHARTERED BANK — 53105107187 ERP-120212019" },
  { value: "127", label: "STV SBI MID — STV — 22211900331688 ERP-120213092 (INR)" },
  { value: "77",  label: "TBO HOLIDAY COLLECTION RECEIVABLE — 0000000000702 ERP-120213040" },
  { value: "79",  label: "The Aquapay — 5405600100000428 ERP-120205001" },
  { value: "96",  label: "Yes Bank (IMPS, NEFT and RTGS ONLY) — XXXX ERP-120212025 (INR)" },
  { value: "3",   label: "Yes Bank — 001682000000207 ERP-120212025 (INR)" },
];

export default function MakePaymentContent() {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState("");
  const [amount, setAmount] = useState("");
  const [draftNo, setDraftNo] = useState("");
  const [date, setDate] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [ourBank, setOurBank] = useState("");
  const [txnId, setTxnId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mode) {
      toast.push({ title: "Select payment mode", tone: "warn" });
      return;
    }
    if (!amount.trim()) {
      toast.push({ title: "Amount is required", tone: "warn" });
      return;
    }
    if (!date) {
      toast.push({ title: "Date is required", tone: "warn" });
      return;
    }
    if (!ourBank) {
      toast.push({ title: "Select our bank account", tone: "warn" });
      return;
    }

    setLoading(true);
    await sleep(1300);
    setLoading(false);

    toast.push({
      title: "Payment submitted",
      description: `₹${amount} payment via ${mode} submitted successfully. You will receive a confirmation shortly.`,
      tone: "success",
    });

    setMode("");
    setAmount("");
    setDraftNo("");
    setDate("");
    setBank("");
    setBranch("");
    setOurBank("");
    setTxnId("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 bg-[#0E1E3A] px-5 py-3 rounded-t-xl">
        <h2 className="text-sm font-bold text-white">Make Payment</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        <h3 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Enter Payment Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Payment Mode */}
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Payment Mode <span className="text-red-500">*</span>
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="">Select Payment Mode</option>
              {PAYMENT_MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Draft Number */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Draft Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter draft number"
              value={draftNo}
              onChange={(e) => setDraftNo(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">Bank</label>
            <input
              type="text"
              placeholder="Enter bank name"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">Branch</label>
            <input
              type="text"
              placeholder="Enter branch name"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Our Bank Account */}
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Our Bank Account <span className="text-red-500">*</span>
            </label>
            <select
              value={ourBank}
              onChange={(e) => setOurBank(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="">Choose</option>
              {BANK_ACCOUNTS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Bank Transaction ID */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Bank Transaction ID
            </label>
            <input
              type="text"
              placeholder="Enter transaction ID"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Upload Cheque */}
          <div>
            <label className="block text-[13px] font-medium text-zinc-700 mb-1">
              Upload Cheque
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] text-zinc-600 file:mr-3 file:rounded file:border-0 file:bg-brand-50 file:px-3 file:py-1 file:text-[12px] file:font-semibold file:text-brand-700 hover:file:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {file && (
              <p className="mt-1 text-[11px] text-zinc-500 truncate">{file.name}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" loading={loading}>
            Submit Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
