"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type CoverArtLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function CoverArtLightbox({ src, alt, caption }: CoverArtLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group block w-full cursor-pointer text-left"
        aria-label={`Open larger view of ${alt}`}
      >
        <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1200}
            className="aspect-square w-full object-cover transition duration-200 group-hover:scale-[1.02]"
          />
        </div>
      </button>

      {isOpen
        ? createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(47,42,37,0.78)] px-4 py-6 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="soft-panel rounded-[1.75rem] p-3 sm:p-4">
              <div className="overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={src}
                  alt={alt}
                  width={1800}
                  height={1800}
                  className="h-auto max-h-[78vh] w-full object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm leading-7 text-[rgba(248,244,238,0.88)]">
                  {caption ?? "Click outside or press Esc to close."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex rounded-full border border-[rgba(248,244,238,0.24)] px-3 py-1.5 text-sm text-[rgba(248,244,238,0.92)] transition hover:bg-[rgba(248,244,238,0.08)]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        ,
        document.body)
        : null}
    </>
  );
}
