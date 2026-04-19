import Image from "next/image";
import Link from "next/link";

import type { Song } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type SongCardProps = {
  song: Song;
};

export function SongCard({ song }: SongCardProps) {
  return (
    <article className="soft-panel rounded-[1.75rem] p-6 sm:p-9">
      <div
        className={
          song.coverImage
            ? "grid gap-6 md:grid-cols-[minmax(0,1fr)_10rem] md:items-start"
            : ""
        }
      >
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">{formatDate(song.releaseDate)}</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            <Link href={`/songs/${song.slug}`} className="transition-colors hover:text-[var(--muted)]">
              {song.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-[1.85] text-[var(--muted)]">{song.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/songs/${song.slug}`} className="button-primary">
              Experience the Song
            </Link>
          </div>
        </div>
        {song.coverImage ? (
          <div className="max-w-[10rem] md:justify-self-end">
            <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]">
              <Image
                src={song.coverImage.src}
                alt={song.coverImage.alt}
                width={800}
                height={800}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
