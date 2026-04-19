import Image from "next/image";
import Link from "next/link";

import type { JournalFrontmatter } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type JournalCardProps = {
  entry: JournalFrontmatter;
  isFirst?: boolean;
  variant?: "archive" | "homepage";
};

const journalCardImages: Record<string, { src: string; alt: string }> = {
  "making-room-for-small-songs": {
    src: "/journal/making-room-for-small-songs-hero-v2.jpg",
    alt: "Journal cover image for a songwriting process reflection"
  },
  "when-a-song-becomes-a-place-to-pray": {
    src: "/journal/when-a-song-becomes-a-place-to-pray-hero-v2.jpg",
    alt: "Journal cover image for a prayerful worship reflection"
  },
  "family-life-between-verses": {
    src: "/journal/family-life-between-verses-hero-v2.jpg",
    alt: "Journal cover image for a reflection on wrestling and songwriting"
  }
};

const archiveImageRotations: Record<string, string> = {
  "making-room-for-small-songs": "-rotate-[3deg]",
  "when-a-song-becomes-a-place-to-pray": "rotate-[2deg]",
  "family-life-between-verses": "-rotate-[4deg]"
};

export function JournalCard({
  entry,
  isFirst = false,
  variant = "archive"
}: JournalCardProps) {
  const [month, day, year] = formatDate(entry.date).replace(",", "").split(" ");
  const image = journalCardImages[entry.slug];
  const isHomepage = variant === "homepage";

  return (
    <article
      className={
        isHomepage
          ? "soft-panel rounded-[1.75rem] p-4 sm:p-5"
          : `grid gap-4 border-t border-[var(--border)] py-8 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7 ${isFirst ? "border-t-0 pt-6" : ""}`
      }
    >
      {isHomepage ? (
        <div>
          {image ? (
            <Link
              href={`/journal/${entry.slug}`}
              className={`mb-5 block w-fit transition-transform duration-200 hover:-translate-y-1 ${archiveImageRotations[entry.slug] ?? "-rotate-[2deg]"}`}
            >
              <figure className="rounded-[0.5rem] border border-[rgba(74,63,51,0.14)] bg-white p-3 pb-5 shadow-[0_18px_38px_rgba(47,42,37,0.12)]">
                <div className="w-[13.5rem] overflow-hidden rounded-[0.25rem] bg-[rgba(247,241,232,0.8)] sm:w-[14.5rem]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </figure>
            </Link>
          ) : null}
          <div className="mt-4 text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
            <span>{month}</span>
            <span className="mx-2">·</span>
            <span>{day}</span>
            <span className="mx-2">·</span>
            <span>{year}</span>
          </div>
          <h2 className="mt-3 font-serif text-[2rem] leading-tight sm:text-[1.9rem]">
            <Link
              href={`/journal/${entry.slug}`}
              className="transition-colors hover:text-[var(--muted)]"
            >
              {entry.title}
            </Link>
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">{entry.excerpt}</p>
          <Link
            href={`/journal/${entry.slug}`}
            className="mt-6 inline-flex text-sm uppercase tracking-[0.08em] text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)]"
          >
            Read entry
          </Link>
        </div>
      ) : (
        <>
          <div className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
            <p>{month}</p>
            <p className="mt-1.5 text-2xl tracking-normal text-[var(--foreground)]">{day}</p>
            <p className="mt-1">{year}</p>
          </div>

          <div className="max-w-3xl">
            {image ? (
              <Link
                href={`/journal/${entry.slug}`}
                className={`mb-6 block w-fit transition-transform duration-200 hover:-translate-y-1 md:float-right md:mb-3 md:ml-8 ${archiveImageRotations[entry.slug] ?? "-rotate-[2deg]"}`}
              >
                <figure className="rounded-[0.5rem] border border-[rgba(74,63,51,0.14)] bg-white p-3 pb-5 shadow-[0_18px_38px_rgba(47,42,37,0.12)]">
                  <div className="w-[14rem] overflow-hidden rounded-[0.25rem] bg-[rgba(247,241,232,0.8)] sm:w-[15.5rem]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={900}
                      height={600}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </figure>
              </Link>
            ) : null}
            <h2 className="font-serif text-3xl leading-tight sm:text-[2.15rem]">
              <Link
                href={`/journal/${entry.slug}`}
                className="transition-colors hover:text-[var(--muted)]"
              >
                {entry.title}
              </Link>
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{entry.excerpt}</p>
            <Link
              href={`/journal/${entry.slug}`}
              className="mt-6 inline-flex text-sm uppercase tracking-[0.08em] text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)]"
            >
              Read entry
            </Link>
            {image ? <div className="hidden md:block md:clear-both" /> : null}
          </div>
        </>
      )}
    </article>
  );
}
