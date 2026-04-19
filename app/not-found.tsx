import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell className="py-24 text-center">
      <p className="section-eyebrow">Not Found</p>
      <h1 className="mt-4 font-serif text-5xl">This page isn&apos;t here.</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
        The page may have moved, or the link may be incomplete.
      </p>
      <div className="mt-8">
        <Link href="/" className="button-primary">
          Return home
        </Link>
      </div>
    </PageShell>
  );
}
