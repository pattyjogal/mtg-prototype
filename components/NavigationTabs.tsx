"use client";

import { TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PATHS = [
  { name: "Dashboard", href: "/" },
  { name: "Precons", href: "#", disabled: true },
  { name: "Cards", href: "/cards" },
  { name: "Sets", href: "#", disabled: true },
];

export default function NavigationTabs() {
  const pathname = usePathname();

  return (
    <TabNav.Root>
      {PATHS.map(({ name, href, disabled }) => (
        <TabNav.Link key={name} asChild active={href === pathname}>
          <Link href={href} className={disabled ? "cursor-not-allowed" : ""}>
            {name}
          </Link>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
}
