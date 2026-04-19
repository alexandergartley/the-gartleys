# The Gartleys

A calm, editorial Next.js site for a family-based acoustic worship music project.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local typed song data in `content/songs.ts`
- MDX journal entries in `content/journal/`

## Local Development

1. Install Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Verify production build:

```bash
npm run build
npm run lint
```

## Launch Environment Variables

- `CONVERTKIT_FORM_ACTION`
  Required in production. Provider form action URL for the Follow Along form.
- `RESEND_API_KEY`
  Required in production. API key used to send Shows / Booking inquiries.
- `BOOKING_FROM_EMAIL`
  Required in production. Must be a verified sender in your existing Resend account.
- `BOOKING_TO_EMAIL`
  Recommended in production. Inbox that receives booking inquiries. Falls back to `NEXT_PUBLIC_CONTACT_EMAIL` if unset.
- `NEXT_PUBLIC_CONTACT_EMAIL`
  Required for launch-safe form fallback states. Used for visible mailto links if a form cannot submit.
- `GOOGLE_SITE_VERIFICATION`
  Optional. Google Search Console verification token.

## v1.0 Launch Checklist

- Remove dead routes and confirm no stale references remain.
- Set all required production environment variables in Vercel.
- Confirm meta titles/descriptions on the main public pages.
- Submit `/sitemap.xml` to Google Search Console.
- Verify indexing and analytics after the first production deployment.
