"use client";

import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { sleep } from "@/services/delay";

const MOCK_TICKET = {
  pnr: "6E-R3QKQC",
  status: "Confirmed",
  airline: "IndiGo",
  flightNo: "6E-418",
  origin: { city: "Delhi", code: "DEL", time: "17:30", date: "Mon, 28 Jul 2025" },
  destination: { city: "Indore", code: "IDR", time: "19:40", date: "Mon, 28 Jul 2025" },
  duration: "2h 10m",
  stops: "Non-stop",
  cabin: "Economy",
  baggage: "15 Kg",
  seat: "12A",
  passengers: [
    { type: "Adult", name: "KUMAR / SIDDHARTHA MR" },
  ],
  fare: { base: 2310, tax: 121, surcharge: 1169, serviceFee: 0, discount: 0 },
};

interface Props {
  id: string;
}

export default function FlightETicket({ id: _id }: Props) {
  const toast = useToast();
  const [serviceFee, setServiceFee] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [emailLoading, setEmailLoading] = useState(false);
  const [waLoading, setWaLoading] = useState(false);

  const fee = Number(serviceFee) || 0;
  const disc = Number(discount) || 0;
  const total =
    MOCK_TICKET.fare.base +
    MOCK_TICKET.fare.tax +
    MOCK_TICKET.fare.surcharge +
    fee -
    disc;

  const handleEmail = async (withFare: boolean) => {
    setEmailLoading(true);
    await sleep(1200);
    setEmailLoading(false);
    toast.push({
      title: "E-ticket emailed",
      description: withFare ? "Sent with full fare details." : "Sent without fare details.",
      tone: "success",
    });
  };

  const handleWhatsApp = async () => {
    setWaLoading(true);
    await sleep(1200);
    setWaLoading(false);
    toast.push({ title: "Sent via WhatsApp", tone: "success" });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#0E1E3A]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 md:px-6 py-8">
        {/* Status bar */}
        <div className="rounded-xl bg-green-500 px-5 py-3 mb-6 flex items-center gap-3">
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div>
            <span className="text-white font-bold text-[15px]">{MOCK_TICKET.status}</span>
            <span className="text-green-100 text-[13px] ml-3">PNR: {MOCK_TICKET.pnr}</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* Passenger */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[14px] font-bold text-[#0E1E3A] mb-3 uppercase tracking-wide">Passenger Type</h2>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-zinc-50 text-zinc-600">
                  <th className="text-left px-3 py-2 font-semibold rounded-tl-lg">Type</th>
                  <th className="text-left px-3 py-2 font-semibold rounded-tr-lg">Name</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TICKET.passengers.map((p, i) => (
                  <tr key={i} className="border-t border-zinc-100">
                    <td className="px-3 py-2 text-zinc-600">{p.type}</td>
                    <td className="px-3 py-2 font-semibold">{p.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Flight details */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[14px] font-bold text-[#0E1E3A] mb-4 uppercase tracking-wide">Flight Details — Departure Flight</h2>
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <p className="text-[22px] font-extrabold">{MOCK_TICKET.origin.time}</p>
                <p className="text-[12px] text-zinc-500">{MOCK_TICKET.origin.city} ({MOCK_TICKET.origin.code})</p>
                <p className="text-[11px] text-zinc-400">{MOCK_TICKET.origin.date}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[12px] text-zinc-500">{MOCK_TICKET.duration}</p>
                <div className="h-px bg-zinc-300 my-1" />
                <p className="text-[11px] text-zinc-400">{MOCK_TICKET.stops}</p>
              </div>
              <div className="text-center">
                <p className="text-[22px] font-extrabold">{MOCK_TICKET.destination.time}</p>
                <p className="text-[12px] text-zinc-500">{MOCK_TICKET.destination.city} ({MOCK_TICKET.destination.code})</p>
                <p className="text-[11px] text-zinc-400">{MOCK_TICKET.destination.date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
              <div className="rounded-lg bg-zinc-50 p-3">
                <p className="text-[11px] text-zinc-500 mb-0.5">Flight</p>
                <p className="font-bold">{MOCK_TICKET.airline} · {MOCK_TICKET.flightNo}</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-3">
                <p className="text-[11px] text-zinc-500 mb-0.5">Class</p>
                <p className="font-bold">{MOCK_TICKET.cabin}</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-3">
                <p className="text-[11px] text-zinc-500 mb-0.5">Baggage</p>
                <p className="font-bold">{MOCK_TICKET.baggage}</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-3">
                <p className="text-[11px] text-zinc-500 mb-0.5">Seat</p>
                <p className="font-bold">{MOCK_TICKET.seat}</p>
              </div>
            </div>
          </div>

          {/* Fare */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[14px] font-bold text-[#0E1E3A] mb-4 uppercase tracking-wide">Fare Details</h2>
            <div className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-zinc-600">Base Fare</span>
                <span className="font-semibold">₹{MOCK_TICKET.fare.base.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Taxes</span>
                <span className="font-semibold">₹{MOCK_TICKET.fare.tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Other Surcharges</span>
                <span className="font-semibold">₹{MOCK_TICKET.fare.surcharge.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Service Fee (₹)</span>
                <input
                  type="number"
                  min="0"
                  value={serviceFee}
                  onChange={(e) => setServiceFee(e.target.value)}
                  className="w-20 rounded border border-zinc-300 px-2 py-1 text-[13px] text-right focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Discount (₹)</span>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-20 rounded border border-zinc-300 px-2 py-1 text-[13px] text-right focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <hr className="border-zinc-200 my-1" />
              <div className="flex justify-between text-[16px] font-extrabold text-[#0E1E3A]">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-[12px] text-amber-800 leading-relaxed">
            This is an Electronic Ticket. Passengers must carry a valid photo ID for check-in at the airport.
            Carriage and other services provided by the carrier are subject to conditions of carriage.
            If the journey involves an ultimate destination or stop in a country other than the country of departure,
            the Warsaw Convention may apply and limit carrier liability.
          </div>

          {/* Actions */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[14px] font-bold text-[#0E1E3A] mb-4">Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => window.print()}>
                Print E-ticket
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                Print Without Fare
              </Button>
              <Button variant="outline" onClick={() => handleEmail(true)} loading={emailLoading}>
                Email E-ticket
              </Button>
              <Button variant="outline" onClick={() => handleWhatsApp()} loading={waLoading}>
                WhatsApp E-ticket
              </Button>
              <Button variant="outline" onClick={() => handleEmail(false)} loading={emailLoading}>
                Email Without Fare
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
