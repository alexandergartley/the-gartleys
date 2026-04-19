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
      <section className="mt-8">
        <div className="flex flex-wrap gap-2.5">
          {songThemes.map((theme) => (
            <ThemeChip key={theme.slug} slug={theme.slug} label={theme.label} />
          ))}
        </div>
      </section>
      <div className="mt-10 grid gap-6">
        {sortedSongs.map((song) => (
          <SongCard key={song.slug} song={song} />
        ))}
      </div>
    </PageShell>
  );
}
