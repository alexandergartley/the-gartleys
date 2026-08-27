import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { ShowsInquiryForm } from "@/components/shows-inquiry-form";
import { pastShows } from "@/content/shows";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Shows",
  description:
    "See upcoming shows and learn how to invite The Gartleys to lead worship at churches, gatherings, and special events.",
  path: "/shows"
});

export default function ShowsPage() {
  return (
    <PageShell className="py-12 sm:py-20">
      <SectionHeading
        eyebrow="Shows / Booking"
        title="Live Shows and Worship with The Gartleys"
        headingLevel="h1"
      />
      <div className="mt-10 max-w-4xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <figure className="soft-panel scrap-photo order-first mx-auto w-full max-w-sm rotate-[-2deg] overflow-hidden rounded-[1.75rem] p-3 shadow-[0_16px_30px_rgba(47,42,37,0.08)] lg:order-last lg:mx-0 lg:justify-self-end lg:rotate-[2deg]">
            <div className="aspect-square overflow-hidden rounded-[1.35rem]">
              <Image
                src="/shows/story-song-agape-cafe-square.jpeg"
                alt="The Gartleys leading music during Story + Song at Agape Café"
                width={1620}
                height={1620}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </figure>
          <div className="max-w-3xl space-y-5">
            <p className="text-[1.05rem] leading-8 text-[var(--muted)] sm:text-lg">
              We lead simple, acoustic worship and share songs from real life with Jesus.
            </p>
            <p className="text-[1.05rem] leading-8 text-[var(--muted)] sm:text-lg">
              Our heart is to create space for people to encounter Him through worship, testimony,
              and an honest, unhurried atmosphere.
            </p>
            <p className="text-[1.05rem] leading-8 text-[var(--muted)] sm:text-lg">
              We&apos;ve served in churches, small gatherings, and ministry spaces, from living rooms
              to larger rooms, and we&apos;re always asking what would serve the room best.
            </p>
          </div>
        </div>
        <section aria-labelledby="upcoming-events-heading" className="mb-10">
          <p className="section-eyebrow">Upcoming Events</p>
          <h2 id="upcoming-events-heading" className="sr-only">
            Upcoming Events
          </h2>
          <div className="mt-4 rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.34)] p-5 sm:p-6">
            <p className="text-[1.02rem] leading-7 text-[var(--muted)]">
              No upcoming events at this time.
            </p>
          </div>
        </section>
        <section aria-labelledby="past-events-heading" className="mb-10">
          <p className="section-eyebrow">Past Events</p>
          <h2 id="past-events-heading" className="sr-only">
            Past Events
          </h2>
          <div className="mt-4 grid gap-5">
            {pastShows.map((show) => (
              <article key={`${show.date}-${show.title}`} className="soft-panel rounded-[2rem] p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.12]">
                      {show.title}
                    </h3>
                    <p className="mt-3 text-base font-medium leading-7 text-[var(--foreground)] sm:text-lg">
                      <time dateTime={show.date}>{show.displayDate}</time> &bull; {show.time}
                    </p>
                    <div className="mt-5 space-y-1 text-[1.02rem] leading-7 text-[var(--muted)]">
                      <p className="font-medium text-[var(--foreground)]">{show.venue}</p>
                      <p>{show.address}</p>
                    </div>
                    <p className="mt-5 max-w-[64ch] text-[1.05rem] leading-8 text-[var(--muted)]">
                      {show.description}
                    </p>
                    <p className="mt-4 font-medium text-[var(--foreground)]">{show.cost}.</p>
                  </div>
                  <div className="flex shrink-0 sm:pt-1">
                    <a
                      className="button-secondary"
                      href={show.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch Story + Song
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <ShowsInquiryForm />
      </div>
    </PageShell>
  );
}
