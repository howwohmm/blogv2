'use client'

import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { BlogPost } from '@/lib/firebase'
import Link from 'next/link'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, 'posts')
        const q = query(postsRef, orderBy('date', 'desc'))
        const querySnapshot = await getDocs(q)
        
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[]
        
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Get unique categories from all posts
  const allCategories = Array.from(
    new Set(posts.flatMap(post => post.categories))
  ).sort()

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9fc]">
        <div className="max-w-[1728px] mx-auto px-8">
          <div className="flex">
            {/* Sidebar Skeleton */}
            <aside className="w-[240px] flex-shrink-0 pr-8">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 w-20"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-8 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1">
              <div className="mb-16">
                <div className="h-24 bg-gray-200 w-48 rounded"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <div className="max-w-[1728px] mx-auto">
        {/* Title Section - Responsive */}
        <div className="px-4 sm:px-8 pt-8 sm:pt-16 pb-8 sm:pb-12">
          <h1 className="text-[48px] sm:text-[72px] md:text-[96px] leading-[1] tracking-[-0.04em] font-bold text-[#1a1f36]">
            Ohmlogs
            <sup className="text-[24px] sm:text-[36px] md:text-[48px] text-[#697386] font-light ml-2">
              ({filteredPosts.length})
            </sup>
          </h1>
        </div>

        {/* Main Content Layout - Responsive Grid */}
        <div className="px-4 sm:px-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
            {/* Filters Section - Responsive Position */}
            <aside className="mb-8 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                {/* Horizontal Scroll for Small Screens */}
                <div className="mb-6">
                  <h2 className="font-mono text-[13px] uppercase text-[#697386] mb-4">/ FILTERS</h2>
                  <div className="flex lg:hidden overflow-x-auto pb-4 gap-4 scrollbar-hide">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleTopic(category)}
                        className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full border ${
                          selectedTopics.includes(category)
                            ? 'bg-[#0a2540] text-white border-[#0a2540]'
                            : 'border-[#a7b0c0] text-[#1a1f36]'
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

                {/* Vertical List for Large Screens */}
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
                      <label
                        key={category}
                        className="flex items-center py-1.5 cursor-pointer group text-[15px] text-[#697386] hover:text-[#1a1f36]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(category)}
                          onChange={() => toggleTopic(category)}
                          className="mr-3"
                        />
                        <span className="flex-1">{category}</span>
                        <span className="text-[13px]">
                          ({posts.filter(post => post.categories.includes(category)).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Blog Posts Section */}
            <main>
              {/* Table Headers */}
              <div className="flex items-center py-3 border-y border-dotted border-[#a7b0c0] mb-3">
                <div className="w-28 sm:w-36 font-mono text-[13px] uppercase text-[#697386]">/ DATE</div>
                <div className="flex-1 font-mono text-[13px] uppercase text-[#697386]">/ NAME</div>
              </div>

              {/* Posts */}
              <div className="space-y-[1px]">
                {filteredPosts.map(post => (
                  <div key={post.id} className="group relative">
                    <div className="flex items-center py-3 sm:py-4 hover:bg-[#fff7d6] transition-colors">
                      <div className="w-28 sm:w-36">
                        <span className="font-mono text-[13px] sm:text-[15px] text-[#697386]">{post.date}</span>
                      </div>
                      <div className="flex-1 pr-8">
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-[15px] sm:text-[17px] text-[#1a1f36] font-medium leading-relaxed hover:text-[#635bff]"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <button
                        onClick={(e) => toggleExpand(post.id, e)}
                        className="absolute right-0 sm:right-4 w-8 h-8 flex items-center justify-center text-[20px] text-[#697386] hover:text-[#1a1f36]"
                      >
                        {expandedPost === post.id ? '−' : '+'}
                      </button>
                    </div>

                    {expandedPost === post.id && (
                      <div className="py-8 sm:py-12 bg-white border-t border-dotted border-[#a7b0c0]">
                        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8">
                          {/* Summary and Author Section */}
                          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr_120px_auto] items-baseline gap-2 sm:gap-8 mb-8">
                            <div className="font-mono text-[13px] uppercase text-[#697386]">SUMMARY:</div>
                            <div className="text-[15px] sm:text-[17px] leading-relaxed text-[#1a1f36] mb-6 sm:mb-0">
                              Breaking free from theoretical loops & getting your hands dirty. Learn why experimentation is the key to mastery.
                            </div>
                            <div className="font-mono text-[13px] uppercase text-[#697386]">AUTHOR:</div>
                            <div className="text-[15px] sm:text-[17px] text-[#1a1f36]">{post.author}</div>
                          </div>

                          {/* Topics Section */}
                          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-baseline gap-2 sm:gap-8 mb-8">
                            <div className="font-mono text-[13px] uppercase text-[#697386]">TOPIC:</div>
                            <div className="flex flex-wrap gap-2">
                              {post.categories.map(category => (
                                <span
                                  key={category}
                                  className="px-3 py-1.5 bg-[#f6f9fc] text-[#1a1f36] text-[13px] sm:text-[15px] rounded-sm uppercase"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Read Button Section */}
                          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-baseline gap-2 sm:gap-8">
                            <div></div>
                            <div>
                              <Link
                                href={`/blog/${post.id}`}
                                className="block w-full py-3 sm:py-4 text-center border border-[#e6ebf1] rounded-sm text-[14px] sm:text-[15px] text-[#1a1f36] hover:bg-[#f6f9fc] transition-colors"
                              >
                                Read
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
} 