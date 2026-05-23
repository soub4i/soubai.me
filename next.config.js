/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },

  // Experimental features
  experimental: {},
};

module.exports = nextConfig;