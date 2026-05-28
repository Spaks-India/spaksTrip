import type { Metadata } from "next";
import CruiseCheckout from "@/components/cruise/CruiseCheckout";

export const metadata: Metadata = {
  title: "Cruise Checkout | SpaksTrip",
  description: "Enter guest details and complete your cruise booking.",
};

export default function CruiseCheckoutPage({ params }: { params: { id: string } }) {
  return <CruiseCheckout id={params.id} />;
}
