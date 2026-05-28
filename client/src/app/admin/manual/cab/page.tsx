import type { Metadata } from "next";
import ManualCabListing from "@/components/admin/ManualCabListing";

export const metadata: Metadata = {
  title: "Manual Cab Listing | SpaksTrip Admin",
};

export default function ManualCabListingPage() {
  return <ManualCabListing />;
}
