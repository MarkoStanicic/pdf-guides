import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, getRelatedPosts, serializePost, BlogPost } from '@/lib/blog'
import { BlogCard } from '@/components/sections/blog-card'
import { CTAButton } from '@/components/ui/cta-button'
import { Button } from '@/components/ui/button'
import { getBundle } from '@/lib/products'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, ArrowLeft, User, CheckCircle, Shield } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

// Create MDX components factory
const createMdxComponents = (post: BlogPost) => ({
  CTABanner: () => {
    const bundle = getBundle()
    
    // Determine CTA content based on post category/slug
    const getCTAContent = () => {
      const postSlug = post.slug.toLowerCase()
      
      if (postSlug.includes('potty') || post.category === 'parenting') {
        return {
          headline: "Ready for a diaper-free life?",
          text: "Get our Potty Training in 3 Days PDF — complete with a step-by-step plan and printable reward charts.",
          button: "Start Potty Training Today →",
          productId: "potty-training-3-days",
          price: 7
        }
      } else if (postSlug.includes('snor') || postSlug.includes('sleep')) {
        return {
          headline: "Stop snoring in just 7 days.",
          text: "Discover natural fixes with our Snore-Free Plan PDF — a simple daily routine that helps you (and your partner) sleep better.",
          button: "Fix Snoring Now →",
          productId: "stop-snoring-7-days",
          price: 5
        }
      } else if (postSlug.includes('dark') || postSlug.includes('circle') || post.category === 'beauty') {
        return {
          headline: "Brighten your eyes in a week.",
          text: "Try our Dark Circles Fix PDF — natural remedies, skincare routines, and a printable tracker for visible results.",
          button: "Get the Guide →",
          productId: "fix-dark-circles-naturally",
          price: 5
        }
      }
      
      // Default generic CTA
      return {
        headline: "Want the full step-by-step solution?",
        text: "Our Simple Steps Guides give you clear, proven routines you can follow today.",
        button: "Download Your Guide →",
        productId: "complete-wellness-bundle",
        price: bundle.price
      }
    }
    
    const cta = getCTAContent()
    
    return (
      <div className="my-8 bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-xl font-bold text-trust-900 mb-2">
              {cta.headline}
            </h3>
            <p className="text-trust-600 mb-4 lg:mb-0">
              {cta.text}
            </p>
          </div>
          <div className="flex-shrink-0">
            <CTAButton
              productId={cta.productId}
              price={cta.price}
              productName={cta.button}
              size="lg"
              className="min-w-[200px]"
              showFeatures={false}
            />
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-trust-500">
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3 text-success-600" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-1 h-3 w-3 text-success-600" />
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  // Standard MDX components
  h1: (props: any) => <h1 className="text-3xl font-bold text-trust-900 mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold text-trust-900 mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold text-trust-900 mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="text-trust-700 mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-trust-700" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-trust-700" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary-500 pl-6 py-2 mb-4 bg-primary-50 rounded-r-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-trust-100 text-trust-800 px-2 py-1 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-trust-900 text-white p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary-600 hover:text-primary-700 underline" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold text-trust-900" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  img: (props: any) => (
    <img className="rounded-lg mb-4 w-full" alt={props.alt || ''} {...props} />
  ),
})

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category, 3)

  return (
    <article className="bg-white">
      {/* Header */}
      <header className="bg-trust-50 py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-trust-600 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
              ${post.category === 'parenting' ? 'bg-blue-100 text-blue-800' : ''}
              ${post.category === 'health' ? 'bg-green-100 text-green-800' : ''}
              ${post.category === 'beauty' ? 'bg-pink-100 text-pink-800' : ''}
              ${post.category === 'tips' ? 'bg-purple-100 text-purple-800' : ''}
            `}>
              {post.category}
            </span>
            
            {post.featured && (
              <span className="inline-block px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-trust-600 mb-8 leading-relaxed">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-trust-600">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{post.author}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} components={createMdxComponents(post)} />
        </div>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-trust-200">
            <h3 className="text-lg font-semibold text-trust-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 bg-trust-100 text-trust-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-trust-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-trust-900 mb-8 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready for Complete Solutions?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Get step-by-step guides that guarantee results. Join thousands who've transformed their lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              productId="complete-wellness-bundle"
              price={getBundle().price}
              productName="Get All 3 Guides"
              size="xl"
              showFeatures={false}
            />
            
            <Button asChild variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary-600">
              <Link href="/blog">
                More Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
