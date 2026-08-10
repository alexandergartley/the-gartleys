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
