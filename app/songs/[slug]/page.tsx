import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { SongPageSections } from "@/components/song/song-page-sections";
import { getSongBySlug, songs } from "@/content/songs";
import { buildPageMetadata } from "@/lib/seo";

type SongPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return songs.map((song) => ({ slug: song.slug }));
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { slug } = await params;
  const song = getSongBySlug(slug);

  if (!song) {
    return {};
  }

  return buildPageMetadata({
    title: song.title,
    description: song.summary,
    path: `/songs/${song.slug}`,
    image: song.coverImage?.src
  });
}

export const dynamicParams = false;

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params;
  const song = getSongBySlug(slug);

  if (!song) {
    notFound();
  }

  return (
    <PageShell className="pb-12 pt-0 sm:pb-20">
      <SongPageSections song={song} />
    </PageShell>
  );
}
