import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { readingTime } from './utils'
import { BlogPost } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export async function getAllPosts(): Promise<BlogPost[]> {
  // Ensure the blog directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        const slug = fileName.replace(/\.mdx$/, '')
        return getPostBySlug(slug)
      })
  )

  // Sort posts by date (newest first)
  return allPostsData
    .filter(post => post !== null)
    .sort((a, b) => {
      if (a!.publishedAt < b!.publishedAt) {
        return 1
      } else {
        return -1
      }
    }) as BlogPost[]
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Validate required fields
    if (!data.title || !data.description || !data.publishedAt) {
      console.warn(`Missing required fields in ${slug}.mdx`)
      return null
    }

    const post: BlogPost = {
      slug,
      title: data.title,
      description: data.description,
      content,
      author: data.author || 'Simple Steps Guides',
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      image: data.image,
      category: data.category || 'tips',
      tags: data.tags || [],
      readingTime: readingTime(content),
      featured: data.featured || false,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
    }

    return post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.featured)
}

export async function getRelatedPosts(currentSlug: string, category: string, limit = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
}

export function getAllCategories(): string[] {
  return ['parenting', 'health', 'beauty', 'tips']
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tagSet = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag.toLowerCase()))
  })
  
  return Array.from(tagSet).sort()
}

export async function serializePost(post: BlogPost) {
  const mdxSource = await serialize(post.content, {
    scope: {
      title: post.title,
      description: post.description,
      author: post.author,
      publishedAt: post.publishedAt,
    },
  })

  return {
    ...post,
    mdxSource,
  }
}

// Pagination helpers
export function paginatePosts(posts: BlogPost[], page = 1, postsPerPage = 6) {
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  const paginatedPosts = posts.slice(startIndex, endIndex)
  
  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages,
    totalPosts,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}
