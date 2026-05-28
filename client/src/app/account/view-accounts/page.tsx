import type { Metadata } from "next";
import ViewAccountsContent from "@/components/account/ViewAccountsContent";

export const metadata: Metadata = {
  title: "View Accounts | SpaksTrip",
  description: "View your account summary, unpaid invoices, ledger, and pending payments.",
};

export default function ViewAccountsPage() {
  return <ViewAccountsContent />;
}
