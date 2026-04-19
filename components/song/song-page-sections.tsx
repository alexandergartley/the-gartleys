import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { MediaEmbed } from "@/components/media-embed";
import { CoverArtLightbox } from "@/components/song/cover-art-lightbox";
import { ThemeChip } from "@/components/song/theme-chip";
import { getThemeBySlug } from "@/content/themes";
import type { Song } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type SongPageSectionsProps = {
  song: Song;
};

function StreamingIcon({ label }: { label: string }) {
  const iconClassName = "h-[1.05rem] w-[1.05rem] shrink-0";

  switch (label) {
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <rect
            x="2.75"
            y="5.25"
            width="18.5"
            height="13.5"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M10 9.15 15.7 12 10 14.85V9.15Z" fill="currentColor" />
        </svg>
      );
    case "Spotify":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <circle cx="12" cy="12" r="9.1" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M7.2 10.05c3.1-1 6.45-.8 9.55.55"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M7.95 13c2.45-.7 5.15-.52 7.3.48"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinecap="round"
          />
          <path
            d="M8.8 15.7c1.75-.42 3.66-.3 5.18.36"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Apple Music":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <path
            d="M16.3 4.6v9.65a2.85 2.85 0 1 1-1.7-2.62V7.15L9.1 8.3v7.2a2.85 2.85 0 1 1-1.72-2.62V6.55c0-.57.4-1.06.96-1.17l6.56-1.34c.72-.15 1.4.4 1.4 1.16Z"
            fill="currentColor"
          />
        </svg>
      );
    case "Amazon Music":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <path
            d="M8.25 10.85 7.2 13.8H5.6L9.3 4.75h1.54l3.75 9.05h-1.65l-1.08-2.95H8.25Zm3.15-1.28-.98-2.67-.24-.87-.23.87-.98 2.67h2.43Z"
            fill="currentColor"
          />
          <path
            d="M5.4 16.6c3.85 2 9 1.74 12.6-.77.39-.26.8.28.45.6-3.95 3.47-9.58 3.76-13.39.79-.3-.24-.02-.8.34-.62Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </svg>
      );
    case "YouTube Music":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 9.85 14.4 12 11 14.15v-4.3Z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClassName}>
          <path
            d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5A8.5 8.5 0 0 0 12 3.5Zm-1.1 12.2-3-3 1-1 2 2 4.2-4.2 1 1-5.2 5.2Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

function SongSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[var(--border)] py-12 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function SongPageSections({ song }: SongPageSectionsProps) {
  const resolvedThemes =
    song.themeSlugs
      ?.map((slug) => getThemeBySlug(slug))
      .filter((theme): theme is NonNullable<typeof theme> => Boolean(theme)) ?? [];
  const platformLinks = song.streamingLinks.filter((link) => link.label !== "YouTube");

  return (
    <div className="relative isolate space-y-14 pt-12 sm:pt-16">
      {song.coverImage ? (
        <div className="pointer-events-none absolute left-1/2 top-0 z-[-1] h-[62rem] w-screen -translate-x-1/2 overflow-hidden">
          <Image
            src={song.coverImage.src}
            alt=""
            width={2200}
            height={2200}
            aria-hidden="true"
            className="h-full w-full scale-[1.08] object-cover opacity-[0.36] blur-[16px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,244,238,0.12),rgba(248,244,238,0.06)_18%,rgba(248,244,238,0.14)_42%,rgba(248,244,238,0.46)_66%,rgba(248,244,238,0.82)_84%,#f8f4ee_100%)]" />
        </div>
      ) : null}

      <section className="relative soft-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div>
        <div
          className={
            song.coverImage
              ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start"
              : "grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start"
          }
        >
          <div>
            <p className="section-eyebrow">Song</p>
            <div className="mt-5 border-t border-[var(--border)] pt-6">
              <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-7xl">
                {song.title}
              </h1>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              {song.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
              <span>Released {formatDate(song.releaseDate)}</span>
              <span className="hidden h-1 w-1 rounded-full bg-[var(--border)] sm:block" />
              <span>Acoustic worship / family recording</span>
            </div>
            {resolvedThemes.length ? (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {resolvedThemes.map((theme) => (
                  <ThemeChip key={theme.slug} slug={theme.slug} label={theme.label} />
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {platformLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={index === 0 ? "button-primary" : "button-secondary"}
                >
                  <span className="inline-flex items-center justify-center">
                    <StreamingIcon label={link.label} />
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          {song.coverImage ? (
            <figure className="soft-panel w-full max-w-[18rem] rotate-[2deg] rounded-[1.75rem] p-3 lg:justify-self-end">
              <CoverArtLightbox
                src={song.coverImage.src}
                alt={song.coverImage.alt}
                caption={song.coverImage.caption}
              />
              {song.coverImage.caption ? (
                <figcaption className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {song.coverImage.caption} · Click to enlarge
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <aside className="hidden lg:block lg:justify-self-end">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.42)] p-5">
                <p className="section-eyebrow">Entry</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Song page, story, and process notes kept together in one place.
                </p>
              </div>
            </aside>
          )}
        </div>
        </div>
      </section>

      <SongSection title="Listen">
        <MediaEmbed title={`${song.title} media`} url={song.mediaEmbedUrl} audio={song.mediaAudio} />
      </SongSection>

      {song.aboutText ? (
        <SongSection title="About This Song">
          <div className="reading-width prose-gartley">
            <p>{song.aboutText}</p>
          </div>
        </SongSection>
      ) : null}

      {song.lyrics ? (
        <SongSection title="Lyrics">
          <div className="soft-panel rounded-[1.75rem] p-6 sm:p-8">
            <div className="song-lyrics reading-width">{song.lyrics}</div>
          </div>
        </SongSection>
      ) : null}

      {song.storyText?.length ? (
        <SongSection title="Behind the Song">
          <div className="reading-width prose-gartley">
            {song.storyText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SongSection>
      ) : null}

      {song.scriptureReferences?.length ? (
        <SongSection title="Rooted in Scripture">
          <div className="grid gap-5">
            {song.scriptureReferences.map((item) => (
              <article key={item.reference} className="soft-panel rounded-[1.5rem] p-6 sm:p-7">
                <p className="section-eyebrow">{item.reference}</p>
                {item.passage ? (
                  <p className="mt-3 font-serif text-2xl leading-relaxed">{item.passage}</p>
                ) : null}
                <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">
                  {item.reflection}
                </p>
              </article>
            ))}
          </div>
        </SongSection>
      ) : null}

      {song.timeline?.length ? (
        <SongSection title="From Writing to Release">
          <ol className="grid gap-5">
            {song.timeline.map((item) => (
              <li key={item.label} className="soft-panel rounded-[1.5rem] p-6 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                  <div className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                    <DateStamp date={item.date} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl">{item.label}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
                    {item.audio ? (
                      <div className="mt-5 max-w-xl rounded-[1.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.45)] p-4">
                        <div
                          aria-hidden="true"
                          className="mb-4 flex h-10 items-end gap-1 overflow-hidden rounded-[0.9rem] border border-[var(--border)] bg-[rgba(255,255,255,0.52)] px-3 py-2"
                        >
                          {[12, 20, 15, 28, 18, 24, 14, 26, 17, 22, 13, 29].map((height, index) => (
                            <span
                              key={`${item.label}-wave-${index}`}
                              className="w-2 rounded-full bg-[rgba(113,113,95,0.28)]"
                              style={{ height: `${height}px` }}
                            />
                          ))}
                        </div>
                        <audio className="w-full" controls preload="metadata">
                          <source src={item.audio.src} type={item.audio.type ?? "audio/mp4"} />
                          Your browser does not support the audio player.
                        </audio>
                        {item.audio.caption ? (
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {item.audio.caption}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SongSection>
      ) : null}

      {song.notesImages?.length ? (
        <SongSection title="Handwritten Notes">
          <div className="grid gap-6 md:grid-cols-2">
            {song.notesImages.map((image, index) => (
              <figure
                key={image.src}
                className={`soft-panel rounded-[1.75rem] p-4 ${index % 2 === 0 ? "md:rotate-[-1.5deg]" : "md:rotate-[1.5deg] md:translate-y-8"}`}
              >
                <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]">
                  <Image src={image.src} alt={image.alt} width={1200} height={900} className="w-full" />
                </div>
                {image.caption ? (
                  <figcaption className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </SongSection>
      ) : null}

      {song.alternateVersions?.length ? (
        <SongSection title="Other Versions">
          <div className="grid gap-6">
            {song.alternateVersions.map((version) => (
              <article key={version.title} className="soft-panel rounded-[1.75rem] p-6 sm:p-8">
                <h3 className="font-serif text-2xl">{version.title}</h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
                  {version.description}
                </p>
                {version.embedUrl ? (
                  <div className="mt-6">
                    <MediaEmbed title={version.title} url={version.embedUrl} />
                  </div>
                ) : null}
                {version.href ? (
                  <a
                    href={version.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex button-secondary"
                  >
                    Open version
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </SongSection>
      ) : null}

      {song.reflectionText ? (
        <SongSection title="A Prayer">
          <div className="soft-panel reading-width rounded-[1.75rem] p-6 sm:p-8">
            <p className="font-serif text-2xl leading-relaxed sm:text-[2rem]">{song.reflectionText}</p>
          </div>
        </SongSection>
      ) : null}

      <section className="rounded-[1.75rem] border border-[var(--border)] bg-[rgba(255,255,255,0.42)] p-6 sm:p-8">
        <p className="section-eyebrow">Keep Following</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
          Keep up with new songs and the stories behind them
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
          If this song met you in a meaningful place, you can keep following the journey through
          the journal, the larger story, and the ongoing songs the Lord is giving us.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/journal" className="button-primary">
            Explore the journal
          </Link>
          <Link href="#follow-along" className="button-secondary">
            Follow along
          </Link>
        </div>
      </section>
    </div>
  );
}

function DateStamp({ date }: { date: string }) {
  const [month, day, year] = formatDate(date).replace(",", "").split(" ");

  return (
    <div className="date-stamp">
      <span className="date-stamp-month">{month}</span>
      <span className="date-stamp-day">{day}</span>
      <span className="date-stamp-year">{year}</span>
    </div>
  );
}
