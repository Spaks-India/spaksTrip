"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { sleep } from "@/services/delay";

const INCLUSIONS = [
  "Room with Free Cancellation | Breakfast only",
  "Free Room Upgrade — subject to availability",
  "10% off on Two-way Airport Transfer",
  "Complimentary Hi-Tea",
  "Free Cancellation till check-in",
];

const IMPORTANT_INFO = [
  "Primary Guest should be at least 18 years of age.",
  "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s).",
  "Pets are not allowed.",
  "Outside food is not allowed.",
];

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const PRICE = { base: 9671, tax: 872, discount: 0 };

interface Props {
  hotelId: string;
}

export default function ManualHotelBooking({ hotelId }: Props) {
  const toast = useToast();

  const [upgrade, setUpgrade] = useState<"none" | "breakfast" | "all-meals">("none");
  const [title, setTitle] = useState("Mr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const upgradePrice = upgrade === "breakfast" ? 1350 : upgrade === "all-meals" ? 3752 : 0;
  const total = PRICE.base + PRICE.tax + upgradePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.push({ title: "Guest name is required", tone: "warn" });
      return;
    }
    if (!mobile.trim()) {
      toast.push({ title: "Mobile number is required", tone: "warn" });
      return;
    }
    setLoading(true);
    await sleep(1300);
    setLoading(false);
    toast.push({
      title: "Booking confirmed",
      description: `Hotel Vertu By OPO booked for ${firstName} ${lastName}. Total: ₹${total.toLocaleString("en-IN")}`,
      tone: "success",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#0E1E3A]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-[12px] text-zinc-500 mb-4">
          <Link href="/admin/manual/hotel" className="hover:underline text-brand-600">Manual Hotel Listing</Link>
          <span className="mx-1">›</span>
          <Link href={`/admin/manual/hotel/${hotelId}`} className="hover:underline text-brand-600">Hotel Details</Link>
          <span className="mx-1">›</span>
          <span>Secure Checkout</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Main */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Hotel summary */}
            <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <div className="flex gap-4">
                <div className="w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=70"
                    alt="Hotel"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[15px] font-extrabold text-[#0E1E3A]">Hotel Vertu By OPO</h2>
                  <p className="text-[12px] text-zinc-500">Property No. L-74, Road No 7, New Delhi-110037, Delhi, India</p>
                  <p className="text-[13px] text-zinc-700 mt-1">
                    <span className="font-semibold">3 Nights</span> · 1 Adult, 1 Child (15y) · Hotel
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-[13px] font-bold text-[#0E1E3A] mb-1">Superior Room with Free WIFI</p>
                <p className="text-[12px] text-zinc-500 mb-2">1 Adult, 1 Child</p>
                <ul className="flex flex-col gap-1">
                  {INCLUSIONS.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[12px] text-zinc-600">
                      <svg viewBox="0 0 12 12" width={10} height={10} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-green-500" aria-hidden>
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upgrade your stay */}
            <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <h3 className="text-[15px] font-bold text-[#0E1E3A] mb-3">Upgrade Your Stay</h3>
              <div className="flex flex-col gap-2">
                {([
                  { value: "breakfast", label: "Add Breakfast", price: 1350 },
                  { value: "all-meals", label: "Add Breakfast + Lunch/Dinner", price: 3752 },
                ] as const).map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer rounded-lg border border-zinc-200 px-4 py-3 hover:border-brand-400 transition-colors">
                    <input
                      type="radio"
                      name="upgrade"
                      checked={upgrade === opt.value}
                      onChange={() => setUpgrade(opt.value)}
                      className="accent-brand-600"
                    />
                    <span className="text-[13px] text-zinc-700">
                      {opt.label} for <strong>₹{opt.price.toLocaleString("en-IN")}</strong> for all guests
                    </span>
                  </label>
                ))}
                <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-zinc-200 px-4 py-3 hover:border-brand-400 transition-colors">
                  <input
                    type="radio"
                    name="upgrade"
                    checked={upgrade === "none"}
                    onChange={() => setUpgrade("none")}
                    className="accent-brand-600"
                  />
                  <span className="text-[13px] text-zinc-700">No upgrade</span>
                </label>
              </div>
            </div>

            {/* Important information */}
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
              <h3 className="text-[14px] font-bold text-amber-800 mb-2">Important Information</h3>
              <ul className="flex flex-col gap-1">
                {IMPORTANT_INFO.map((info) => (
                  <li key={info} className="text-[13px] text-amber-700 flex items-start gap-1.5">
                    <span className="mt-0.5 shrink-0">·</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>

            {/* Secure Checkout form */}
            <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <h3 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Secure Checkout</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2 sm:w-40">
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">Title</label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">Mobile Number</label>
                  <div className="flex gap-2">
                    <select className="w-20 shrink-0 rounded-lg border border-zinc-300 px-2 py-2 text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                      <option>+91</option>
                      <option>+1</option>
                      <option>+44</option>
                      <option>+61</option>
                      <option>+971</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
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

                <div>
                  <label className="block text-[13px] font-medium text-zinc-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Payment option */}
              <div className="mt-5">
                <h4 className="text-[14px] font-bold text-[#0E1E3A] mb-2">Payment Options</h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" defaultChecked className="accent-brand-600" />
                  <span className="text-[13px] text-zinc-700">
                    Pay entire amount now — <strong>₹{total.toLocaleString("en-IN")}</strong>
                  </span>
                </label>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <input type="checkbox" id="tnc" defaultChecked className="accent-brand-600" />
                <label htmlFor="tnc" className="text-[12px] text-zinc-600">
                  I agree to the Terms & Conditions and Privacy Policy of SpaksTrip.
                </label>
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
              <h3 className="text-[15px] font-bold text-[#0E1E3A] mb-4">Price Breakup</h3>
              <div className="flex flex-col gap-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Hotel × 3 Nights</span>
                  <span className="font-semibold">₹{PRICE.base.toLocaleString("en-IN")}</span>
                </div>
                {upgradePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Meal upgrade</span>
                    <span className="font-semibold">₹{upgradePrice.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-600">Taxes & Service Fees</span>
                  <span className="font-semibold">₹{PRICE.tax.toLocaleString("en-IN")}</span>
                </div>
                <hr className="border-zinc-200 my-1" />
                <div className="flex justify-between text-[15px] font-extrabold text-[#0E1E3A]">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
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
