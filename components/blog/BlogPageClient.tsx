'use client'

import React from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/firebase-optimized'

interface BlogPageClientProps {
  posts: BlogPost[]
  allCategories: string[]
}

export default function BlogPageClient({ posts, allCategories }: BlogPageClientProps) {
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([])
  const [expandedPost, setExpandedPost] = React.useState<string | null>(null)

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const filteredPosts = selectedTopics.length === 0
    ? posts
    : posts.filter(post =>
        post.categories.some(category => selectedTopics.includes(category))
      )

  const toggleExpand = (postId: string, e: React.MouseEvent) => {
    e.preventDefault()
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <div className="max-w-[1728px] mx-auto">
        {/* Title Section */}
        <div className="px-4 sm:px-8 pt-8 sm:pt-16 pb-8 sm:pb-12">
          <h1 className="text-[48px] sm:text-[72px] md:text-[96px] leading-[1] tracking-[-0.04em] font-bold text-[#1a1f36]">
            Ohmlogs
            <sup className="text-[24px] sm:text-[36px] md:text-[48px] text-[#697386] font-light ml-2">
              ({filteredPosts.length})
            </sup>
          </h1>
        </div>

        {/* Main Content Layout */}
        <div className="px-4 sm:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            {/* Filters Section */}
            <aside className="mb-8 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <div className="mb-6">
                  <h2 className="font-mono text-[13px] uppercase text-[#697386] mb-4">/ FILTERS</h2>
                  <div className="flex lg:hidden overflow-x-auto pb-4 gap-4 scrollbar-hide">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleTopic(category)}
                        className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
                          selectedTopics.includes(category)
                            ? 'bg-[#0a2540] text-white border-[#0a2540]'
                            : 'border-[#a7b0c0] text-[#1a1f36] hover:bg-[#f6f9fc]'
                        }`}
                      >
                        {category}
                        <span className="ml-2 text-[13px] opacity-60">
                          ({posts.filter(post => post.categories.includes(category)).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block border-b border-dotted border-[#a7b0c0] pb-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 text-[15px] text-[#1a1f36]">
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2h10M2 7h10M2 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span className="font-mono text-[13px] uppercase">Topic</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleTopic(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedTopics.includes(category)
                            ? 'bg-[#0a2540] text-white'
                            : 'text-[#697386] hover:bg-[#f6f9fc]'
                        }`}
                      >
                        {category}
                        <span className="ml-2 text-[13px] opacity-60">
                          ({posts.filter(post => post.categories.includes(category)).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-[#e6ebf1] overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-2xl font-bold text-[#1a1f36] mb-2 hover:text-[#667eea] transition-colors">
                            <Link href={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </h2>
                          <p className="text-[#697386] text-sm mb-3">
                            By {post.author} • {post.readingTime} • {post.date}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.map(category => (
                              <span
                                key={category}
                                className="px-2 py-1 bg-[#f6f9fc] text-[#667eea] text-xs rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-[#697386] leading-relaxed mb-4">
                        {post.summary || post.content.substring(0, 200) + '...'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center text-[#667eea] hover:text-[#5a67d8] font-medium transition-colors"
                        >
                          Read more
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <button
                          onClick={(e) => toggleExpand(post.id, e)}
                          className="text-[#697386] hover:text-[#1a1f36] transition-colors"
                        >
                          {expandedPost === post.id ? 'Show less' : 'Show more'}
                        </button>
                      </div>
                      
                      {expandedPost === post.id && (
                        <div className="mt-4 pt-4 border-t border-[#e6ebf1]">
                          <div className="prose prose-sm max-w-none text-[#697386]">
                            {post.content}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
