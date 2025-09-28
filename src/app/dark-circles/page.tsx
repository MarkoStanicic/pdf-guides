import React from 'react'
import { Metadata } from 'next'
import { getProductBySlug } from '@/lib/products'
import { combineWithSharedFAQ } from '@/lib/shared-faq'
import { CTAButton } from '@/components/ui/cta-button'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Sparkles, Eye, Leaf } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Fix Dark Circles Naturally - Proven Remedies That Work',
  description: 'Eliminate dark circles and under-eye bags naturally with proven remedies. Look younger and refreshed in weeks. Instant download PDF guide.',
}

export default function DarkCirclesPage() {
  const product = getProductBySlug('dark-circles')
  
  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-6">
              Natural Beauty Solution
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-6xl">
              {product.name}
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-trust-600 sm:text-xl">
              {product.description}
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-trust-600">
              <div className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-pink-600" />
                <span>3-Week Protocol</span>
              </div>
              <div className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-pink-600" />
                <span>Natural Ingredients</span>
              </div>
              <div className="flex items-center">
                <Eye className="mr-2 h-5 w-5 text-pink-600" />
                <span>Safe for Sensitive Skin</span>
              </div>
            </div>
            
            <div className="mt-10">
              <CTAButton
                productId={product.id}
                price={product.price}
                productName={product.name}
                size="xl"
                className="max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-trust-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              Tired of Looking Exhausted Even When You're Not?
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              Dark circles make you look older, tired, and unhealthy - even when you feel great. 
              Expensive eye creams promise miracles but deliver disappointment.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  😔 The Dark Circle Struggle:
                </h3>
                <ul className="space-y-3 text-red-700">
                  <li>• People ask if you're tired or sick</li>
                  <li>• Heavy concealer that cakes and creases</li>
                  <li>• Expensive creams that don't work</li>
                  <li>• Looking older than your actual age</li>
                  <li>• Avoiding photos and bright lighting</li>
                  <li>• Feeling self-conscious about your appearance</li>
                </ul>
              </div>
              
              <div className="bg-success-50 border border-success-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-success-800 mb-4">
                  ✨ With Natural Remedies:
                </h3>
                <ul className="space-y-3 text-success-700">
                  <li>• Bright, refreshed-looking eyes</li>
                  <li>• Minimal or no concealer needed</li>
                  <li>• Pennies on the dollar vs. expensive creams</li>
                  <li>• Look years younger naturally</li>
                  <li>• Confidence in any lighting</li>
                  <li>• Compliments on how great you look</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features 
        title="What's Inside the Guide"
        description="A complete natural treatment program for dark circles and under-eye bags"
        features={product.features.map(feature => ({
          title: feature,
          icon: <CheckCircle className="h-6 w-6 text-pink-600" />
        }))}
        columns={2}
        showCheckmark={false}
      />

      {/* Types of Dark Circles */}
      <section className="py-20 bg-pink-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              Different Causes, Targeted Solutions
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              Not all dark circles are the same. Our guide helps you identify your specific type and provides targeted treatments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Vascular</h3>
              <p className="text-trust-600 text-sm">
                Blue/purple circles from blood vessels showing through thin skin
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Pigmented</h3>
              <p className="text-trust-600 text-sm">
                Brown circles from excess melanin production
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Structural</h3>
              <p className="text-trust-600 text-sm">
                Shadows from under-eye bags or hollows
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Genetic</h3>
              <p className="text-trust-600 text-sm">
                Inherited tendency for dark under-eye area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Natural vs Expensive Treatments */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              Why Natural Remedies Work Better
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              Skip the expensive treatments that don't work and harsh chemicals that irritate sensitive eye area
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-red-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">💸</span>
                Expensive "Solutions"
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800">Eye Creams ($50-200)</h4>
                  <p className="text-red-700 text-sm">Temporary results, harsh chemicals, ongoing cost</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800">Professional Treatments ($500-2000)</h4>
                  <p className="text-red-700 text-sm">Expensive, multiple sessions, possible side effects</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800">Injectables ($400-800 per session)</h4>
                  <p className="text-red-700 text-sm">Risky, temporary, needs regular maintenance</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-success-800 mb-6 flex items-center">
                <span className="text-2xl mr-3">🌿</span>
                Our Natural Approach
              </h3>
              <div className="space-y-4">
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <h4 className="font-semibold text-success-800">Kitchen Ingredients ($10-20 total)</h4>
                  <p className="text-success-700 text-sm">Lasting results, safe and gentle, one-time cost</p>
                </div>
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <h4 className="font-semibold text-success-800">At-Home Treatments</h4>
                  <p className="text-success-700 text-sm">Convenient, private, no appointments needed</p>
                </div>
                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <h4 className="font-semibold text-success-800">Natural & Safe Methods</h4>
                  <p className="text-success-700 text-sm">No side effects, suitable for sensitive skin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Week Protocol */}
      <section className="py-20 bg-pink-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              The 3-Week Natural Protocol
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              A systematic approach to eliminating dark circles for good
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-4">Week 1: Foundation</h3>
              <p className="text-trust-600">
                Identify your dark circle type, start gentle treatments, 
                and establish healthy eye care routine.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-4">Week 2: Treatment</h3>
              <p className="text-trust-600">
                Intensive natural remedies, targeted exercises, 
                and lifestyle optimizations for faster healing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-4">Week 3: Results</h3>
              <p className="text-trust-600">
                Fine-tune your routine, maintain results, 
                and prevent dark circles from returning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials 
        testimonials={product.testimonials}
        title="Real Transformations"
        description="See how natural remedies have helped thousands look years younger"
      />

      {/* FAQ */}
      <FAQ 
        items={combineWithSharedFAQ(product.faq)}
        title="Frequently Asked Questions"
        description="Everything you need to know about fixing dark circles naturally"
        className="bg-trust-50"
      />

      {/* Final CTA */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Look Years Younger?
            </h2>
            <p className="mt-6 text-lg leading-8 text-pink-100">
              Stop wasting money on expensive creams that don't work. 
              Start your natural transformation today and see real results in just weeks.
            </p>
            
            <div className="mt-10">
              <CTAButton
                productId={product.id}
                price={product.price}
                productName={product.name}
                size="xl"
                className="max-w-md mx-auto"
              />
            </div>
            
            <p className="mt-6 text-sm text-pink-200">
              30-day money-back guarantee • Instant download • Safe for sensitive skin
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
