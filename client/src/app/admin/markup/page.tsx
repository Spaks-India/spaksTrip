import type { Metadata } from "next";
import MarkupContent from "@/components/admin/MarkupContent";

export const metadata: Metadata = {
  title: "Markup Management | SpaksTrip Admin",
};

export default function MarkupPage() {
  return <MarkupContent />;
}
