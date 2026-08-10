## Verification and Local Next.js Servers

This repository has a known local issue where Next.js dev and production
build commands may stall silently during Turbopack or webpack startup.

To avoid wasting time and compute:

- Do not run `npm run dev`, `next dev`, `npm run build`, or `next build`
  automatically for routine content, data, copy, metadata, or other
  low-risk changes that do not alter application architecture.
- Prefer focused verification appropriate to the files changed:
  targeted assertions, type checks when useful, linting when responsive,
  `git diff --check`, and manual source/diff review.
- For data-only changes using existing components, focused data assertions
  plus source review are normally sufficient.
- Do not start a local server solely to perform browser verification for
  a change that does not affect layout or component behavior.
- If a local Next.js server or build is genuinely necessary, make one
  attempt with the normal project configuration.
- If the command becomes silent/stalled during startup, terminate it after
  a reasonable bounded wait rather than continuing indefinitely.
- Do not then retry the same verification with both Turbopack and webpack
  unless the task specifically concerns bundling or build behavior.
- If both bundlers have already demonstrated the same startup stall,
  stop retrying and report the verification limitation.
- Never treat a known local tooling stall as evidence that the code change
  itself failed.

## Reusing Previous Verification

When committing or publishing a change that was completed and verified in the
immediately preceding task:

- Do not repeat detailed semantic assertions, tests, or source analysis unless
  the working diff has changed since that verification.
- Confirm the diff still matches the previously verified change, run
  `git diff --check`, and proceed with the requested Git/deployment workflow.
- Re-run deeper verification only if the change was modified, verification
  previously failed, or publishing exposes a new issue.

## Git and Deployment Workflow

This repository normally publishes routine approved website updates directly
through `main`.

- Use the existing `main` branch and its configured `origin` upstream for
  routine approved content/data changes unless the user requests otherwise.
- Do not create a PR or feature branch solely because a generic Git skill
  recommends one.
- Never force-push or rewrite history.
- Stage only the intended files and inspect the staged diff before committing.
- After pushing an approved production change to `main`, deploy it with the
  repository's established linked Vercel workflow: `npx vercel --prod --yes`.
- Do not spend time checking for an automatic Git-triggered Vercel deployment;
  this repository currently requires the manual production deployment after
  push.
- Treat the Vercel remote production build as the primary build verification
  for published changes. Do not duplicate it with the known-stalling local
  Next.js build unless specifically debugging local build behavior.

## Production Verification

When verifying deployed content:

- Prefer stable semantic identifiers and content over exact serialized HTML
  formatting.
- Verify durable values such as route status, video IDs, titles, labels, image
  paths, and expected ordering.
- Avoid brittle assertions against exact rendered date strings, whitespace,
  HTML structure, or formatting when the underlying data can be verified more
  reliably.
- For routine content changes, verifying the production apex domain is normally
  sufficient.
- Do not also verify the `www` domain and raw Vercel deployment URL unless the
  task concerns redirects, aliases, domains, or deployment routing.

## Shell Command Safety

When running inline Node.js assertions from the shell:

- Avoid JavaScript template literals inside double-quoted `node -e` commands,
  because the shell may interpret `${...}` before Node receives it.
- Prefer simple string concatenation, properly single-quoted scripts, or a
  quoted heredoc for nontrivial assertions.
