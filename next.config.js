/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/pricing', destination: '/#contact', permanent: true },
      { source: '/docs', destination: '/#experience', permanent: true },
      { source: '/docs/:path*', destination: '/#experience', permanent: true },
      { source: '/ai-examples', destination: '/#learning', permanent: true },
      { source: '/ai-examples/:path*', destination: '/#learning', permanent: true },
      { source: '/auth/:path*', destination: '/#contact', permanent: true },
    ];
  },
};

module.exports = nextConfig;
