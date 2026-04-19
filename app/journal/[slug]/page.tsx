import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getJournalEntries, getJournalEntry } from "@/lib/journal";
import { buildPageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type JournalEntryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const entries = await getJournalEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: JournalEntryPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const entry = await getJournalEntry(slug);
    return buildPageMetadata({
      title: entry.frontmatter.title,
      description: entry.frontmatter.excerpt,
      path: `/journal/${slug}`
    });
  } catch {
    return {};
  }
}

export const dynamicParams = false;

export default async function JournalEntryPage({ params }: JournalEntryPageProps) {
  const { slug } = await params;
  let entry;

  try {
    entry = await getJournalEntry(slug);
  } catch {
    notFound();
  }

  return (
    <PageShell className="py-12 sm:py-20">
      <article className="mx-auto max-w-5xl">
        <section className="soft-panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid gap-6 border-b border-[var(--border)] pb-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
            <div className="text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
              <p>Journal</p>
              <p className="mt-4 text-base tracking-[0.08em] normal-case text-[var(--foreground)]">
                {formatDate(entry.frontmatter.date)}
              </p>
            </div>
            <div>
              <h1 className="max-w-4xl font-serif text-5xl leading-none sm:text-7xl">
                {entry.frontmatter.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                {entry.frontmatter.excerpt}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_12rem]">
            <div className="prose-gartley journal-prose">{entry.content}</div>
            <aside className="hidden lg:block">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[rgba(255,255,255,0.42)] p-5">
                <p className="section-eyebrow">Entry</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  A dated note from the ongoing work of songs, family life, and learning to follow
                  Jesus in ordinary days.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
