import React from 'react'
import { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import { BlogCard } from '@/components/sections/blog-card'
import { Button } from '@/components/ui/button'
import { CTAButton } from '@/components/ui/cta-button'
import { getBundle } from '@/lib/products'
import { BookOpen, TrendingUp, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Tips & Guides for Better Living',
  description: 'Free tips and advice on parenting, health, and beauty. Learn practical strategies for solving everyday problems naturally.',
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const categories = getAllCategories()
  const featuredPosts = allPosts.filter(post => post.featured).slice(0, 2)
  const regularPosts = allPosts.filter(post => !post.featured).slice(0, 8)
  const bundle = getBundle()

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center bg-primary-100 text-primary-800 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <BookOpen className="mr-2 h-4 w-4" />
            Free Resources
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl">
            Tips & Guides for Better Living
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-trust-600">
            Practical advice and proven strategies for solving everyday problems. 
            Learn from our experts and join thousands who've transformed their lives.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="sm">
            All Posts
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm" className="capitalize">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center mb-8">
              <TrendingUp className="mr-2 h-6 w-6 text-accent-600" />
              <h2 className="text-2xl font-bold text-trust-900">Featured Articles</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-trust-900 mb-8">
            Latest Articles
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-16 w-16 text-trust-300 mb-4" />
              <h3 className="text-xl font-semibold text-trust-900 mb-2">
                Coming Soon!
              </h3>
              <p className="text-trust-600 mb-8">
                We're working on amazing content for you. Check back soon for helpful tips and guides.
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Want the Complete Solutions?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            While our blog gives you great tips, our comprehensive guides provide complete, 
            step-by-step solutions that guarantee results. Get all 3 guides and transform your life today.
          </p>
          
          <CTAButton
            productId="complete-wellness-bundle"
            price={bundle.price}
            productName="All 3 Complete Guides"
            size="xl"
            className="max-w-md mx-auto"
            showFeatures={false}
          />
          
          <p className="mt-4 text-sm text-primary-200">
            30-day guarantee • Instant download • Complete step-by-step solutions
          </p>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-trust-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-trust-900 mb-4">
            Never Miss a Tip
          </h3>
          <p className="text-trust-600 mb-8 max-w-2xl mx-auto">
            Get our latest articles and exclusive tips delivered to your inbox. 
            Join thousands of readers who stay ahead with our weekly newsletter.
          </p>
          
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-trust-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm text-trust-500">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </section>
      </div>
    </div>
  )
}
