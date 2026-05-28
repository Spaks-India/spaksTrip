"use client";

import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";

type PriceOption = { label: string; price: number };

type Tour = {
  id: string;
  title: string;
  duration: string;
  destination: string;
  basePrice: number;
  img: string;
  options: PriceOption[];
};

const TOURS: Tour[] = [
  {
    id: "sgp-cruise",
    title: "Singapore Dream Cruise Tour Package 2 Nights & 3 Days",
    duration: "2N / 3D",
    destination: "Singapore",
    basePrice: 29000,
    img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=600&q=70",
    options: [
      { label: "Standard", price: 29000 },
      { label: "Deluxe", price: 35000 },
      { label: "Budget", price: 23999 },
      { label: "Premium", price: 25999 },
      { label: "Economy", price: 25000 },
    ],
  },
  {
    id: "sgp-phuket",
    title: "3 Nights / 4 Days Singapore to Phuket, Thailand Tour Package",
    duration: "3N / 4D",
    destination: "Singapore → Phuket",
    basePrice: 35999,
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=70",
    options: [
      { label: "Standard", price: 41000 },
      { label: "Deluxe", price: 38000 },
      { label: "Premium", price: 55000 },
      { label: "Economy", price: 39000 },
      { label: "Budget", price: 35999 },
    ],
  },
];

export default function ManualInternationalTourListing() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#0E1E3A]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-ink">International Tour Packages</h1>
            <p className="text-[13px] text-zinc-500 mt-0.5">Showing {TOURS.length} tours</p>
          </div>
          <Link
            href="/admin/manual/tour"
            className="text-[13px] font-semibold text-brand-600 hover:underline"
          >
            ← National Tours
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {TOURS.map((tour) => (
            <div
              key={tour.id}
              className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="w-full md:w-56 shrink-0 h-44 md:h-auto bg-zinc-100">
                <img
                  src={tour.img}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="flex-1 p-5 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-1 leading-snug">
                    {tour.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 text-[12px] text-zinc-500 mb-3">
                    <span>📍 {tour.destination}</span>
                    <span>🗓 {tour.duration}</span>
                  </div>
                  <div className="text-[18px] font-extrabold text-brand-600">
                    ₹{tour.basePrice.toLocaleString("en-IN")}
                    <span className="text-[12px] font-normal text-zinc-500"> / person</span>
                  </div>
                  <Link
                    href={`/international-tour-details/${tour.id}`}
                    className="mt-3 inline-block rounded-lg bg-brand-500 px-4 py-2 text-[13px] font-bold text-white hover:bg-brand-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>

                {/* Price options */}
                <div className="w-full md:w-44 shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mb-2">
                    Price Options
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {tour.options.map((opt) => (
                      <li key={opt.label} className="flex items-center justify-between">
                        <span className="text-[12px] text-zinc-600">{opt.label}</span>
                        <span className="text-[13px] font-bold text-[#0E1E3A]">
                          ₹{opt.price.toLocaleString("en-IN")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
