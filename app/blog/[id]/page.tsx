'use client'

import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { BlogPost } from '@/lib/firebase'
import BlogPostComponent from '@/components/blog/BlogPost'

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, 'posts', params.id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data()
          } as BlogPost)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] animate-pulse">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="h-24 bg-gray-200 rounded mb-16 w-3/4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-[#1a1f36] mb-4">Post not found</h1>
          <p className="text-[#697386]">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return <BlogPostComponent post={post} />
} 