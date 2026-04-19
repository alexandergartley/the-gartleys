import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { familyMembers } from "@/content/family";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Family",
  description:
    "Meet the Gartley family and explore the scrapbook moments, drawings, voice notes, and stories behind the songs.",
  path: "/family",
  image: "/family-photo.jpg"
});

export default function FamilyPage() {
  return (
    <PageShell className="py-12 sm:py-20">
      <section className="soft-panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
        <div>
          <p className="section-eyebrow">Family</p>
          <div className="mt-5 border-t border-[var(--border)] pt-6">
            <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-7xl">Family</h1>
          </div>
          <div className="mt-8 grid gap-4 sm:max-w-2xl sm:grid-cols-[6rem_minmax(0,1fr)]">
            <p className="text-sm tracking-[0.12em] text-[var(--muted)] sm:pt-1">Home</p>
            <div className="space-y-3">
              <p className="text-xl leading-8 text-[var(--foreground)] sm:text-2xl">
                A scrapbook of the life behind the songs.
              </p>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                This project grows out of home life.
              </p>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                What you&apos;ll find here are the small pieces: voice memos, drawings, lyric
                fragments, the moments that mattered before they were ever finished.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 space-y-8">
        <section className="soft-panel rounded-[2rem] px-6 py-7 sm:px-10 sm:py-9">
          <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="section-eyebrow">Family Context</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Mom &amp; Dad</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start">
              <div className="max-w-3xl space-y-4">
                <p className="text-base leading-8 text-[var(--muted)]">
                  The songs often start with us: late-night voice memos, kitchen table lyrics, or
                  something we&apos;re trying to pray through.
                </p>
                <p className="text-base leading-8 text-[var(--muted)]">
                  Then they grow as the whole family becomes part of them.
                </p>
              </div>
              <figure className="soft-panel scrap-photo w-full rotate-[-2deg] overflow-hidden rounded-[1.5rem] p-2 shadow-[0_16px_30px_rgba(47,42,37,0.08)]">
                <div className="overflow-hidden rounded-[1.1rem]">
                  <Image
                    src="/family-photo.jpg"
                    alt="The Gartleys family together at home, reflecting the life behind their songs"
                    width={900}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        {familyMembers.map((member) => (
          <section key={member.name} className="soft-panel rounded-[2rem] px-6 py-7 sm:px-10 sm:py-9">
            <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
              <div>
                <p className="section-eyebrow">Family Member</p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">{member.name}</h2>
              </div>

              <div>
                <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{member.intro}</p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {member.features.map((feature, index) => (
                    <article
                      key={feature.title}
                      className={`rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.35)] p-5 ${
                        feature.audio && !feature.image ? "md:translate-y-4" : index % 2 === 1 ? "md:translate-y-8" : ""
                      }`}
                    >
                      {feature.image ? (
                        <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]">
                          <Image
                            src={feature.image.src}
                            alt={feature.image.alt}
                            width={1200}
                            height={900}
                            className="w-full"
                          />
                        </div>
                      ) : null}

                      {feature.audio ? (
                        <div className="rounded-[1.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.55)] p-4">
                          <div
                            aria-hidden="true"
                            className="mb-4 flex h-10 items-end gap-1 overflow-hidden rounded-[0.9rem] border border-[var(--border)] bg-[rgba(255,255,255,0.52)] px-3 py-2"
                          >
                            {[12, 24, 16, 28, 20, 14, 26, 18, 30, 15, 22, 19].map((height, waveIndex) => (
                              <span
                                key={`${feature.title}-wave-${waveIndex}`}
                                className="w-2 rounded-full bg-[rgba(113,113,95,0.28)]"
                                style={{ height: `${height}px` }}
                              />
                            ))}
                          </div>
                          <audio className="w-full" controls preload="metadata">
                            <source src={feature.audio.src} type={feature.audio.type ?? "audio/mp4"} />
                            Your browser does not support the audio player.
                          </audio>
                        </div>
                      ) : null}

                      <h3 className="mt-4 font-serif text-2xl">{feature.title}</h3>
                      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{feature.description}</p>
                      {feature.image?.caption ? (
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{feature.image.caption}</p>
                      ) : null}
                      {feature.audio?.caption ? (
                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{feature.audio.caption}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
