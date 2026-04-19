import Link from "next/link";

type ThemeChipProps = {
  slug: string;
  label: string;
};

export function ThemeChip({ slug, label }: ThemeChipProps) {
  return (
    <Link
      href={`/themes/${slug}`}
      className="inline-flex items-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.72)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[rgba(77,67,55,0.3)] hover:text-[var(--foreground)]"
    >
      #{label.replace(/\s+/g, "").toLowerCase()}
    </Link>
  );
}
