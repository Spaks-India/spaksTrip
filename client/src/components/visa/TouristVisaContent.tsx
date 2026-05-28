import VisaSidebar from "./VisaSidebar";

const TOURIST_TYPES = [
  {
    num: "1",
    label: "Tourist / Leisure Visa",
    text: "The most common type — issued for sightseeing, vacations, and recreational travel. Valid for short stays, typically 30 to 90 days depending on the destination.",
  },
  {
    num: "2",
    label: "Family / Relative Visit Visa",
    text: "Issued to individuals travelling to meet family members or friends residing abroad. Usually requires an invitation letter from the host along with proof of their residency.",
  },
  {
    num: "3",
    label: "Business Short-Stay Visa",
    text: "For travellers attending conferences, trade fairs, or meetings abroad. Permits business activities but does not allow working for a foreign employer.",
  },
  {
    num: "4",
    label: "Medical Visit Visa",
    text: "Granted to those seeking medical treatment or health check-ups in another country. Requires supporting documents from the treating hospital or clinic.",
  },
];

const ELIGIBILITY = [
  {
    label: "Valid Indian Passport",
    text: "Your passport must have a minimum of 6 months' validity from the date of intended travel.",
  },
  {
    label: "Sufficient Financial Means",
    text: "Proof that you can cover your travel and accommodation expenses — bank statements or ITR are commonly accepted.",
  },
  {
    label: "Return / Onward Flight Ticket",
    text: "A confirmed return ticket demonstrates your intent to leave the country after your visit.",
  },
  {
    label: "Clear Travel Intent",
    text: "Supporting documents such as hotel bookings, tour itineraries, or invitation letters help establish your purpose of visit.",
  },
];

const APPLY_STEPS = [
  {
    step: "1. Choose Your Destination & Visa Type",
    text: "Identify the country you wish to visit and confirm which tourist visa category applies to your trip.",
  },
  {
    step: "2. Fill the Visa Application Form",
    text: "Complete the official application form — available online or at the embassy. Accuracy is essential; errors can delay processing.",
  },
  {
    step: "3. Schedule Appointment & Submit Biometrics",
    text: "Many embassies require an in-person appointment for biometric capture. Book early, especially during peak travel seasons.",
  },
  {
    step: "4. Pay the Visa Fee",
    text: "Visa fees vary by destination and visa duration. Retain your payment receipt as it may be required for tracking.",
  },
  {
    step: "5. Attend Interview & Await Approval",
    text: "Some countries require a short interview. Once submitted, processing typically takes 5–15 working days.",
  },
];

const WHY_US = [
  { icon: "🌍", label: "150+ Destinations", text: "We assist with tourist visas to over 150 countries worldwide." },
  { icon: "⚡", label: "Fast Processing", text: "Priority processing options available for urgent travel plans." },
  { icon: "📋", label: "Document Support", text: "Our team reviews your documents before submission to avoid rejections." },
  { icon: "💬", label: "Expert Guidance", text: "Dedicated visa consultants available 7 days a week." },
];

export default function TouristVisaContent() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="rounded-xl border border-zinc-200 p-6">
              {/* Hero image */}
              <div className="rounded-lg overflow-hidden mb-6 h-64">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                  alt="Tourist destination — tropical beach"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* What is a Tourist Visa */}
              <h2 className="text-xl font-extrabold text-[#0E1E3A] mb-3">What Is a Tourist Visa?</h2>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                A Tourist Visa — also called a Visitor Visa — is an official document that permits
                Indian nationals to enter a foreign country temporarily for leisure, sightseeing,
                family visits, or vacation. It is a non-immigrant visa, meaning it does not grant
                the right to work or settle permanently in the destination country. Most tourist
                visas are valid for 30 to 180 days and can be single-entry or multiple-entry.
              </p>

              {/* Types */}
              <h2 className="text-xl font-extrabold text-[#0E1E3A] mb-4">Types of Tourist Visa from India</h2>
              <div className="flex flex-col gap-4 mb-8">
                {TOURIST_TYPES.map((t) => (
                  <div key={t.num} className="flex gap-4 items-start">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[13px] font-bold text-brand-600">
                      {t.num}
                    </span>
                    <div>
                      <p className="text-[14px] font-bold text-[#0E1E3A]">{t.label}</p>
                      <p className="text-sm text-zinc-600 mt-0.5 leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <h2 className="text-xl font-extrabold text-[#0E1E3A] mb-4">Eligibility for Tourist Visa from India</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {ELIGIBILITY.map((e) => (
                  <div key={e.label} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-[13px] font-bold text-[#0E1E3A] mb-1">{e.label}</p>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">{e.text}</p>
                  </div>
                ))}
              </div>

              {/* How to Apply */}
              <h2 className="text-xl font-extrabold text-[#0E1E3A] mb-4">How to Apply for a Tourist Visa</h2>
              <div className="flex flex-col gap-3 mb-8">
                {APPLY_STEPS.map((s) => (
                  <div key={s.step} className="rounded-lg border-l-4 border-brand-500 bg-brand-50 px-4 py-3">
                    <p className="text-[13px] font-bold text-[#0E1E3A] mb-0.5">{s.step}</p>
                    <p className="text-[12px] text-zinc-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>

              {/* Why SpaksTrip */}
              <h2 className="text-xl font-extrabold text-[#0E1E3A] mb-4">Why Choose SpaksTrip for Your Tourist Visa?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_US.map((w) => (
                  <div key={w.label} className="flex gap-3 items-start rounded-lg border border-zinc-200 p-4">
                    <span className="text-2xl shrink-0">{w.icon}</span>
                    <div>
                      <p className="text-[13px] font-bold text-[#0E1E3A]">{w.label}</p>
                      <p className="text-[12px] text-zinc-500 mt-0.5">{w.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <VisaSidebar activeVisa="Tourist Visa" visaType="Tourist Visa" />
        </div>
      </div>
    </section>
  );
}
