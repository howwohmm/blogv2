import React from 'react'
import Link from 'next/link'

interface BlogPostProps {
  post: {
    title: string
    date: string
    author: string
    readingTime: string
    categories: string[]
    content: string
  }
}

export default function BlogPost({ post }: BlogPostProps) {
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${post.title}\n\nBy ${post.author}\n\n`)
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-[#0a2540] text-white py-2 px-4">
        <div className="flex items-center">
          <Link href="/blog" className="font-mono text-[13px] opacity-60 hover:opacity-100">
            ← BACK TO BLOG
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        {/* Title Section */}
        <h1 className="font-sans text-[80px] leading-[1] tracking-[-0.04em] font-light text-[#1a1f36] mb-24">
          {post.title}
        </h1>

        <div className="grid grid-cols-[1fr] gap-16">
          {/* Metadata Section */}
          <div className="grid grid-cols-[auto_auto_auto_auto_1fr] items-baseline gap-x-16 border-t border-b border-dotted border-[#e6ebf1] py-6">
            <div>
              <div className="font-mono text-[12px] uppercase text-[#697386]">DATE:</div>
              <div className="text-[15px] text-[#1a1f36]">{post.date}</div>
            </div>

            <div>
              <div className="font-mono text-[12px] uppercase text-[#697386]">AUTHOR:</div>
              <div className="text-[15px] text-[#1a1f36]">
                <span className="inline-block px-2 py-0.5 border border-dotted border-[#e6ebf1]">
                  {post.author}
                </span>
              </div>
            </div>

            <div>
              <div className="font-mono text-[12px] uppercase text-[#697386]">READING TIME:</div>
              <div className="text-[15px] text-[#1a1f36]">{post.readingTime}</div>
            </div>

            <div>
              <div className="font-mono text-[12px] uppercase text-[#697386]">CATEGORIES:</div>
              <div className="flex flex-wrap gap-2">
                {post.categories.map(category => (
                  <span 
                    key={category}
                    className="inline-block px-2 py-0.5 border border-dotted border-[#e6ebf1] text-[#1a1f36] text-[13px] uppercase"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="justify-self-end">
              <div className="font-mono text-[12px] uppercase text-[#697386]">SHARE:</div>
              <div className="flex gap-3">
                <button 
                  onClick={shareOnTwitter}
                  className="px-5 py-1 rounded-full border border-[#e6ebf1] text-[14px] text-[#1a1f36] hover:bg-[#f6f9fc] transition-colors"
                >
                  Twitter/X
                </button>
                <button 
                  onClick={shareOnLinkedIn}
                  className="px-5 py-1 rounded-full border border-[#e6ebf1] text-[14px] text-[#1a1f36] hover:bg-[#f6f9fc] transition-colors"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="font-mono text-[12px] uppercase text-[#697386] mb-8">/ ARTICLE</div>
            <div 
              className="text-[17px] leading-relaxed text-[#1a1f36] space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </article>
        </div>
      </div>
    </div>
  )
} 