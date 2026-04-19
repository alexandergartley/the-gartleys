import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { ShowsInquiryForm } from "@/components/shows-inquiry-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Shows",
  description:
    "Booking page for worship leading and event inquiries for The Gartleys.",
  path: "/shows"
});

export default function ShowsPage() {
  return (
    <PageShell className="py-12 sm:py-20">
      <SectionHeading
        eyebrow="Shows / Booking"
        title="Worship. Story. Presence."
      />
      <div className="mt-10 max-w-4xl">
        <div className="mb-8 max-w-3xl space-y-5">
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
        <ShowsInquiryForm />
      </div>
    </PageShell>
  );
}
