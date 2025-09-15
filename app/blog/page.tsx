import React from 'react'
import { getAllPosts, getAllCategories } from '@/lib/mdx'
import type { BlogPost } from '@/lib/mdx'
import BlogPageClient from '@/components/blog/BlogPageClient'

// Server-side data fetching from MDX files
async function getPosts(): Promise<BlogPost[]> {
  return getAllPosts()
}

export default async function BlogPage() {
  const posts = await getPosts()
  const allCategories = getAllCategories()

  return <BlogPageClient posts={posts} allCategories={allCategories} />
}