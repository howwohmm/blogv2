'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'

export default function Nav() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className="fixed top-0 left-1/2 w-full max-w-[1728px] -translate-x-1/2 z-10">
      <div className="flex justify-between items-center p-3 gap-3">
        <div className="flex gap-2">
          <a 
            href="https://ohmis.me"
            className="flex items-center justify-center px-2 py-1 rounded bg-nav-button text-button-text backdrop-blur"
          >
            Home
          </a>
          <Link 
            href="/blog"
            className="flex items-center justify-center px-2 py-1 rounded bg-nav-button text-button-text backdrop-blur"
          >
            Blog
          </Link>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center px-2 py-1 rounded bg-nav-button text-button-text backdrop-blur"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  )
} 