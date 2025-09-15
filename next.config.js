const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ohmis.me', 'blog.ohmis.me'],
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['firebase'],
  },
  // Enable compression
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // MDX support
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Bundle analyzer for debugging
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Firebase bundle
          firebase: {
            name: 'firebase',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
            priority: 20,
          },
          // React bundle
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 20,
          },
          // Common bundle
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      }
    }
    return config
  },
}

module.exports = withMDX(nextConfig) 