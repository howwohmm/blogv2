import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  id: string
  title: string
  date: string
  content: string
  author: string
  readingTime: string
  categories: string[]
  summary?: string
  slug: string
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(contentDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          id: slug,
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          author: data.author || 'Ohm',
          readingTime: data.readingTime || '2 min read',
          categories: data.categories || [],
          summary: data.summary || '',
          content: content || '',
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return allPostsData
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id: slug,
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Ohm',
      readingTime: data.readingTime || '2 min read',
      categories: data.categories || [],
      summary: data.summary || '',
      content: content || '',
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    post.categories.forEach(category => categories.add(category))
  })
  
  return Array.from(categories).sort()
}
