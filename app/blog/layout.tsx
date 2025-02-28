import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Your Name',
  description: 'Thoughts, stories and ideas.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 