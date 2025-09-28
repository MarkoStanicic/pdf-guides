import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CTAButton } from '@/components/ui/cta-button'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { getAllProducts, getBundle, calculateBundleSavings } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { Download, Shield, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const products = getAllProducts()
  const bundle = getBundle()
  const savings = calculateBundleSavings()

  // Combined testimonials from all products
  const allTestimonials = products.flatMap(p => p.testimonials).slice(0, 6)

  // General FAQs for the homepage
  const homepageFAQs = [
    {
      id: 'faq-1',
      question: 'How quickly will I see results?',
      answer: 'Our guides are designed for quick results. Most people see improvement within 3-7 days when following the step-by-step instructions consistently.',
    },
    {
      id: 'faq-2',
      question: 'What if the guide doesn\'t work for me?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your results, contact us for a full refund - no questions asked.',
    },
    {
      id: 'faq-3',
      question: 'Are these methods safe and natural?',
      answer: 'Absolutely! All our methods are natural, drug-free, and based on proven research. We include safety guidelines and when to consult professionals.',
    },
    {
      id: 'faq-4',
      question: 'How do I get my guides after purchase?',
      answer: 'Immediately after purchase, you\'ll receive an email with download links. The guides are instant PDF downloads that work on any device.',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-6xl">
              Solve Everyday Problems with{' '}
              <span className="text-primary-600">Simple Steps</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-trust-600 sm:text-xl">
              Get instant access to proven, step-by-step guides that actually work. 
              No fluff, no complicated theories - just practical solutions that get results.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild variant="primary" size="xl">
                <Link href="#guides">
                  See Our Guides
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/pricing">
                  Bundle Deal - Save ${savings}
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-trust-600">
              <div className="flex items-center">
                <Download className="mr-2 h-5 w-5 text-success-600" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-success-600" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-success-600" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-accent-500 fill-current" />
                <span>1000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-trust-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              Tired of Problems That Never Get Solved?
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              You've tried everything - YouTube videos, blog posts, asking friends. 
              But nothing gives you the complete, step-by-step solution you need.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-red-800 mb-4">
                  ❌ What Doesn't Work
                </h3>
                <ul className="space-y-3 text-red-700">
                  <li>• Generic advice that doesn't fit your situation</li>
                  <li>• Scattered information across multiple sources</li>
                  <li>• Complex theories without practical steps</li>
                  <li>• "Tips" that barely scratch the surface</li>
                  <li>• No clear timeline or expectations</li>
                </ul>
              </div>
              
              <div className="bg-success-50 border border-success-200 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-success-800 mb-4">
                  ✅ Our Solution
                </h3>
                <ul className="space-y-3 text-success-700">
                  <li>• Complete step-by-step methods that work</li>
                  <li>• Everything in one comprehensive guide</li>
                  <li>• Practical actions you can start today</li>
                  <li>• Real solutions with proven results</li>
                  <li>• Clear timelines and what to expect</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="guides" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-trust-900 sm:text-4xl">
              Our Proven Guides
            </h2>
            <p className="mt-6 text-lg leading-8 text-trust-600">
              Each guide is a complete solution designed to get you results fast.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-trust-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full capitalize">
                    {product.category}
                  </span>
                  <span className="text-2xl font-bold text-trust-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-trust-900 mb-3">
                  {product.name}
                </h3>
                
                <p className="text-trust-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-trust-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-trust-600">
                        <CheckCircle className="mr-2 h-4 w-4 text-success-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-sm text-trust-500">
                        + {product.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <CTAButton
                    productId={product.id}
                    price={product.price}
                    productName={product.name}
                    size="md"
                    showFeatures={false}
                  />
                  
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/${product.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bundle CTA */}
          <div className="mx-auto mt-16 max-w-3xl bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Get All 3 Guides & Save ${savings}!
            </h3>
            <p className="text-primary-100 mb-6">
              Complete wellness bundle - everything you need for parenting, health, and beauty success.
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-3xl font-bold">{formatPrice(bundle.price)}</span>
              <span className="text-lg text-primary-200 line-through">
                {formatPrice(products.reduce((sum, p) => sum + p.price, 0))}
              </span>
            </div>
            <CTAButton
              productId="complete-wellness-bundle"
              price={bundle.price}
              productName={bundle.name}
              size="xl"
              showFeatures={false}
              className="max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials 
        testimonials={allTestimonials}
        title="Real Results from Real People"
        description="Join thousands who've solved their problems with our guides"
        className="bg-trust-50"
      />

      {/* Features/Benefits */}
      <Features 
        title="Why Choose Simple Steps Guides?"
        features={[
          {
            title: "Proven Methods",
            description: "Every technique is tested and verified to work",
            icon: <Shield className="h-6 w-6 text-primary-600" />
          },
          {
            title: "Step-by-Step Instructions", 
            description: "Clear, easy-to-follow guides anyone can use",
            icon: <CheckCircle className="h-6 w-6 text-success-600" />
          },
          {
            title: "Instant Download",
            description: "Get your guide immediately after purchase",
            icon: <Download className="h-6 w-6 text-accent-600" />
          },
          {
            title: "30-Day Guarantee",
            description: "Not satisfied? Get your money back, no questions asked",
            icon: <Shield className="h-6 w-6 text-success-600" />
          },
          {
            title: "Lifetime Access",
            description: "Download once, keep forever on all your devices",
            icon: <Clock className="h-6 w-6 text-primary-600" />
          },
          {
            title: "Complete Solutions",
            description: "Everything you need in one comprehensive guide",
            icon: <Star className="h-6 w-6 text-accent-500" />
          }
        ]}
        columns={3}
        showCheckmark={false}
      />

      {/* FAQ */}
      <FAQ 
        items={homepageFAQs}
        title="Common Questions"
        description="Everything you need to know about our guides"
        className="bg-trust-50"
      />

      {/* Final CTA */}
      <section className="py-20 bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Solve Your Problems?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              Join thousands who've transformed their lives with our proven guides. 
              Start seeing results in just days, not months.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton
                productId="complete-wellness-bundle"
                price={bundle.price}
                productName="Complete Bundle"
                size="xl"
                showFeatures={false}
                className="bg-white"
              />
              
              <Button asChild variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="#guides">
                  View Individual Guides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}