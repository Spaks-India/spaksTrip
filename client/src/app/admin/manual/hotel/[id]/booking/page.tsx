import type { Metadata } from "next";
import ManualHotelBooking from "@/components/admin/ManualHotelBooking";

export const metadata: Metadata = {
  title: "Secure Checkout | Manual Hotel | SpaksTrip Admin",
};

export default function ManualHotelBookingPage({ params }: { params: { id: string } }) {
  return <ManualHotelBooking hotelId={params.id} />;
}
