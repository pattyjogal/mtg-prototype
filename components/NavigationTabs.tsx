"use client";

import { TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PATHS = [
  { name: "Dashboard", href: "/" },
  { name: "Precons", href: "#" },
  { name: "Cards", href: "/cards" },
  { name: "Sets", href: "#" },
];

export default function NavigationTabs() {
  const pathname = usePathname();

  return (
    <TabNav.Root>
      {PATHS.map(({ name, href }) => (
        <TabNav.Link key={name} asChild active={href === pathname}>
          <Link href={href}>{name}</Link>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
}
