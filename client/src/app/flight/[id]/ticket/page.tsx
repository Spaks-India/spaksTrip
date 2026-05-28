import type { Metadata } from "next";
import FlightETicket from "@/components/flight/FlightETicket";

export const metadata: Metadata = {
  title: "E-Ticket | SpaksTrip",
  description: "View, print, email, or share your flight e-ticket.",
};

export default function FlightETicketPage({ params }: { params: { id: string } }) {
  return <FlightETicket id={params.id} />;
}
