'use client'

import { useState } from 'react'

const TOPICS = [
  'Next.js',
  'React',
  'TypeScript',
  'Web Development',
  'Design',
  'Performance',
  'Future Tech'
]

export default function BlogSidebar() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  return (
    <aside className="space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-4">Topics</h2>
        <div className="space-y-2">
          {TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`
                block w-full text-left px-3 py-2 rounded-lg transition-colors
                ${selectedTopics.includes(topic) 
                  ? 'bg-highlight text-highlight-foreground' 
                  : 'hover:bg-muted'
                }
              `}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
} 