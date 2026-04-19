import type { ReactNode } from "react";

type ScriptureBlockProps = {
  reference: string;
  children: ReactNode;
};

export function ScriptureBlock({ reference, children }: ScriptureBlockProps) {
  return (
    <aside className="soft-panel my-8 rounded-[1.75rem] p-6">
      <p className="section-eyebrow">{reference}</p>
      <div className="mt-3 font-serif text-2xl leading-relaxed text-[var(--foreground)]">{children}</div>
    </aside>
  );
}

