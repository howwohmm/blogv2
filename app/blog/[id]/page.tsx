import React from 'react'
import { getPostBySlug } from '@/lib/mdx'
import type { BlogPost } from '@/lib/mdx'
import BlogPostComponent from '@/components/blog/BlogPost'
import { notFound } from 'next/navigation'

// Server-side data fetching from MDX files
async function getPost(slug: string): Promise<BlogPost | null> {
  return getPostBySlug(slug)
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return <BlogPostComponent post={post} />
} 