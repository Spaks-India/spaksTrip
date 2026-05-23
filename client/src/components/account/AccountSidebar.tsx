"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type AccountMenuItem = {
  label: string;
  href: string;
  isNew?: boolean;
  icon: React.ReactNode;
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center text-current">
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </span>
  );
}

const MENU_ITEMS: AccountMenuItem[] = [
  {
    label: "Make Payment",
    href: "/accounts/make-payment",
    icon: (
      <Icon>
        <path d="M2 9h20M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="M7 15h2M14 15h3" />
      </Icon>
    ),
  },
  {
    label: "PG Failure Queue",
    href: "/accounts/pg-failure-queue",
    icon: (
      <Icon>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </Icon>
    ),
  },
  {
    label: "Flight Credit Note",
    href: "/accounts/credit-notes/flight",
    icon: (
      <Icon>
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
      </Icon>
    ),
  },
  {
    label: "Insurance Credit Note",
    href: "/accounts/credit-notes/insurance",
    icon: (
      <Icon>
        <path d="M12 3l7 3v5c0 4.2-2.8 7-7 10-4.2-3-7-5.8-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </Icon>
    ),
  },
  {
    label: "Bus Credit Note",
    href: "/accounts/credit-notes/bus",
    icon: (
      <Icon>
        <rect x="5" y="4" width="14" height="13" rx="2" />
        <path d="M5 11h14" />
        <circle cx="8.5" cy="14.5" r="1" />
        <circle cx="15.5" cy="14.5" r="1" />
        <path d="M7 20v-3M17 20v-3" />
      </Icon>
    ),
  },
  {
    label: "Car Credit Note",
    href: "/accounts/credit-notes/car",
    icon: (
      <Icon>
        <path d="M5 17h14" />
        <path d="M5 17l1.5-6a2 2 0 0 1 2-1.5h7a2 2 0 0 1 2 1.5L19 17" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
      </Icon>
    ),
  },
  {
    label: "Hotel Credit Note",
    href: "/accounts/credit-notes/hotel",
    icon: (
      <Icon>
        <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
        <path d="M4 21h16" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2" />
      </Icon>
    ),
  },
  {
    label: "Transfer Credit Note",
    href: "/accounts/credit-notes/transfer",
    icon: (
      <Icon>
        <path d="M4 16h16" />
        <path d="M6 16V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
        <path d="M9 10h6" />
        <circle cx="8.5" cy="17.5" r="1.5" />
        <circle cx="15.5" cy="17.5" r="1.5" />
      </Icon>
    ),
  },
  {
    label: "Invoice History",
    href: "/accounts/invoice-history",
    isNew: true,
    icon: (
      <Icon>
        <path d="M7 3h7l3 3v15H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 9h5M10 13h4M10 17h6" />
      </Icon>
    ),
  },
  {
    label: "Payment History",
    href: "/accounts/payment-history",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </Icon>
    ),
  },
  {
    label: "View Accounts",
    href: "/accounts/view",
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4-4" />
      </Icon>
    ),
  },
  {
    label: "Agency ITR Declaration",
    href: "/accounts/itr-declaration",
    isNew: true,
    icon: (
      <Icon>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h3" />
      </Icon>
    ),
  },
  {
    label: "Agency PAN Declaration",
    href: "/accounts/pan-declaration",
    isNew: true,
    icon: (
      <Icon>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <circle cx="9" cy="12" r="2" />
        <path d="M13 10h5M13 14h3" />
      </Icon>
    ),
  },
  {
    label: "Bank Account",
    href: "/accounts/bank-account",
    icon: (
      <Icon>
        <path d="M3 9l9-4 9 4v1H3z" />
        <path d="M5 10v6M10 10v6M14 10v6M19 10v6" />
        <path d="M3 16h18v2H3z" />
      </Icon>
    ),
  },
  {
    label: "Spakstrp Bank Detail",
    href: "/accounts/bank-detail",
    icon: (
      <Icon>
        <path d="M3 9l9-4 9 4v1H3z" />
        <path d="M5 10v6M10 10v6M14 10v6M19 10v6" />
        <path d="M3 16h18v2H3z" />
      </Icon>
    ),
  },
  {
    label: "Spakstrip GST Details",
    href: "/accounts/gst-details",
    icon: (
      <Icon>
        <path d="M7 3h8l3 3v15H7z" />
        <path d="M15 3v4h4" />
        <path d="M10 10h5M10 14h4M10 18h6" />
      </Icon>
    ),
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-[#ee6e23] px-4 py-3">
        <h6 className="text-sm font-semibold text-white">Account</h6>
      </div>
      <nav>
        <ul className="divide-y divide-slate-100">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 hover:bg-orange-50 hover:text-[#ee6e23]",
                  pathname === item.href
                    ? "bg-orange-50 text-[#ee6e23]"
                    : "text-slate-700",
                )}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.isNew && (
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-[#ee6e23]">
                    New
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
