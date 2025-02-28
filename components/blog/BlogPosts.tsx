'use client'

import React, { useState } from 'react'

interface BlogPost {
  id: string
  date: string
  title: string
  topics: string[]
  summary: string
  author: string
  expanded?: boolean
  highlight?: boolean
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    date: '2025.02.21',
    title: 'Securing Stripe API Keys in AWS with Automatic Rotation',
    topics: ['AWS'],
    summary: 'Learn how to securely manage and automatically rotate your Stripe API keys in AWS for a production-grade approach. This guide covers best practices, tools, and strategies to enhance the security of your financial transactions.',
    author: 'James Beswick'
  },
  {
    id: '2',
    date: '2025.02.19',
    title: 'Tracking Customer Spend in an Omnichannel or Multiprocessor Environment',
    topics: ['ENTERPRISE'],
    summary: 'Discover how to effectively track customer spending across multiple channels and payment processors. Learn about the challenges of fragmented payment systems and explore solutions like the Payment Account Reference (PAR) to gain a unified view.',
    author: 'Andrew Robinson'
  },
  {
    id: '3',
    date: '2025.02.06',
    title: 'Building Rock-Solid Stripe Integrations: A Developer\'s Guide to Success',
    topics: ['Getting Started', 'Dev Digest'],
    summary: 'A comprehensive guide to building reliable and scalable Stripe integrations. Learn best practices, common pitfalls to avoid, and advanced techniques for robust payment processing.',
    author: 'Sarah Chen'
  },
  {
    id: '4',
    date: '2025.01.30',
    title: 'Building Resilient Webhook Handlers in AWS: Implementing DLQs for Stripe Events',
    topics: ['AWS', 'Webhooks'],
    highlight: true,
    summary: 'Learn how to build robust webhook handlers using AWS services. This guide covers implementing Dead Letter Queues (DLQs) for reliable Stripe event processing and handling edge cases.',
    author: 'Michael Torres'
  },
  {
    id: '5',
    date: '2025.01.29',
    title: 'New to Stripe? Learn the key concepts for software developers.',
    topics: ['Getting Started'],
    summary: 'A comprehensive introduction to Stripe for developers. This guide covers core concepts, API basics, and best practices to help you get started with confidence.',
    author: 'Emily Parker'
  },
  {
    id: '6',
    date: '2024.12.19',
    title: 'Testing Connect onboarding with Sandboxes',
    topics: ['Connect', 'Sandboxes'],
    summary: 'Master the art of testing Stripe Connect integrations using Sandboxes. Learn how to simulate various onboarding scenarios and validate your implementation.',
    author: 'David Kim'
  }
]

interface BlogPostsProps {
  selectedTopics: string[]
}

export default function BlogPosts({ selectedTopics }: BlogPostsProps) {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  const togglePost = (postId: string, isExpandButton: boolean, e: React.MouseEvent) => {
    e.preventDefault()
    if (isExpandButton) {
      const newExpanded = new Set(expandedPosts)
      if (newExpanded.has(postId)) {
        newExpanded.delete(postId)
      } else {
        newExpanded.add(postId)
      }
      setExpandedPosts(newExpanded)
    } else {
      window.location.href = `/blog/${postId}`
    }
  }

  const filteredPosts = selectedTopics.length === 0
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => 
        post.topics.some(topic => selectedTopics.includes(topic))
      )

  return (
    <div>
      {/* Table Headers */}
      <div className="flex items-center py-2 border-b border-[#e6ebf1] mb-2">
        <div className="w-32 font-mono text-[12px] uppercase text-[#697386]">/ DATE</div>
        <div className="flex-1 font-mono text-[12px] uppercase text-[#697386]">/ NAME</div>
      </div>

      {/* Blog Posts */}
      <div className="space-y-[1px]">
        {filteredPosts.map((post) => (
          <div 
            key={post.id} 
            className="group relative"
          >
            <div 
              className="flex items-center py-3 px-4 -mx-4 cursor-pointer hover:bg-[#fff7d6] transition-colors"
            >
              <div className="w-32">
                <span className="font-mono text-[13px] text-[#697386]">{post.date}</span>
              </div>
              <div 
                className="flex-1 pr-8"
                onClick={(e) => togglePost(post.id, false, e)}
              >
                <h3 className="text-[15px] text-[#1a1f36] font-medium leading-relaxed">
                  {post.title}
                </h3>
              </div>
              <button 
                onClick={(e) => togglePost(post.id, true, e)}
                className="absolute right-4 w-6 h-6 flex items-center justify-center text-[#697386] hover:text-[#1a1f36]"
              >
                {expandedPosts.has(post.id) ? '−' : '+'}
              </button>
            </div>

            {expandedPosts.has(post.id) && (
              <div className="py-8 px-4 -mx-4 bg-white border-t border-[#e6ebf1]">
                <div className="w-full max-w-[1200px] mx-auto">
                  <div className="grid grid-cols-[100px_1fr_100px_auto] gap-x-8 mb-8">
                    <div className="font-mono text-[12px] uppercase text-[#697386]">SUMMARY:</div>
                    <div className="text-[15px] leading-relaxed text-[#1a1f36]">{post.summary}</div>
                    <div className="font-mono text-[12px] uppercase text-[#697386]">AUTHOR:</div>
                    <div className="text-[15px] text-[#1a1f36]">{post.author}</div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-x-8 mb-8">
                    <div className="font-mono text-[12px] uppercase text-[#697386]">TOPIC:</div>
                    <div className="flex flex-wrap gap-2">
                      {post.topics.map(topic => (
                        <span 
                          key={topic}
                          className="px-2 py-1 bg-[#f6f9fc] text-[#1a1f36] text-[13px] rounded-sm uppercase"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-x-8">
                    <div></div>
                    <div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = `/blog/${post.id}`
                        }}
                        className="w-full py-3 text-center border border-[#e6ebf1] rounded-sm text-[14px] text-[#1a1f36] hover:bg-[#f6f9fc] transition-colors"
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 