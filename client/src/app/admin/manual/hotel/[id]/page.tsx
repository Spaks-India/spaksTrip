import type { Metadata } from "next";
import ManualHotelDetail from "@/components/admin/ManualHotelDetail";

export const metadata: Metadata = {
  title: "Hotel Details | Manual Listing | SpaksTrip Admin",
};

export default function ManualHotelDetailPage({ params }: { params: { id: string } }) {
  return <ManualHotelDetail id={params.id} />;
}
