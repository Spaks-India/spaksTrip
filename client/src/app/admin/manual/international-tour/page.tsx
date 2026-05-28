import type { Metadata } from "next";
import ManualInternationalTourListing from "@/components/admin/ManualInternationalTourListing";

export const metadata: Metadata = {
  title: "Manual International Tour Listing | SpaksTrip Admin",
};

export default function ManualInternationalTourPage() {
  return <ManualInternationalTourListing />;
}
