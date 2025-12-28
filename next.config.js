/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },

  // Experimental features for better terminal theme support
  experimental: {
    optimizePackageImports: ['@fortawesome/react-fontawesome'],
  },
};

module.exports = nextConfig;