## Scope and Context

For routine, narrowly scoped changes:

- Start with this `AGENTS.md`, the target file, and direct references or
  consumers of the affected code.
- Do not search project memory, historical notes, or broad unrelated parts of
  the repository unless needed to resolve ambiguity.
- Once the relevant implementation and dependencies are understood, stop
  expanding the search unless new uncertainty appears.
- Make the smallest change that satisfies the request and avoid unrelated
  cleanup or refactoring.

## Local Verification

This repository has a known local issue where Next.js development and
production build commands may stall silently during Turbopack or webpack
startup.

- Do not automatically run `npm run dev`, `next dev`, `npm run build`, or
  `next build` for routine content, data, copy, metadata, or other low-risk
  changes using established components.
- Prefer verification appropriate to the change: targeted assertions,
  responsive lint/type checks when useful, `git diff --check`, reference
  searches, and source/diff review.
- For data-only changes using existing components, focused assertions plus
  source review are normally sufficient.
- Do not start a local server solely for browser verification when the change
  does not affect layout or component behavior.
- If a local build, server, lint, typecheck, or similar optional command stalls
  without useful progress, terminate it after a bounded wait. Do not retry the
  same verification through multiple equivalent commands unless the task
  specifically concerns that tooling.
- A local tooling stall is an environment limitation, not evidence that the
  code change failed.
- For published changes, treat the successful Vercel remote build as the
  primary compile/type/build gate.

## Git and Routine Publishing

Never commit, push, or deploy unless the user explicitly requests publishing
or Git changes.

This repository normally publishes approved website updates directly through
`main` using its configured `origin` upstream.

For a change that was completed and verified in the immediately preceding task:

- If the working diff is unchanged, do not repeat detailed semantic
  verification or source analysis.
- Confirm the intended diff, run `git diff --check`, stage only the intended
  files, and inspect the staged scope before committing.
- Do not create a PR or feature branch solely because generic Git guidance
  recommends one.
- Never force-push or rewrite history.
- Do not re-prove a successful exact-file commit with additional history or
  scope checks unless something appears inconsistent.
- Create all requested commits, push once, and confirm `HEAD` matches
  `origin/main`.
- After pushing an approved production change to `main`, deploy once using:

  `npx vercel --prod --yes`

- Do not check for an automatic Vercel deployment first; this repository
  currently requires the linked manual production deployment after push.

Re-run deeper verification only when the diff changed, previous verification
failed, or publishing exposes a new issue.

## Production Verification

Keep production verification proportional to the change and verify each
changed surface once at the most appropriate layer.

- For routine changes, verify the production apex domain only. Do not also
  check `www` or the raw Vercel deployment URL unless the task concerns
  redirects, aliases, domains, or routing.
- Use HTTP or source checks for machine-readable values such as response
  status, URLs, video IDs, asset paths, metadata, and expected ordering.
- Use browser-rendered DOM text for user-visible dates, labels, headings, and
  copy. Do not assert exact user-visible sentences against raw streamed React
  HTML when serialization may split the text.
- Use browser verification for visual layout and responsive behavior rather
  than re-checking identifiers already confirmed at the HTTP/source layer.
- Reuse one browser session when practical: verify desktop, resize for mobile,
  then navigate to other affected routes as needed.
- Do not verify unrelated unchanged routes unless the change could reasonably
  affect them or the user specifically requests it.
- If a raw-HTML text assertion fails because of serialization, switch directly
  to rendered browser verification rather than trying another serialized form.

## Working Principles

- Preserve existing architecture, design patterns, content, and behavior unless
  the task requires changing them.
- Do not make unrelated improvements simply because they are discovered during
  a focused task.
- Report unexpected issues separately instead of expanding the requested scope
  without approval.
- Prefer the shortest safe path that provides enough evidence to trust the
  change.
