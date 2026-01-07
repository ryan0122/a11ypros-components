/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@design-system/core'],
  // Enable static export for Netlify
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config
  },
}

module.exports = nextConfig

