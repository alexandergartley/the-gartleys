"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { siteConfig } from "@/content/site";
import { PageShell } from "@/components/page-shell";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
      <PageShell className="py-5 md:flex md:items-center md:justify-between md:py-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link href="/" className="font-serif text-2xl font-medium tracking-[0.02em]">
                {siteConfig.name}
              </Link>
              <p className="mt-1.5 max-w-md text-sm leading-6 text-[var(--muted)]">
                Songs from a family walking with Jesus through real life.
              </p>
            </div>
            <button
              type="button"
              aria-controls={menuId}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.46)] text-[var(--foreground)] transition-colors duration-150 hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-150 ${
                    isMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-opacity duration-150 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-150 ${
                    isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <nav
          id={menuId}
          aria-label="Primary"
          className={`${isMenuOpen ? "block" : "hidden"} mt-5 md:mt-0 md:block`}
        >
          <ul className="grid gap-2 rounded-2xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.42)] p-2 text-sm text-[var(--muted)] md:flex md:flex-wrap md:gap-x-3 md:gap-y-2.5 md:border-0 md:bg-transparent md:p-0">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex rounded-xl px-3.5 py-2.5 transition-colors duration-150 md:inline-flex md:rounded-full md:py-2 ${
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
