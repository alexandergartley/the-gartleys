"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export function ShowsInquiryForm() {
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
      const response = await fetch("/api/shows", {
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
      setMessage(payload.message ?? "Thanks for reaching out. We'll get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="soft-panel rounded-[2rem] p-6 sm:p-9" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Name</span>
          <input className="field" name="name" autoComplete="name" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Email</span>
          <input className="field" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--muted)]">
            Church / Organization (optional)
          </span>
          <input className="field" name="organizationOrChurch" autoComplete="organization" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--muted)]">
            Event Date (if known)
          </span>
          <input className="field" name="eventDate" type="date" />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-[var(--muted)]">Message</span>
        <textarea className="field min-h-40 resize-y" name="message" required />
      </label>
      <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
        We&apos;ll respond personally and can talk through details, availability, and what would
        best serve your gathering.
      </p>
      {fallbackEmail ? (
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          If the form is unavailable, email{" "}
          <a
            href={`mailto:${fallbackEmail}`}
            className="underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)]"
          >
            {fallbackEmail}
          </a>
          .
        </p>
      ) : null}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button className="button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Inquiry"}
        </button>
        {message ? (
          <p
            className={`text-sm ${
              status === "error" ? "text-[#8b4d46]" : status === "success" ? "text-[var(--foreground)]" : "text-[var(--muted)]"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
