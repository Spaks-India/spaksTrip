"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { sleep } from "@/services/delay";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belgium",
  "Belize", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Cambodia", "Canada", "Chile", "China", "Colombia", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Ecuador", "Egypt", "Estonia", "Ethiopia", "Finland",
  "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia",
  "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Malta",
  "Mexico", "Moldova", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Nepal",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zimbabwe",
];

interface Props {
  id: string;
}

export default function CruiseCheckout({ id }: Props) {
  const toast = useToast();

  const [guestCount, setGuestCount] = useState(1);
  const [ages, setAges] = useState<string[]>(["", "", "", "", ""]);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const updateAge = (i: number, val: string) => {
    setAges((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filled = ages.slice(0, guestCount).every((a) => a.trim() !== "");
    if (!filled) {
      toast.push({ title: "Enter age for all guests", tone: "warn" });
      return;
    }
    setLoading(true);
    await sleep(1300);
    setLoading(false);
    toast.push({
      title: "Cruise booking confirmed!",
      description: `${guestCount} guest(s) booked for Alaska cruise. A confirmation will be emailed to you.`,
      tone: "success",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#0E1E3A]">
      <Header />

      <main className="mx-auto max-w-4xl px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-[12px] text-zinc-500 mb-6">
          <Link href="/cruise" className="hover:underline text-brand-600">Cruise</Link>
          <span className="mx-1">›</span>
          <Link href={`/cruise/${id}`} className="hover:underline text-brand-600">Cruise Details</Link>
          <span className="mx-1">›</span>
          <span>Checkout</span>
        </nav>

        {/* Trip summary */}
        <div className="rounded-xl bg-[#0E1E3A] px-5 py-4 mb-6 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 mb-1">Selected Cruise</p>
          <h1 className="text-[16px] font-extrabold leading-snug">
            7 Nights · Alaska · Carnival Cruise Line: Carnival Miracle · May 7, 2026
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Guest Information */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Guest Information</h2>

            <div className="mb-4">
              <label className="block text-[13px] font-medium text-zinc-700 mb-1">
                Number of Guests
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-40 rounded-lg border border-zinc-300 px-3 py-2 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-[13px] font-semibold text-zinc-700 mb-2">
                Guest Age at Time of Sailing <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: guestCount }).map((_, i) => (
                  <div key={i}>
                    <label className="block text-[11px] text-zinc-500 mb-1">Guest {i + 1}</label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      placeholder={`Age`}
                      value={ages[i]}
                      onChange={(e) => updateAge(i, e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guest Residency */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Guest Residency</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-zinc-700 mb-1">State / Province</label>
                <input
                  type="text"
                  placeholder="Enter state or province"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Price summary */}
          <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
            <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Price Summary</h2>
            <div className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-zinc-600">Cruise Fare ({guestCount} guest{guestCount > 1 ? "s" : ""})</span>
                <span className="font-semibold">₹{(89999 * guestCount).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Taxes &amp; Port Charges</span>
                <span className="font-semibold">₹{(8500 * guestCount).toLocaleString("en-IN")}</span>
              </div>
              <hr className="border-zinc-200 my-1" />
              <div className="flex justify-between text-[16px] font-extrabold text-[#0E1E3A]">
                <span>Total</span>
                <span className="text-brand-600">₹{((89999 + 8500) * guestCount).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={loading}>
              Confirm Booking
            </Button>
          </div>
        </form>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
