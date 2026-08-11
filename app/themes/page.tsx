import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { songs } from "@/content/songs";
import { songThemes } from "@/content/themes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Themes",
  description:
    "Explore The Gartleys' worship songs by themes of trust, surrender, waiting, freedom, healing, grace, worship, and following Jesus through changing seasons.",
  path: "/themes"
});

export default function ThemesPage() {
  const themeDirectory = songThemes.map((theme) => ({
    ...theme,
    songCount: songs.filter((song) => song.themeSlugs?.includes(theme.slug)).length
  }));

  return (
    <PageShell className="py-12 sm:py-20">
      <section className="soft-panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
        <p className="section-eyebrow">Explore the music</p>
        <div className="mt-5 border-t border-[var(--border)] pt-6">
          <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-7xl">Themes</h1>
        </div>
        <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          Some songs begin in surrender. Others come out of waiting, fear, transition, gratitude,
          or the simple need to remember what is true. These themes are another way to explore the
          music - through the places we&apos;ve met Jesus and the truths we keep returning to.
        </p>
      </section>

      <section aria-labelledby="theme-directory-heading" className="mt-10">
        <h2 id="theme-directory-heading" className="sr-only">
          Explore songs by theme
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {themeDirectory.map((theme) => (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              className="group flex h-full flex-col rounded-[1.75rem] border border-[var(--border)] bg-[rgba(255,255,255,0.48)] p-6 transition-colors hover:border-[rgba(77,67,55,0.3)] hover:bg-[rgba(255,255,255,0.68)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)] sm:p-7"
            >
              <h3 className="font-serif text-3xl leading-tight">{theme.label}</h3>
              <span className="mt-3 w-fit rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted)]">
                {theme.songCount} {theme.songCount === 1 ? "song" : "songs"}
              </span>
              <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted)]">{theme.intro}</p>
              <span className="mt-6 text-sm font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 transition-colors group-hover:decoration-[var(--foreground)]">
                Explore theme
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-[var(--border)] pt-8">
        <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
          These themes overlap, because life with Jesus does too. A song written in fear may become
          a song of surrender; a season of waiting may teach us trust. Follow whichever theme meets
          you where you are.
        </p>
      </section>
    </PageShell>
  );
}
