import type { Metadata } from "next";
import NationalTourBooking from "@/components/tours/NationalTourBooking";

export const metadata: Metadata = {
  title: "National Tour Booking | SpaksTrip",
  description: "Select your flight and complete checkout for your national tour package.",
};

export default function NationalTourBookingPage({ params }: { params: { id: string } }) {
  return <NationalTourBooking id={params.id} />;
}
