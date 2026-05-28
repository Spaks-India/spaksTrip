import type { Metadata } from "next";
import ManualFlightListing from "@/components/admin/ManualFlightListing";

export const metadata: Metadata = {
  title: "Manual Flight Listing | SpaksTrip Admin",
};

export default function ManualFlightListingPage() {
  return <ManualFlightListing />;
}
