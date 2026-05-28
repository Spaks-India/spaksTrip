import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import BackToTop from "@/components/landing/BackToTop";
import VisaHero from "@/components/visa/VisaHero";
import DocumentChecklist from "@/components/visa/DocumentChecklist";
import TouristVisaContent from "@/components/visa/TouristVisaContent";
import VisaFAQ from "@/components/visa/VisaFAQ";

export const metadata: Metadata = {
  title: "Tourist Visa Services | SpaksTrip",
  description:
    "Apply for a tourist visa from India to 150+ countries. SpaksTrip offers expert guidance, document support, and fast processing for leisure and vacation travellers.",
};

export default function TouristVisaPage() {
  return (
    <div className="min-h-screen bg-white text-[#0E1E3A]">
      <Header />
      <main>
        <VisaHero title="Tourist Visa" />
        <DocumentChecklist type="tourist-visa" />
        <TouristVisaContent />
        <VisaFAQ title="Tourist Visa" />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
