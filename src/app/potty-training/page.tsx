import React from 'react'
import { Metadata } from 'next'
import { getProductBySlug } from '@/lib/products'
import { combineWithSharedFAQ } from '@/lib/shared-faq'
import { CTAButton } from '@/components/ui/cta-button'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { StructuredData } from '@/components/seo/structured-data'
import { generateProductSchema, generateFAQSchema } from '@/lib/structured-data'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Clock, Users, Target } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Potty Training in 3 Days - Proven Method That Works',
  description: 'Get your toddler fully potty trained in just 3 days with our proven, stress-free method. No more accidents, no more diapers. Instant download PDF guide.',
}

export default function PottyTrainingPage() {
  const product = getProductBySlug('potty-training')
  
  if (!product) {
    notFound()
  }

  return (
    <>
      <StructuredData data={generateProductSchema(product)} />
      <StructuredData data={generateFAQSchema(product.faq)} />
      <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              Parenting Solution
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-6xl">
              {product.name}
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-trust-600 sm:text-xl">
              {product.description}
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-trust-600">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                <span>3-Day Method</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                <span>Ages 20 months - 4 years</span>
              </div>
              <div className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                <span>Proven Results</span>
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
              Tired of Potty Training Struggles?
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              You're not alone. Most parents try for months with little progress, 
              dealing with accidents, resistance, and frustration daily.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  😫 Common Frustrations:
                </h3>
                <ul className="space-y-3 text-red-700">
                  <li>• Accidents everywhere, constant cleanup</li>
                  <li>• Child refuses to use the potty</li>
                  <li>• Progress one day, regression the next</li>
                  <li>• Expensive diapers eating your budget</li>
                  <li>• Stress and power struggles every day</li>
                  <li>• Feeling like you're doing it all wrong</li>
                </ul>
              </div>
              
              <div className="bg-success-50 border border-success-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-success-800 mb-4">
                  🎉 After Our Method:
                </h3>
                <ul className="space-y-3 text-success-700">
                  <li>• No more diapers in just 3 days</li>
                  <li>• Child proudly uses the potty independently</li>
                  <li>• Consistent success, no more accidents</li>
                  <li>• Save $2000+ on diapers per year</li>
                  <li>• Peaceful, stress-free potty time</li>
                  <li>• Confidence in your parenting ability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features 
        title="What's Inside the Guide"
        description="Everything you need for potty training success in one comprehensive guide"
        features={product.features.map(feature => ({
          title: feature,
          icon: <CheckCircle className="h-6 w-6 text-blue-600" />
        }))}
        columns={2}
        showCheckmark={false}
      />

      {/* Method Overview */}
      <section className="py-20 bg-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              The 3-Day Method Overview
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              A proven, systematic approach that works with your child's natural development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-4">Day 1: Foundation</h3>
              <p className="text-trust-600">
                Set up for success with proper preparation, readiness assessment, 
                and initial introduction to the potty routine.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-4">Day 2: Practice</h3>
              <p className="text-trust-600">
                Intensive practice day with consistent schedules, 
                positive reinforcement, and handling any resistance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-4">Day 3: Mastery</h3>
              <p className="text-trust-600">
                Reinforce independence, troubleshoot any issues, 
                and establish long-term success habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials 
        testimonials={product.testimonials}
        title="Success Stories from Real Parents"
        description="See how other parents transformed their potty training experience"
      />

      {/* FAQ */}
      <FAQ 
        items={combineWithSharedFAQ(product.faq)}
        title="Frequently Asked Questions"
        description="Everything you need to know about our potty training method"
        className="bg-trust-50"
      />

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to End Potty Training Struggles?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Join thousands of parents who've successfully potty trained their toddlers in just 3 days. 
              Your child can be diaper-free by this weekend!
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
            
            <p className="mt-6 text-sm text-blue-200">
              30-day money-back guarantee • Instant download • Secure payment
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
