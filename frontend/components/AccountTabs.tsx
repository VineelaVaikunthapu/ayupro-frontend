"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Profile", href: "/account/profile" },
  { label: "Consents", href: "/account/consents" },
  { label: "Favorites", href: "/account/favorites" },
  { label: "Notifications", href: "/account/notifications" },
];

export default function AccountTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-black/10 pb-4">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              active
                ? "bg-[#1F5D3A] text-white"
                : "bg-white text-[#4A4A4A] hover:bg-[#EEF6EF]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}