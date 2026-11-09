import { timingSafeEqual } from "node:crypto";

export const dynamic = "force-dynamic";

const requestHeaders = [
  "accept", "accept-language", "content-type", "if-modified-since", "if-none-match",
  "origin", "range", "sec-fetch-site", "user-agent", "rsc", "next-router-state-tree",
  "next-router-prefetch", "next-router-segment-prefetch", "next-url",
];
const responseHeaders = [
  "accept-ranges", "cache-control", "content-disposition", "content-range",
  "content-security-policy", "content-type", "etag", "last-modified", "permissions-policy",
  "referrer-policy", "vary", "x-content-type-options", "x-frame-options", "x-robots-tag",
];
const portalCookie = /^gartley-(?:guest-session|portal-session(?:\.\d+)?)(?:-code-verifier)?=/;
const withinPortal = (path: string) => path === "/visit" || path.startsWith("/visit/");

function unavailable(status: 404 | 502) {
  return new Response(status === 404 ? "Not found" : "Guest portal temporarily unavailable", {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

function previewAllowed(request: Request) {
  if (process.env.VERCEL_ENV === "production") return true;
  const expected = Buffer.from(process.env.PORTAL_PREVIEW_KEY ?? "");
  const provided = Buffer.from(request.headers.get("x-portal-preview-key") ?? "");
  return expected.length >= 32 && expected.length === provided.length && timingSafeEqual(expected, provided);
}

async function portalProxy(request: Request) {
  const configuredOrigin = process.env.PORTAL_REWRITE_ORIGIN;
  if (!configuredOrigin || !previewAllowed(request)) return unavailable(404);

  try {
    const original = new URL(request.url);
    const upstream = new URL(configuredOrigin);
    if (upstream.protocol !== "https:" || upstream.origin !== configuredOrigin || !withinPortal(original.pathname)) {
      return unavailable(502);
    }
    upstream.pathname = original.pathname === "/visit" ? "/visit/" : original.pathname;
    upstream.search = original.search;

    // Vercel injects this deployment's identity into its Node function request.
    const identity = request.headers.get("x-vercel-oidc-token");
    if (!identity) return unavailable(502);
    const headers = new Headers({ "x-vercel-trusted-oidc-idp-token": identity });
    for (const name of requestHeaders) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }
    const cookies = (request.headers.get("cookie") ?? "").split(/;\s*/).filter(value => portalCookie.test(value));
    if (cookies.length) headers.set("cookie", cookies.join("; "));

    const options: RequestInit & { duplex?: "half" } = {
      method: request.method, headers, redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(15000),
    };
    if (request.body) Object.assign(options, { body: request.body, duplex: "half" });
    const upstreamResponse = await fetch(upstream, options);
    const out = new Headers();
    for (const name of responseHeaders) {
      const value = upstreamResponse.headers.get(name);
      if (value) out.set(name, value);
    }
    for (const cookie of upstreamResponse.headers.getSetCookie()) {
      if (portalCookie.test(cookie)) out.append("Set-Cookie", cookie);
    }

    const location = upstreamResponse.headers.get("location");
    if (location) {
      const redirect = new URL(location, upstream);
      if (redirect.origin !== upstream.origin || !withinPortal(redirect.pathname)) {
        await upstreamResponse.body?.cancel();
        return unavailable(502);
      }
      out.set("Location", redirect.pathname + redirect.search + redirect.hash);
    }

    if (!upstream.pathname.startsWith("/visit/_next/static/")) out.set("Cache-Control", "private, no-store");
    return new Response(upstreamResponse.body, { status: upstreamResponse.status, headers: out });
  } catch {
    return unavailable(502);
  }
}

export { portalProxy as GET, portalProxy as HEAD, portalProxy as POST };
