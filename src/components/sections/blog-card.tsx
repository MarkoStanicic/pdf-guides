import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/types'
import { formatDate, truncate } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  showExcerpt?: boolean
  className?: string
}

export function BlogCard({ post, showExcerpt = true, className }: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    parenting: 'bg-blue-100 text-blue-800',
    health: 'bg-green-100 text-green-800',
    beauty: 'bg-pink-100 text-pink-800',
    tips: 'bg-purple-100 text-purple-800',
    default: 'bg-trust-100 text-trust-800',
  }

  const categoryColor = categoryColors[post.category.toLowerCase()] || categoryColors.default

  return (
    <article className={`group bg-white rounded-lg shadow-md border border-trust-200 hover:shadow-lg transition-all duration-200 overflow-hidden relative ${className}`}>
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${categoryColor}`}>
            {post.category}
          </span>
          
          {post.featured && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-accent-100 text-accent-800 rounded-full">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-trust-900 mb-3 group-hover:text-primary-600 transition-colors">
          <Link href={`/blog/${post.slug}`} className="stretched-link">
            {post.title}
          </Link>
        </h3>
        
        {showExcerpt && (
          <p className="text-trust-600 mb-4 leading-relaxed">
            {truncate(post.description, 150)}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-trust-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          
          <div className="flex items-center text-primary-600 group-hover:text-primary-700">
            <span className="mr-1">Read more</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {post.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-trust-100">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs text-trust-600 bg-trust-50 rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs text-trust-500 bg-trust-50 rounded-md">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
