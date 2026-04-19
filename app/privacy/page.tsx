import { PageShell } from "@/components/page-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy",
  description:
    "Privacy policy for The Gartleys website, including what data is collected through forms and how it is used.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <PageShell className="py-12 sm:py-20">
      <article className="mx-auto max-w-4xl">
        <section className="soft-panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
          <div className="border-b border-[var(--border)] pb-6">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mt-4 font-serif text-5xl leading-none sm:text-7xl">Privacy Policy</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              Last updated: April 16, 2026
            </p>
          </div>

          <div className="prose-gartley mt-8">
            <p>
              The Gartleys respects your privacy. This page explains what information we collect on
              this site and how we use it.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect information you choose to submit through forms, including:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Message details you provide for inquiries</li>
            </ul>

            <h2>How We Use Information</h2>
            <p>We use submitted information to:</p>
            <ul>
              <li>Respond to your messages and booking inquiries</li>
              <li>Send follow-along updates if you opt in</li>
              <li>Improve the content and experience of the site</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. We only share data with service providers
              that help us operate the website and forms.
            </p>

            <h2>Cookies and Analytics</h2>
            <p>
              This site may use basic analytics or platform logs to understand traffic and improve
              performance. These tools may use cookies or similar technologies.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can request to update or delete your submitted information by contacting us
              directly.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy-related questions, please use the contact or booking form and include
              “Privacy Request” in your message.
            </p>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
