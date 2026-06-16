import Link from "next/link";

import { FollowAlongForm } from "@/components/follow-along-form";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/content/site";

const musicServiceIcons: Record<string, string> = {
  YouTube: "https://www.youtube.com/favicon.ico",
  Spotify: "https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico",
  "Apple Music": "https://music.apple.com/favicon.ico",
  "Amazon Music": "https://www.amazon.com/favicon.ico",
  "YouTube Music": "https://music.youtube.com/favicon.ico"
};

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[color:var(--border)] pb-12 pt-16 sm:pt-20">
      <PageShell>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div id="follow-along">
            <FollowAlongForm compact />
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h2 className="font-serif text-2xl">The Gartleys</h2>
              <p className="mt-3.5 text-sm leading-7 text-[var(--muted)]">
                Songs from our journey with the Lord.
              </p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                Navigation
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative inline-flex text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:text-[var(--foreground)] focus-visible:outline-none"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                Listen
              </h3>
              <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
                {siteConfig.socialLinks.map((item) => {
                  const title = `Listen to The Gartleys on ${item.label}`;

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        title={title}
                        aria-label={title}
                        className="flex aspect-square w-full items-center justify-center rounded-full border border-[color:var(--border)] bg-[rgba(255,255,255,0.42)] transition hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:bg-[rgba(255,255,255,0.66)] focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
                      >
                        <img
                          src={musicServiceIcons[item.label]}
                          alt=""
                          className="size-5 rounded-[0.2rem]"
                          loading="lazy"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[color:var(--border)] pt-6 text-sm text-[var(--muted)]">
          <p>
            &copy; {currentYear} The Gartleys. All Rights Reserved.{" "}
            <Link
              href="/privacy"
              className="group relative inline-flex transition-colors hover:text-[var(--foreground)] focus-visible:text-[var(--foreground)] focus-visible:outline-none"
            >
              <span>Privacy Policy</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          </p>
        </div>
      </PageShell>
    </footer>
  );
}
