import React from 'react'
import { Metadata } from 'next'
import { CTAButton } from '@/components/ui/cta-button'
import { Features } from '@/components/sections/features'
import { getAllProducts, getBundle, calculateBundleSavings } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Star, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bundle Pricing - Get All 3 Guides for $19',
  description: 'Get all 3 proven guides - Potty Training, Stop Snoring, Fix Dark Circles - for just $19. Save $12 on individual purchases with instant download and 30-day guarantee.',
}

export default function PricingPage() {
  const products = getAllProducts()
  const bundle = getBundle()
  const savings = calculateBundleSavings()
  const individualTotal = products.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl">
            Complete Wellness Bundle
          </h1>
          <p className="mt-6 text-lg leading-8 text-trust-600">
            Get all 3 proven guides and save ${savings}. Everything you need for parenting, health, and beauty success.
          </p>
          
          {/* Savings highlight */}
          <div className="mt-8 inline-flex items-center bg-success-50 border border-success-200 rounded-full px-6 py-3">
            <Star className="mr-2 h-5 w-5 text-success-600" />
            <span className="text-success-800 font-semibold">
              Limited Time: Save ${savings} vs. Individual Purchase
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Individual Guides */}
            <div className="bg-white border-2 border-trust-200 rounded-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-trust-900">Individual Guides</h3>
                <p className="text-trust-600 mt-2">Buy guides separately</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-trust-900">
                    {formatPrice(individualTotal)}
                  </span>
                  <span className="text-trust-600 ml-2">total</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-trust-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-trust-900">{product.name}</h4>
                      <p className="text-sm text-trust-600 capitalize">{product.category}</p>
                    </div>
                    <span className="font-bold text-trust-900">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-trust-500 mb-4">
                  Choose individual guides from the homepage
                </p>
              </div>
            </div>

            {/* Bundle Deal */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl p-8 relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute -top-2 -right-2 bg-accent-500 text-accent-950 px-4 py-2 rounded-bl-lg font-semibold text-sm">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold">Complete Bundle</h3>
                <p className="text-primary-100 mt-2">All 3 guides included</p>
                <div className="mt-4">
                  <span className="text-5xl font-bold">
                    {formatPrice(bundle.price)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-lg text-primary-200 line-through">
                    {formatPrice(individualTotal)}
                  </span>
                  <span className="bg-success-500 text-success-950 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ${savings}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center p-4 bg-white/10 rounded-lg">
                    <CheckCircle className="mr-3 h-5 w-5 text-success-300" />
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-primary-100 capitalize">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <CTAButton
                productId="complete-wellness-bundle"
                price={bundle.price}
                productName={bundle.name}
                size="xl"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900">
              Why the Bundle is Your Best Choice
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-success-600">${savings}</span>
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-2">Huge Savings</h3>
              <p className="text-trust-600">
                Save ${savings} compared to buying guides individually. That's a {Math.round((savings / individualTotal) * 100)}% discount!
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-2">Complete Solution</h3>
              <p className="text-trust-600">
                Address all aspects of wellness - parenting challenges, health issues, and beauty concerns in one purchase.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-trust-900 mb-2">Future-Proof</h3>
              <p className="text-trust-600">
                Have solutions ready for when you need them. Lifetime access means you're covered for any future challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Bundle Features */}
        <Features
          title="Everything Included in the Bundle"
          features={[
            "3 Complete PDF Guides (60+ pages total)",
            "Step-by-step instructions for each solution", 
            "Troubleshooting guides for common setbacks",
            "Shopping lists and preparation checklists",
            "Timeline templates and tracking sheets",
            "Bonus tips and advanced techniques",
            "Lifetime access and updates",
            "30-day money-back guarantee"
          ]}
          columns={2}
          className="mt-20"
        />

        {/* Final CTA */}
        <div className="mx-auto mt-20 max-w-3xl bg-trust-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Life?
          </h3>
          <p className="text-trust-300 mb-8">
            Join thousands who've solved their biggest challenges with our proven guides. 
            Start seeing results in days, not months.
          </p>
          
          <CTAButton
            productId="complete-wellness-bundle"
            price={bundle.price}
            productName={bundle.name}
            size="xl"
            className="max-w-md mx-auto"
          />
          
          <div className="mt-6 flex items-center justify-center gap-8 text-sm text-trust-400">
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2 h-4 w-4" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
