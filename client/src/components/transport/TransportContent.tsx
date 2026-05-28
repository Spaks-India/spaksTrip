import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="5.5" cy="17.5" r="2.5" />
        <circle cx="18.5" cy="17.5" r="2.5" />
        <path d="M5.5 17.5h13M2 9l1-5h14l4 7H3" />
      </svg>
    ),
    title: "Flexible Pick-Up & Drop-Off",
    text: "Choose locations and times that suit your schedule. Well-maintained, modern vehicles equipped with the latest features.",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: "Business Travel Solutions",
    text: "Special rates and services for businesses, making travel easier for employees. Streamlined invoicing for business rentals.",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Flexible Rental Periods",
    text: "Rent by the hour, day, week, or month, depending on your needs. Availability for spontaneous trips or urgent needs.",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
];

const CATEGORIES = [
  { label: "Sedan", href: "/cabs", img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=400&q=70" },
  { label: "SUV", href: "/cabs", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=70" },
  { label: "Crossover", href: "/cabs", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=70" },
  { label: "Electric Vehicle", href: "/cabs", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=70" },
  { label: "Luxury Car", href: "/cabs", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=70" },
];

const WHY_US = [
  { label: "Best Review", icon: "⭐" },
  { label: "No Cost EMI Facility", icon: "💳" },
  { label: "Premium Tours", icon: "🏆" },
  { label: "Verified Drivers", icon: "✅" },
  { label: "Verified Hotels", icon: "🏨" },
  { label: "Well Planned Itineraries", icon: "🗺️" },
  { label: "Lowest Price Guarantee", icon: "🏷️" },
  { label: "24×7 Call & WhatsApp Support", icon: "📞" },
];

export default function TransportContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0E1E3A] py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1400&q=80')" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Transport &amp; Travel
          </h1>
          <p className="text-[15px] text-blue-100 max-w-xl mx-auto mb-8">
            Book cabs, outstation rides, and airport transfers across India. Flexible pick-up times, verified drivers, and transparent pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/cabs"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-[14px] font-bold text-white hover:bg-brand-600 transition-colors"
            >
              Search Cabs
            </Link>
            <Link
              href="/taxi-package"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-[14px] font-bold text-white hover:bg-white/20 transition-colors"
            >
              Taxi Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className={`rounded-xl ${f.bg} p-6`}>
                <div className={`mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="text-[15px] font-bold text-[#0E1E3A] mb-2">{f.title}</h3>
                <p className="text-[13px] text-zinc-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="bg-zinc-50 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#0E1E3A] mb-2">Trending Categories</h2>
            <p className="text-[14px] text-zinc-500 max-w-lg mx-auto">
              Gaining popularity due to advancements in battery technology and growing environmental awareness
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[13px] font-semibold text-[#0E1E3A]">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-extrabold text-[#0E1E3A] text-center mb-8">Why Choose SpaksTrip?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {WHY_US.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-6 gap-3"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-[13px] font-semibold text-[#0E1E3A]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
