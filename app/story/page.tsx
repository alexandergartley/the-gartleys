import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Story",
  description:
    "Read the story behind The Gartleys: a family, a calling, and songs shaped by seasons of obedience, ministry, and prayer.",
  path: "/story",
  image: "/story-photo.jpeg"
});

export default function StoryPage() {
  return (
    <PageShell className="pb-12 pt-0 sm:pb-20">
      <section className="relative left-1/2 right-1/2 mb-16 h-[24rem] w-screen -translate-x-1/2 overflow-hidden sm:mb-20 sm:h-[30rem] lg:h-[34rem]">
        <Image
          src="/story-photo.jpeg"
          alt="The Gartleys family outdoors, representing their story of faith, calling, and music ministry"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,244,238,0.12),rgba(248,244,238,0.06)_32%,rgba(248,244,238,0.2)_54%,rgba(248,244,238,0.58)_76%,rgba(248,244,238,0.9)_92%,#f8f4ee_100%)]" />
      </section>

      <div className="pt-0 sm:pt-0">
      <SectionHeading
        eyebrow="Story"
        title="We&apos;re the Gartleys, writing songs as we follow Jesus in real time."
        description="One day, one season, one song at a time."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,44rem)_minmax(0,18rem)] lg:items-start">
        <article className="prose-gartley">
          <h2>Who We Are</h2>
          <p>
            Our songs are how we walk with the Lord in real time.
          </p>
          <p>
            We don&apos;t write from a distance. We write in the middle of it.
          </p>
          <p>
            In prayer, in wrestling, in faith.
          </p>
          <p>
            Music isn&apos;t separate from our life. It&apos;s woven into home, waiting, obedience,
            ministry, and ordinary family days.
          </p>
          <p>
            Through seasons of calling, transition, and quiet rebuilding, the songs have stayed
            with us and helped carry us.
          </p>
          <h2>Why We Make Music</h2>
          <p>
            Most of our songs don&apos;t start with a concept. They start with a season.
          </p>
          <p>
            Sometimes that sounds like prayer when words are hard to find.
          </p>
          <p>
            Sometimes it&apos;s wrestling through fear, change, or disappointment.
          </p>
          <p>
            Sometimes it becomes a declaration we need to keep singing until we believe it again.
          </p>
          <p>
            Over time, those moments become songs, and those songs become a kind of journal.
          </p>
          <p>
            They hold what God is doing in us while we&apos;re still in process.
          </p>
          <p>
            We don&apos;t separate life and music. They belong together.
          </p>
          <p>
            Everything we write flows from our relationship with Jesus, what He&apos;s teaching us,
            correcting in us, and inviting us into.
          </p>
          <p>These songs aren&apos;t written after the fact.</p>
          <p>
            They&apos;re written because we need to remember what&apos;s true while we&apos;re still in it.
          </p>
          <h2>Our Family</h2>
          <p>
            This isn&apos;t just a project. It&apos;s something we&apos;re living as a family.
          </p>
          <p>
            Our kids are growing up around music and beginning to write and share in their own way.
            Some of what you&apos;ll find here carries their voice too.
          </p>
          <p>
            This isn&apos;t just a catalog of songs. It&apos;s a record of what God has been doing among us,
            in the small moments, the unfinished moments, and the songs that came from inside them.
          </p>
          <p>It&apos;s simple, sometimes messy, and always in process. But it&apos;s real.</p>
          <h2>An Invitation</h2>
          <p>If you&apos;ve found your way here, you&apos;re welcome to stay.</p>
          <p>
            Whether you&apos;re listening, reading, or just exploring, our hope is that this space feels
            honest and unhurried.
          </p>
          <p>
            If the Lord meets you here, we hope these songs help you see that He is faithful in real
            time, not only in hindsight.
          </p>
        </article>
        <aside className="space-y-5 lg:pt-6">
          <div className="px-1">
            <p className="section-eyebrow">Scriptures that have anchored us</p>
          </div>
          <blockquote className="soft-panel rounded-[1.75rem] p-6">
            <p className="section-eyebrow">Psalm 34:18</p>
            <p className="mt-3 font-serif text-2xl leading-relaxed">
              The Lord is close to the brokenhearted and saves those who are crushed in spirit.
            </p>
          </blockquote>
          <blockquote className="soft-panel rounded-[1.75rem] p-6">
            <p className="section-eyebrow">John 15:5</p>
            <p className="mt-3 font-serif text-2xl leading-relaxed">
              Apart from me you can do nothing.
            </p>
          </blockquote>
        </aside>
      </div>
      </div>
    </PageShell>
  );
}
