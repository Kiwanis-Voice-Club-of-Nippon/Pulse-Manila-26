"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Today" },
  { href: "/schedule", label: "Schedule" },
  { href: "/updates", label: "Updates" },
  { href: "/venues", label: "Venues" },
  { href: "/aspac", label: "ASPAC" },
  { href: "/saved", label: "Saved" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="chip-link"
          data-active={isActive(pathname, item.href)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
