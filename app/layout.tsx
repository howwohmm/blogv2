import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ohmlogs',
  description: 'A modern blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <KeyboardShortcuts />
        <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#e6ebf1] flex items-center px-4 z-50">
          <div className="flex items-center gap-8">
            <Link href="/blog" className="text-[#1a1f36] font-mono text-[14px]">
              [B] BACK
            </Link>
            <a href="https://instagram.com/yourusername" target="_blank" className="text-[#697386] hover:text-[#1a1f36] font-mono text-[14px]">
              [I] INSTAGRAM
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" className="text-[#697386] hover:text-[#1a1f36] font-mono text-[14px]">
              [L] LINKEDIN
            </a>
            <a href="https://yourmusic.com" target="_blank" className="text-[#697386] hover:text-[#1a1f36] font-mono text-[14px]">
              [M] MUSIC
            </a>
          </div>
        </header>
        <main className="mt-14">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
} 