import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";
import TransportContent from "@/components/transport/TransportContent";

export const metadata: Metadata = {
  title: "Transport & Travel | SpaksTrip",
  description:
    "Book cabs, outstation rides, and airport transfers across India. Flexible pick-up, verified drivers, and transparent pricing with SpaksTrip.",
};

export default function TransportPage() {
  return (
    <div className="min-h-screen bg-white text-[#0E1E3A]">
      <Header />
      <main>
        <TransportContent />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
