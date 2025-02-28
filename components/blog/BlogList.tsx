'use client'

import React from 'react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  date: string
  summary: string
  authors: string[]
  topics: string[]
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Building a modern blog with Next.js',
    date: '2024-02-28',
    summary: 'A deep dive into creating a performant and beautiful blog using Next.js and modern web technologies.',
    authors: ['John Doe'],
    topics: ['Next.js', 'React', 'Web Development']
  },
  {
    id: '2',
    title: 'The future of web development',
    date: '2024-02-27',
    summary: 'Exploring upcoming trends and technologies that will shape the future of web development.',
    authors: ['Jane Smith'],
    topics: ['Web Development', 'Future Tech']
  }
]

export default function BlogList() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-12 gap-4 border-b border-border pb-2">
        <div className="col-span-2">Date</div>
        <div className="col-span-8">Title</div>
        <div className="col-span-2">Topics</div>
      </div>
      
      {SAMPLE_POSTS.map((post) => (
        <Link 
          key={post.id}
          href={`/blog/${post.id}`}
          className="grid grid-cols-12 gap-4 p-4 hover:bg-highlight rounded-lg transition-colors"
        >
          <div className="col-span-2 text-sm">{post.date}</div>
          <div className="col-span-8">
            <h3 className="text-lg font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{post.summary}</p>
          </div>
          <div className="col-span-2 flex flex-wrap gap-1">
            {post.topics.map((topic) => (
              <span 
                key={topic}
                className="text-xs px-2 py-1 bg-muted rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
} 