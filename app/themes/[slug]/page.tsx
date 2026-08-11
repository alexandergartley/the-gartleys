import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { SongCard } from "@/components/song/song-card";
import { ThemeChip } from "@/components/song/theme-chip";
import { songs } from "@/content/songs";
import { getThemeBySlug, songThemes } from "@/content/themes";
import { buildPageMetadata } from "@/lib/seo";

type ThemePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return songThemes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);

  if (!theme) {
    return {};
  }

  return buildPageMetadata({
    title: `${theme.label} Songs`,
    description: theme.intro,
    path: `/themes/${theme.slug}`
  });
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = getThemeBySlug(slug);

  if (!theme) {
    notFound();
  }

  const themedSongs = songs
    .filter((song) => song.themeSlugs?.includes(theme.slug))
    .sort((left, right) => +new Date(right.releaseDate) - +new Date(left.releaseDate));

  const relatedThemes = songThemes
    .filter((candidate) => candidate.slug !== theme.slug)
    .map((candidate) => {
      const overlapCount = songs.filter(
        (song) =>
          song.themeSlugs?.includes(theme.slug) && song.themeSlugs?.includes(candidate.slug)
      ).length;

      return {
        ...candidate,
        overlapCount
      };
    })
    .filter((candidate) => candidate.overlapCount > 0)
    .sort((left, right) => right.overlapCount - left.overlapCount || left.label.localeCompare(right.label))
    .slice(0, 4);

  return (
    <PageShell className="py-12 sm:py-20">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[var(--muted)]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/music" className="transition-colors hover:text-[var(--foreground)]">
              Music
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/themes" className="transition-colors hover:text-[var(--foreground)]">
              Themes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--foreground)]">
            {theme.label}
          </li>
        </ol>
      </nav>

      <section className="soft-panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
        <p className="section-eyebrow">Theme</p>
        <h1 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">{theme.label}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-[var(--muted)]">{theme.intro}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
          Where this shows up in Scripture
        </h2>
        <div className="mt-6 grid gap-5">
          {theme.scriptures.map((item) => (
            <article key={item.reference} className="soft-panel rounded-[1.5rem] p-6 sm:p-7">
              <p className="section-eyebrow">{item.reference}</p>
              <p className="mt-3 font-serif text-2xl leading-relaxed">{item.passage}</p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">
                {item.reflection}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Songs written in this space</h2>
        <div className="mt-6 grid gap-6">
          {themedSongs.map((song) => (
            <SongCard key={song.slug} song={song} />
          ))}
        </div>
      </section>

      {relatedThemes.length ? (
        <section className="mt-10 rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.45)] p-6 sm:p-7">
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Related themes</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {relatedThemes.map((related) => (
              <ThemeChip key={related.slug} slug={related.slug} label={related.label} />
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
