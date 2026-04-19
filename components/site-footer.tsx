import Link from "next/link";

import { FollowAlongForm } from "@/components/follow-along-form";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--border)] pb-12 pt-16 sm:pt-20">
      <PageShell>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div id="follow-along">
            <FollowAlongForm compact />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <h2 className="font-serif text-2xl">The Gartleys</h2>
              <p className="mt-3.5 text-sm leading-7 text-[var(--muted)]">
                Songs from our journey with the Lord.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                  Navigation
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {siteConfig.navigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="transition-colors hover:text-[var(--foreground)]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                  Listen
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {siteConfig.socialLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[var(--foreground)]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[color:var(--border)] pt-6 text-sm text-[var(--muted)]">
          <Link href="/privacy" className="hover:text-[var(--foreground)]">
            Privacy Policy
          </Link>
        </div>
      </PageShell>
    </footer>
  );
}
