"use client";

import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";

const AMENITIES = ["Restaurant", "Free Wi-Fi", "24-hour Room Service", "Gym", "Bar"];

const FACILITIES = [
  "Front Desk", "Coffee", "Laundry Facilities", "In-Room Safe",
  "Bar", "Gym", "24/7 Front Desk", "Free Breakfast",
  "Free Parking", "Television", "Air Conditioning", "Spa",
];

type RatePlan = {
  name: string;
  price: number;
  meals: string;
};

type RoomType = {
  name: string;
  size: string;
  bed: string;
  img: string;
  plans: RatePlan[];
};

const ROOMS: RoomType[] = [
  {
    name: "Deluxe Room — Free Wi-Fi & Snack Basket",
    size: "169 sq.ft (16 sq.mt)",
    bed: "1 Double Bed",
    img: "https://r1imghtlak.mmtcdn.com/e117844a6f1211e7be0c0a4cef95d023.jpg?downsize=377:200&crop=377:200",
    plans: [
      { name: "Room Only", price: 4999, meals: "No meals" },
      { name: "Room with Breakfast", price: 5799, meals: "Breakfast included" },
      { name: "Room with Breakfast + Lunch/Dinner", price: 6899, meals: "All meals" },
    ],
  },
  {
    name: "Executive Room — Free Wi-Fi & Snack Basket",
    size: "225 sq.ft (21 sq.mt)",
    bed: "1 Double Bed",
    img: "https://r1imghtlak.mmtcdn.com/55c399c86f1311e7be0c0a4cef95d023.jpg?downsize=377:200&crop=377:200",
    plans: [
      { name: "Room Only", price: 6299, meals: "No meals" },
      { name: "Room with Breakfast", price: 7099, meals: "Breakfast included" },
      { name: "Room with Breakfast + Lunch/Dinner", price: 8399, meals: "All meals" },
    ],
  },
  {
    name: "Luxury Suite With Bathtub — Free Wi-Fi & Snack Basket",
    size: "256 sq.ft (24 sq.mt)",
    bed: "1 King Bed",
    img: "https://r1imghtlak.mmtcdn.com/f3099ce4b42a11ecb9500a58a9feac02.jpg?downsize=377:200&crop=377:200",
    plans: [
      { name: "Room Only", price: 8999, meals: "No meals" },
      { name: "Room with Breakfast", price: 9799, meals: "Breakfast included" },
      { name: "Room with Breakfast + Lunch/Dinner", price: 11299, meals: "All meals" },
    ],
  },
];

interface Props {
  id: string;
}

export default function ManualHotelDetail({ id }: Props) {
  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#0E1E3A]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-[12px] text-zinc-500 mb-4">
          <Link href="/admin/manual/hotel" className="hover:underline text-brand-600">Manual Hotel Listing</Link>
          <span className="mx-1">›</span>
          <span>Hotel Details</span>
        </nav>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden mb-6 h-56">
          <div className="col-span-2 bg-zinc-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Hotel main view"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 bg-zinc-200 overflow-hidden rounded">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80"
                alt="Hotel room"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 bg-zinc-200 overflow-hidden rounded">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80"
                alt="Hotel pool"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Hotel info */}
            <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-5">
              <h1 className="text-xl font-extrabold text-[#0E1E3A] mb-1">The Hans New Delhi</h1>
              <p className="text-[13px] text-zinc-500 mb-3">Janpath, Connaught Place Area, New Delhi — 110001</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {AMENITIES.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-700">
                    <svg viewBox="0 0 12 12" width={10} height={10} fill="currentColor" aria-hidden><path d="M10.354 2.646a.5.5 0 0 0-.708 0L4.5 7.793 2.354 5.646a.5.5 0 0 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l5.5-5.5a.5.5 0 0 0 0-.708z"/></svg>
                    {a}
                  </span>
                ))}
                <button className="text-[12px] font-semibold text-brand-600 hover:underline">+ More Amenities</button>
              </div>

              <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-2">Description</h2>
              <p className="text-[13px] text-zinc-600 leading-relaxed mb-2">
                The Hans New Delhi offers sweeping views of the cityscape, conveniently located near VFS Global (2 km away)
                and within reachable distance to key government institutions, including central ministries and embassies
                in Chanakya Puri (6 km away). Just 3 km from Pragati Maidan, the hotel is ideally positioned for both
                business and leisure travellers.
              </p>

              <h2 className="text-[15px] font-bold text-[#0E1E3A] mb-3 mt-4">Most Popular Facilities</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {FACILITIES.map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-[12px] text-zinc-700">
                    <svg viewBox="0 0 12 12" width={10} height={10} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Room types */}
            <div>
              <h2 className="text-[17px] font-extrabold text-[#0E1E3A] mb-4">Available Rooms</h2>
              <div className="flex flex-col gap-5">
                {ROOMS.map((room) => (
                  <div key={room.name} className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="flex gap-4 p-4 border-b border-zinc-100">
                      <div className="w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-100">
                        <img src={room.img} alt={room.name} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#0E1E3A] mb-1">{room.name}</h3>
                        <div className="flex flex-wrap gap-3 text-[12px] text-zinc-500">
                          <span>📐 {room.size}</span>
                          <span>🛏 {room.bed}</span>
                          <span>🚿 1 Bathroom</span>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-zinc-100">
                      {room.plans.map((plan) => (
                        <div key={plan.name} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-[13px] font-semibold text-[#0E1E3A]">{plan.name}</p>
                            <p className="text-[12px] text-zinc-500">{plan.meals} · Non-refundable</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[15px] font-extrabold text-[#0E1E3A]">
                              ₹{plan.price.toLocaleString("en-IN")}
                            </span>
                            <Link
                              href={`/admin/manual/hotel/${id}/booking`}
                              className="rounded-lg bg-brand-500 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-brand-600 transition-colors whitespace-nowrap"
                            >
                              Select Room
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="w-full md:w-72 shrink-0">
            <div className="rounded-xl bg-white border border-zinc-200 shadow-sm p-4 sticky top-4">
              <h3 className="text-[14px] font-bold text-[#0E1E3A] mb-1">The Hans New Delhi</h3>
              <p className="text-[12px] text-zinc-500 mb-3">4-star · Janpath, New Delhi</p>
              <div className="flex flex-col gap-2 text-[13px] mb-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Check-in</span>
                  <span className="font-semibold">12 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Check-out</span>
                  <span className="font-semibold">11 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Duration</span>
                  <span className="font-semibold">3 Nights · 1 Adult</span>
                </div>
              </div>
              <Link
                href={`/admin/manual/hotel/${id}/booking`}
                className="block w-full rounded-lg bg-brand-500 py-2 text-center text-[14px] font-bold text-white hover:bg-brand-600 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
