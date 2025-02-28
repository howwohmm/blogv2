'use client'

import React from 'react'
import Nav from './Nav'
import ThemeProvider from './ThemeProvider'

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="mx-auto max-w-[1728px] px-3 pt-24">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
} 