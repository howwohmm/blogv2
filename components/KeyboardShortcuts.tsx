'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        router.push('/blog')
      } else if (e.key.toLowerCase() === 'i') {
        window.open('https://instagram.com/yourusername', '_blank')
      } else if (e.key.toLowerCase() === 'l') {
        window.open('https://linkedin.com/in/yourusername', '_blank')
      } else if (e.key.toLowerCase() === 'm') {
        window.open('https://yourmusic.com', '_blank')
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [router])

  return null
} 