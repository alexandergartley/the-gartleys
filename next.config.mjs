const portalOrigin = process.env.PORTAL_REWRITE_ORIGIN;

/** @type {import('next').NextConfig} */
const nextConfig = {};

if (portalOrigin) {
  const target = new URL(portalOrigin);
  if (target.protocol !== 'https:' || portalOrigin !== target.origin) {
    throw new Error('PORTAL_REWRITE_ORIGIN must be an HTTPS origin without a path.');
  }

  // Keep Next's default trailing-slash behavior for all public site routes.
  // The portal owns its own slash policy, including the /visit/ landing page.
  nextConfig.skipTrailingSlashRedirect = true;
  nextConfig.redirects = async () => [
    { source: '/:path((?!visit(?:/|$)).+)/', destination: '/:path', permanent: true },
  ];
}

export default nextConfig;
