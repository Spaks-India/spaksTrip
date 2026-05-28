import type { Metadata } from "next";
import ManualHotelListing from "@/components/admin/ManualHotelListing";

export const metadata: Metadata = {
  title: "Manual Hotel Listing | SpaksTrip Admin",
};

export default function ManualHotelListingPage() {
  return <ManualHotelListing />;
}
