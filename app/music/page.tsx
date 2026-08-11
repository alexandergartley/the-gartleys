import Link from "next/link";

import { LiveWorshipCallout } from "@/components/live-worship-callout";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { SongCard } from "@/components/song/song-card";
import { ThemeChip } from "@/components/song/theme-chip";
import { songs } from "@/content/songs";
import { songThemes } from "@/content/themes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Music",
  description:
    "Browse The Gartleys song library with recordings, lyrics, and stories behind each release.",
  path: "/music"
});

export default function MusicPage() {
  const sortedSongs = [...songs].sort(
    (left, right) => +new Date(right.releaseDate) - +new Date(left.releaseDate)
  );

  return (
    <PageShell className="py-12 sm:py-20">
      <SectionHeading
        eyebrow="Music"
        title="Songs, one at a time"
        description="Each song holds a moment - the music, the story behind it, and the Scripture that shaped it."
      />
      <section id="themes" aria-labelledby="music-themes-heading" className="mt-8 scroll-mt-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="music-themes-heading" className="font-serif text-2xl leading-tight">
              Themes
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Explore the songs by the themes they carry.
            </p>
          </div>
          <Link
            href="/themes"
            className="w-fit text-sm text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:decoration-[var(--foreground)]"
          >
            Explore all themes
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {songThemes.map((theme) => (
            <ThemeChip key={theme.slug} slug={theme.slug} label={theme.label} />
          ))}
        </div>
      </section>
      <div className="mt-10">
        <LiveWorshipCallout variant="compact" />
      </div>
      <div id="songs" className="mt-10 grid scroll-mt-24 gap-6">
        {sortedSongs.map((song) => (
          <SongCard key={song.slug} song={song} />
        ))}
      </div>
    </PageShell>
  );
}
