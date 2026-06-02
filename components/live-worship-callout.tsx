import Link from "next/link";

import { liveWorshipSeries } from "@/content/live-worship";

type LiveWorshipCalloutProps = {
  variant?: "featured" | "compact";
};

export function LiveWorshipCallout({ variant = "featured" }: LiveWorshipCalloutProps) {
  if (variant === "compact") {
    return (
      <section className="soft-panel rounded-[1.75rem] p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="section-eyebrow">{liveWorshipSeries.cadence}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              {liveWorshipSeries.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
              {liveWorshipSeries.description}
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link href={liveWorshipSeries.playlistUrl} className="button-secondary">
              Watch the series on YouTube
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-24">
      <div className="soft-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="section-eyebrow">{liveWorshipSeries.cadence}</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.08]">
              {liveWorshipSeries.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-[var(--muted)] sm:text-lg">
              {liveWorshipSeries.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={liveWorshipSeries.playlistUrl} className="button-primary">
                Watch the series on YouTube
              </Link>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.45)] p-5 sm:p-6">
            <p className="section-eyebrow">Latest Session</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              {liveWorshipSeries.latestSession.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              {liveWorshipSeries.latestSession.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
