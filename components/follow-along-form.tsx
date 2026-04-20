"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { followAlongCopy } from "@/content/site";

type FollowAlongFormProps = {
  compact?: boolean;
  variant?: "default" | "homepage" | "song";
};

export function FollowAlongForm({ compact = false, variant = "default" }: FollowAlongFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const fallbackEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/follow-along", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(payload.message ?? "Thanks for following along.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isSongVariant = variant === "song";
  const isHomepageVariant = variant === "homepage";
  const sectionClasses = compact
    ? "rounded-[1.8rem] p-5 sm:p-6"
    : isHomepageVariant
      ? "rounded-[2rem] p-6 sm:p-8"
      : "rounded-[2rem] p-6 sm:p-9";
  const contentWidthClasses = compact ? "max-w-[34rem]" : isHomepageVariant ? "max-w-[38rem]" : "max-w-2xl";
  const headingClasses = compact
    ? "mt-2 font-serif text-[2rem] leading-[1.02] sm:text-[2.35rem]"
    : "mt-3 font-serif text-3xl leading-tight sm:text-4xl";
  const bodyClasses = compact
    ? "mt-3 text-[0.98rem] leading-6 text-[var(--muted)]"
    : "mt-4 text-base leading-8 text-[var(--muted)] sm:text-[1.05rem]";
  const formClasses = compact
    ? "mt-6 grid gap-4 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)_auto] md:gap-3"
    : isHomepageVariant
      ? "mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] md:items-end md:gap-4"
      : "mt-8 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto] md:gap-4";
  const labelTextClasses = compact
    ? "mb-1.5 block text-[0.8rem] font-medium text-[var(--muted)]"
    : "mb-2 block text-sm font-medium text-[var(--muted)]";

  return (
    <section
      className={`${sectionClasses} ${
        isSongVariant
          ? "border border-[rgba(77,67,55,0.18)] bg-[rgba(236,227,215,0.72)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]"
          : isHomepageVariant
            ? "border border-[rgba(77,67,55,0.12)] bg-[rgba(236,227,215,0.58)] shadow-[0_12px_24px_rgba(47,42,37,0.04),inset_0_0_0_1px_rgba(255,255,255,0.15)]"
          : "soft-panel"
      }`}
    >
      <div className={contentWidthClasses}>
        {isSongVariant ? <p className="section-eyebrow">Keep Listening</p> : null}
        {isHomepageVariant ? (
          <>
            <p className="section-eyebrow">Follow the Journey</p>
            <h2 className={headingClasses}>Be the first to hear new songs and the stories behind them.</h2>
            <p className={bodyClasses}>Shared as they&apos;re written, from our home and worship life.</p>
            <p className="mt-1.5 text-sm leading-7 text-[var(--muted)]">
              No noise. Just meaningful updates as they come.
            </p>
          </>
        ) : (
          <>
            <h2 className={headingClasses}>{followAlongCopy.title}</h2>
            <p className={bodyClasses}>{followAlongCopy.body}</p>
          </>
        )}
        <p className={`${isHomepageVariant ? "mt-2" : "mt-3"} text-sm leading-7 text-[var(--muted)]`}>
          After you sign up, Kit may send a confirmation email before you&apos;re fully subscribed.
        </p>
      </div>
      <form className={formClasses} onSubmit={handleSubmit}>
        <label className="block">
          <span className={labelTextClasses}>First name</span>
          <input className="field" type="text" name="firstName" autoComplete="given-name" />
        </label>
        <label className="block">
          <span className={labelTextClasses}>Email</span>
          <input
            className="field"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Email address"
          />
        </label>
        <div className="flex items-end">
          <button className="button-primary w-full md:w-auto" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Join"}
          </button>
        </div>
      </form>
      {fallbackEmail ? (
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          If signup is unavailable, email{" "}
          <a
            href={`mailto:${fallbackEmail}`}
            className="underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)]"
          >
            {fallbackEmail}
          </a>
          .
        </p>
      ) : null}
      {message ? (
        <p
          className={`mt-4 text-sm ${
            status === "error" ? "text-[#8b4d46]" : status === "success" ? "text-[var(--foreground)]" : "text-[var(--muted)]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
