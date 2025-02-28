/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['ohmis.me', 'blog.ohmis.me'],
  },
}

module.exports = nextConfig 