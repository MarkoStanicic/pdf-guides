import React from 'react'
import { Metadata } from 'next'
import { getProductBySlug } from '@/lib/products'
import { combineWithSharedFAQ } from '@/lib/shared-faq'
import { CTAButton } from '@/components/ui/cta-button'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Moon, Heart, Volume2 } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Stop Snoring in 7 Days - Natural Methods That Work',
  description: 'Eliminate snoring naturally in just 7 days with proven techniques. Better sleep for you and your partner. Instant download PDF guide with exercises.',
}

export default function StopSnoringPage() {
  const product = getProductBySlug('stop-snoring')
  
  if (!product) {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              Health & Sleep Solution
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-6xl">
              {product.name}
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-trust-600 sm:text-xl">
              {product.description}
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-trust-600">
              <div className="flex items-center">
                <Moon className="mr-2 h-5 w-5 text-green-600" />
                <span>7-Day Program</span>
              </div>
              <div className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-green-600" />
                <span>100% Natural</span>
              </div>
              <div className="flex items-center">
                <Volume2 className="mr-2 h-5 w-5 text-green-600" />
                <span>Scientifically Proven</span>
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
              Snoring is Destroying Your Sleep (And Your Relationship)
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              Loud snoring doesn't just disrupt your partner's sleep - it's also preventing you from getting 
              the deep, restorative sleep your body needs.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  😴 The Hidden Costs of Snoring:
                </h3>
                <ul className="space-y-3 text-red-700">
                  <li>• Your partner sleeps in another room</li>
                  <li>• Constant fatigue and brain fog</li>
                  <li>• Embarrassment during travel or sleepovers</li>
                  <li>• Increased risk of health problems</li>
                  <li>• Relationship tension and complaints</li>
                  <li>• Poor sleep quality despite 8+ hours in bed</li>
                </ul>
              </div>
              
              <div className="bg-success-50 border border-success-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-success-800 mb-4">
                  🌙 After Stopping Your Snoring:
                </h3>
                <ul className="space-y-3 text-success-700">
                  <li>• Silent, peaceful nights for everyone</li>
                  <li>• Wake up refreshed and energized</li>
                  <li>• Travel with confidence anywhere</li>
                  <li>• Better health and reduced risks</li>
                  <li>• Happy partner who sleeps soundly</li>
                  <li>• Deep, restorative sleep every night</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features 
        title="What's Inside the Guide"
        description="A complete 7-day program to eliminate snoring naturally"
        features={product.features.map(feature => ({
          title: feature,
          icon: <CheckCircle className="h-6 w-6 text-green-600" />
        }))}
        columns={2}
        showCheckmark={false}
      />

      {/* Method Overview */}
      <section className="py-20 bg-green-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              The 7-Day Natural Method
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              A progressive program that addresses the root causes of snoring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-green-600">1-2</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Assessment</h3>
              <p className="text-trust-600 text-sm">
                Identify your snoring type and root causes
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-green-600">3-4</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Exercises</h3>
              <p className="text-trust-600 text-sm">
                Throat and tongue strengthening routines
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-green-600">5-6</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Optimization</h3>
              <p className="text-trust-600 text-sm">
                Sleep position and breathing techniques
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-green-600">7</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-2">Results</h3>
              <p className="text-trust-600 text-sm">
                Enjoy silent, peaceful nights
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-green-100 border border-green-300 rounded-full px-6 py-3">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Most people see results by day 3-5
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Natural Methods Work */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              Why Natural Methods Work Better
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              Unlike devices, sprays, or surgery, our natural approach addresses the actual cause
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-3">Devices & Sprays</h3>
              <ul className="text-trust-600 text-sm space-y-2">
                <li>• Only temporary relief</li>
                <li>• Uncomfortable to use</li>
                <li>• Ongoing costs</li>
                <li>• Don't fix root cause</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-3">Surgery</h3>
              <ul className="text-trust-600 text-sm space-y-2">
                <li>• Expensive and risky</li>
                <li>• Recovery time</li>
                <li>• May not work</li>
                <li>• Potential complications</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-trust-900 mb-3">Our Natural Method</h3>
              <ul className="text-success-700 text-sm space-y-2">
                <li>• Permanent results</li>
                <li>• Completely safe</li>
                <li>• One-time cost</li>
                <li>• Fixes the real problem</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials 
        testimonials={product.testimonials}
        title="Real People, Real Results"
        description="See how our natural method has transformed sleep for thousands"
        className="bg-trust-50"
      />

      {/* FAQ */}
      <FAQ 
        items={combineWithSharedFAQ(product.faq)}
        title="Frequently Asked Questions"
        description="Everything you need to know about stopping snoring naturally"
      />

      {/* Final CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for Silent, Peaceful Nights?
            </h2>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Stop letting snoring destroy your sleep and your relationship. 
              Start the 7-day program tonight and wake up refreshed tomorrow.
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
            
            <p className="mt-6 text-sm text-green-200">
              30-day money-back guarantee • Instant download • 100% natural methods
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
