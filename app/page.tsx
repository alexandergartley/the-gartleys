import Image from "next/image";
import Link from "next/link";

import { JournalCard } from "@/components/journal-card";
import { MediaEmbed } from "@/components/media-embed";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { brandVoiceBlock } from "@/content/site";
import { getJournalEntries } from "@/lib/journal";
import { getFeaturedSongs, songs } from "@/content/songs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Home",
  description:
    "Start with a featured song, your story, and journal reflections from The Gartleys' walk with the Lord.",
  path: "/"
});

export default async function HomePage() {
  const journalEntries = await getJournalEntries();
  const featuredSong = getFeaturedSongs()[0] ?? songs[0];

  return (
    <PageShell className="pb-12 pt-0 sm:pb-20">
      <section className="relative left-1/2 right-1/2 h-[31rem] w-screen -translate-x-1/2 overflow-hidden sm:h-[38rem] lg:h-[42rem]">
        <Image
          src="/header-photo-hero.png"
          alt="A wide city and sky landscape fading into the page background"
          fill
          priority
          className="scale-[1.03] object-cover object-center blur-[1px] saturate-[0.78] brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,244,238,0.14),rgba(248,244,238,0.1)_20%,rgba(248,244,238,0.16)_44%,rgba(248,244,238,0.46)_68%,rgba(248,244,238,0.78)_84%,rgba(248,244,238,0.96)_94%,#f8f4ee_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_42%)]" />
        <div className="absolute inset-0 bg-[rgba(47,42,37,0.12)]" />
        <div className="absolute inset-x-0 bottom-[-1px] h-24 bg-[linear-gradient(to_bottom,rgba(248,244,238,0),#f8f4ee_88%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="page-container">
            <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[rgba(248,244,238,0.96)] [text-shadow:0_1px_10px_rgba(47,42,37,0.12)]">
                The Gartleys
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-none text-[rgba(248,244,238,0.98)] [text-shadow:0_4px_24px_rgba(47,42,37,0.16)] sm:text-7xl lg:text-[5.5rem]">
                Songs of healing and freedom
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[rgba(248,244,238,0.92)] [text-shadow:0_2px_16px_rgba(47,42,37,0.12)] sm:mx-auto sm:text-xl">
                Songs, prayers, and stories from our journey with the Lord as a family.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/music"
                  className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border border-white bg-white px-6 py-3 text-[#4b4137] transition hover:bg-[rgba(255,255,255,0.92)]"
                >
                  Listen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 pt-10 sm:-mt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Featured Song"
          title={featuredSong.title}
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <MediaEmbed title={featuredSong.title} url={featuredSong.mediaEmbedUrl} />
          <div className="soft-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--muted)]">
              Released March 19, 2026
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              A song of gratitude and freedom, responding to the grace of God poured out through
              the cross and the new life we have in Jesus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/songs/${featuredSong.slug}`} className="button-primary">
                Visit the full song page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Who We Are"
          title={brandVoiceBlock.title}
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="reading-width prose-gartley">
            <p>{brandVoiceBlock.body[0]}</p>
            <p>
              {brandVoiceBlock.body[1]}
              <br />
              {brandVoiceBlock.body[2]}
            </p>
            <p>
              If you&apos;re new here, start with a song, then follow the story it came from.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/story" className="button-primary">
                Read our story
              </Link>
              <Link href="/journal" className="button-secondary">
                Explore the journal
              </Link>
            </div>
          </div>
          <figure className="soft-panel scrap-photo max-w-sm rounded-[1.75rem] p-3 lg:-translate-y-20 lg:justify-self-end lg:rotate-[2deg]">
            <div className="overflow-hidden rounded-[1.35rem]">
              <Image
                src="/family-photo.jpg"
                alt="The Gartleys family together outdoors, representing their family music ministry and faith journey"
                width={900}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Journal"
          title="Recent entries"
          description="Moments behind the songs - what God was doing in us in each season."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {journalEntries.slice(0, 3).map((entry) => (
            <JournalCard key={entry.slug} entry={entry} variant="homepage" />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
