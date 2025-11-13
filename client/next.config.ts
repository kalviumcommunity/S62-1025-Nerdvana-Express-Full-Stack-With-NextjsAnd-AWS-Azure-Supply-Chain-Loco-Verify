import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['prisma', 'bcrypt'], // Add bcrypt here too
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
  },
  // TypeScript specific settings
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false, // Keep this as false to catch type errors
  },
  // Add if you need to transpile packages
  transpilePackages: ['some-package'],
}

export default nextConfig