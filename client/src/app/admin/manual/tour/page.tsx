import type { Metadata } from "next";
import ManualTourListing from "@/components/admin/ManualTourListing";

export const metadata: Metadata = {
  title: "Manual International Tour Listing | SpaksTrip Admin",
};

export default function ManualTourListingPage() {
  return <ManualTourListing />;
}
