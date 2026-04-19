"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/content/site";
import { PageShell } from "@/components/page-shell";

export function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/music") {
      return pathname === "/music" || pathname.startsWith("/songs/");
    }

    if (href === "/journal") {
      return pathname === "/journal" || pathname.startsWith("/journal/");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="border-b border-[color:var(--border)]">
      <PageShell className="flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between md:py-8">
        <div>
          <Link href="/" className="font-serif text-2xl font-medium tracking-[0.02em]">
            {siteConfig.name}
          </Link>
          <p className="mt-1.5 max-w-md text-sm leading-6 text-[var(--muted)]">
            Songs from a family walking with Jesus through real life.
          </p>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-3 gap-y-2.5 text-sm text-[var(--muted)]">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex rounded-full px-3.5 py-2 transition-colors duration-150 ${
                    isActive(item.href)
                      ? "bg-[var(--surface)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_var(--border)]"
                      : "hover:bg-[rgba(255,255,255,0.56)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageShell>
    </header>
  );
}
