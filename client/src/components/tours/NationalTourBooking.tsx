"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { sleep } from "@/services/delay";

const INDIA_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

type Flight = {
  id: string;
  code: string;
  flightNo: string;
  origin: string;
  destination: string;
  dep: string;
  arr: string;
  duration: string;
  stops: string;
  price: number;
};

const FLIGHTS: Flight[] = [
  {
    id: "f1",
    code: "9I",
    flightNo: "9I-627",
    origin: "Delhi",
    destination: "Indore",
    dep: "17:30",
    arr: "19:40",
    duration: "2h 10m",
    stops: "Non-stop",
    price: 5341,
  },
  {
    id: "f2",
    code: "6E",
    flightNo: "6E-418",
    origin: "Delhi",
    destination: "Indore",
    dep: "14:20",
    arr: "16:30",
    duration: "2h 10m",
    stops: "Non-stop",
    price: 4999,
  },
  {
    id: "f3",
    code: "AI",
    flightNo: "AI-544",
    origin: "Delhi",
    destination: "Indore",
    dep: "08:10",
    arr: "10:35",
    duration: "2h 25m",
    stops: "1 Stop",
    price: 4250,
  },
];

const PRICE = { tourBase: 35600, taxes: 5500, total: 60500 };

interface Props {
  id: string;
}

export default function NationalTourBooking({ id }: Props) {
  const toast = useToast();

  const [selectedFlight, setSelectedFlight] = useState<string>("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlight) {
      toast.push({ title: "Please select a flight", tone: "warn" });
      return;
    }
    if (!email.trim() || !phone.trim()) {
      toast.push({ title: "Contact info is required", tone: "warn" });
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      toast.push({ title: "Traveler name is required", tone: "warn" });
      return;
    }
    setLoading(true);
    await sleep(1300);
    setLoading(false);
    toast.push({
      title: "Booking confirmed!",
      description: `National Tour booked for ${firstName} ${lastName}. Total: ₹${PRICE.total.toLocaleString("en-IN")}`,
      tone: "success",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#0E1E3A]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#0E1E3A] py-8 text-center">
        <h1 className="text-2xl font-extrabold text-white">National Tour Booking</h1>
        <nav className="mt-2 text-[13px] text-blue-200">
          <Link href="/national-tour-packages" className="hover:underline">National Tours</Link>
          <span className="mx-2">›</span>
          <Link href={`/national-tour-details/${id}`} className="hover:underline">Tour Details</Link>
          <span className="mx-2">›</span>
          <span>Booking</span>
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Flight selection */}
            <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-1">Select Your Flight</h2>
              <p className="text-[13px] text-zinc-500 mb-4">Delhi → Indore · Mon, 28 Jul 2025</p>

              <div className="flex flex-col gap-3">
                {FLIGHTS.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFlight(f.id)}
                    className={`rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedFlight === f.id
                        ? "border-brand-500 bg-brand-50"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-4 p-4">
                      {/* Airline */}
                      <div className="w-20 shrink-0">
                        <div className="text-[13px] font-bold text-[#0E1E3A]">{f.code}</div>
                        <div className="text-[11px] text-zinc-500">{f.flightNo}</div>
                      </div>

                      {/* Dep */}
                      <div className="text-center">
                        <div className="text-[18px] font-extrabold text-[#0E1E3A]">{f.dep}</div>
                        <div className="text-[11px] text-zinc-500">{f.origin}</div>
                      </div>

                      {/* Duration */}
                      <div className="flex-1 text-center">
                        <div className="text-[12px] text-zinc-500">{f.duration}</div>
                        <div className="my-1 h-px bg-zinc-300 relative">
                          <svg viewBox="0 0 16 8" width={16} height={8} className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400" fill="currentColor" aria-hidden>
                            <path d="M12 0l4 4-4 4V5H0V3h12V0z" />
                          </svg>
                        </div>
                        <div className="text-[11px] text-zinc-400">{f.stops}</div>
                      </div>

                      {/* Arr */}
                      <div className="text-center">
                        <div className="text-[18px] font-extrabold text-[#0E1E3A]">{f.arr}</div>
                        <div className="text-[11px] text-zinc-500">{f.destination}</div>
                      </div>

                      {/* Price + select */}
                      <div className="ml-auto text-right">
                        <div className="text-[16px] font-extrabold text-[#0E1E3A]">
                          ₹{f.price.toLocaleString("en-IN")}
                        </div>
                        <div className="mt-1 flex items-center justify-end gap-1.5">
                          <input
                            type="checkbox"
                            checked={selectedFlight === f.id}
                            onChange={() => setSelectedFlight(f.id)}
                            className="accent-brand-600 w-4 h-4"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label className="text-[12px] font-semibold text-brand-600 cursor-pointer">
                            Select Flight
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout form */}
            <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Secure Checkout</h2>

              {/* Contact Info */}
              <h3 className="text-[13px] font-semibold text-zinc-600 uppercase tracking-wide mb-3">
                Contact Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Traveler Info */}
              <h3 className="text-[13px] font-semibold text-zinc-600 uppercase tracking-wide mb-3">
                Traveler Info
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">Select State</option>
                    {INDIA_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <Button type="submit" loading={loading}>
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>

          {/* Price sidebar */}
          <aside className="w-full md:w-72 shrink-0 sticky top-4">
            <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <h3 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Price Summary</h3>
              <div className="flex flex-col gap-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Tour Package</span>
                  <span className="font-semibold">₹{PRICE.tourBase.toLocaleString("en-IN")}</span>
                </div>
                {selectedFlight && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Flight</span>
                    <span className="font-semibold">
                      ₹{(FLIGHTS.find((f) => f.id === selectedFlight)?.price ?? 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-600">Taxes &amp; Fees</span>
                  <span className="font-semibold">₹{PRICE.taxes.toLocaleString("en-IN")}</span>
                </div>
                <hr className="border-zinc-200 my-1" />
                <div className="flex justify-between text-[16px] font-extrabold text-[#0E1E3A]">
                  <span>Total</span>
                  <span className="text-brand-600">₹{PRICE.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-[12px] text-green-700">
                Free cancellation before departure · Pay securely online
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
