/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/themes",
        destination: "/music",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
