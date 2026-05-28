import type { Metadata } from "next";
import MakePaymentContent from "@/components/account/MakePaymentContent";

export const metadata: Metadata = {
  title: "Make Payment | SpaksTrip",
  description: "Submit payments via cheque, draft, NEFT, UPI, and more.",
};

export default function MakePaymentPage() {
  return <MakePaymentContent />;
}
