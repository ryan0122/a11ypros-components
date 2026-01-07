/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@design-system/core'],
  // Enable static export for Netlify
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Increase static page generation timeout (default is 60s)
  staticPageGenerationTimeout: 120,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config
  },
}

module.exports = nextConfig

