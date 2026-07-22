import Link from "next/link";

import { liveWorshipSeries } from "@/content/live-worship";
import { MediaEmbed } from "@/components/media-embed";

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
        <div>
          <MediaEmbed
            title={liveWorshipSeries.latestSession.title}
            url={liveWorshipSeries.latestSession.embedUrl}
          />
          <p className="section-eyebrow mt-3">Latest Session</p>
        </div>
      </div>
    </section>
  );
}
