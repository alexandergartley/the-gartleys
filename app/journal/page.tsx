import { JournalCard } from "@/components/journal-card";
import { PageShell } from "@/components/page-shell";
import { getJournalEntries } from "@/lib/journal";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Journal",
  description:
    "Journal entries from The Gartleys on songs, family life, and following Jesus in ordinary days.",
  path: "/journal",
  image: "/family-photo.jpg"
});

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <PageShell className="py-12 sm:py-20">
      <section className="soft-panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
        <div>
          <p className="section-eyebrow">Journal</p>
          <div className="mt-5 border-t border-[var(--border)] pt-6">
            <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-7xl lg:text-[7.5rem]">
              Journal
            </h1>
          </div>
          <div className="mt-8 grid gap-4 sm:max-w-2xl sm:grid-cols-[5.5rem_minmax(0,1fr)]">
            <p className="text-sm tracking-[0.12em] text-[var(--muted)] sm:pt-1">Seasons</p>
            <div className="space-y-3">
              <p className="text-xl leading-8 text-[var(--foreground)] sm:text-2xl">
                Behind the songs, inside the season.
              </p>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                Our songs are the journal. These entries are the behind-the-scenes notes from the
                seasons they came from: prayer, wrestling, processing, and declarations we were
                learning to sing in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 soft-panel rounded-[2rem] px-6 py-6 sm:px-10 sm:py-8">
        <div className="border-b border-[var(--border)] pb-4">
          <p className="section-eyebrow">Recent Entries</p>
        </div>
        <div className="mt-2">
          {entries.map((entry, index) => (
            <JournalCard key={entry.slug} entry={entry} isFirst={index === 0} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
