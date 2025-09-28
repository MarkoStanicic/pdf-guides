import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CTAButton } from '@/components/ui/cta-button'
import { getBundle } from '@/lib/products'
import { XCircle, ArrowLeft, HelpCircle, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Checkout Cancelled - Simple Steps Guides',
  description: 'Your checkout was cancelled. No worries - your guides are still waiting for you!',
  robots: { index: false, follow: false }, // Don't index cancel pages
}

export default function CancelPage() {
  const bundle = getBundle()

  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        {/* Cancel Icon */}
        <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-8">
          <XCircle className="h-12 w-12 text-orange-600" />
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl mb-6">
          Checkout Cancelled
        </h1>
        
        <p className="text-lg text-trust-600 mb-8">
          No worries! Your checkout was cancelled and no payment was processed.
        </p>

        {/* Reassurance */}
        <div className="bg-trust-50 border border-trust-200 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-trust-900 mb-4">
            Your Guides Are Still Waiting
          </h2>
          <p className="text-trust-700 mb-4">
            We understand that sometimes you need to think things over. 
            That's totally okay - we're here whenever you're ready!
          </p>
          <p className="text-trust-600 text-sm">
            Remember: All our guides come with a 30-day money-back guarantee, 
            so there's no risk in trying them out.
          </p>
        </div>

        {/* Common Concerns */}
        <div className="text-left bg-primary-50 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-trust-900 mb-6 text-center flex items-center justify-center">
            <HelpCircle className="mr-2 h-6 w-6" />
            Common Concerns We Can Help With:
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-trust-900">💳 Payment Security</h4>
              <p className="text-trust-700">We use Stripe for processing - the same system used by Netflix, Shopify, and millions of businesses worldwide.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-trust-900">❓ Will This Actually Work?</h4>
              <p className="text-trust-700">Our methods are proven and tested. Plus, if you don't see results, we offer a full 30-day refund.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-trust-900">⏰ Do I Need This Right Now?</h4>
              <p className="text-trust-700">The sooner you start, the sooner you'll see results. Why wait another day to solve problems that could be resolved this week?</p>
            </div>
          </div>
        </div>

        {/* Special Offer */}
        <div className="bg-gradient-to-r from-success-600 to-success-700 text-white rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">
            🎯 Last Chance: Complete Bundle
          </h3>
          <p className="text-success-100 mb-6">
            Get all 3 guides now and start transforming your life today. 
            Thousands of people have already succeeded with these methods.
          </p>
          
          <CTAButton
            productId="complete-wellness-bundle"
            price={bundle.price}
            productName={bundle.name}
            size="xl"
            className="max-w-md mx-auto"
          />
        </div>

        {/* Alternative Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Button asChild variant="outline" size="lg" className="h-auto py-4">
            <Link href="/">
              <div className="text-center">
                <ArrowLeft className="mx-auto h-6 w-6 mb-2" />
                <div className="font-semibold">Browse Guides</div>
                <div className="text-sm text-trust-600">See individual options</div>
              </div>
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="h-auto py-4">
            <Link href="/blog">
              <div className="text-center">
                <MessageCircle className="mx-auto h-6 w-6 mb-2" />
                <div className="font-semibold">Read Our Blog</div>
                <div className="text-sm text-trust-600">Free tips and advice</div>
              </div>
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="h-auto py-4">
            <a href="mailto:support@simplestepsguides.com">
              <div className="text-center">
                <HelpCircle className="mx-auto h-6 w-6 mb-2" />
                <div className="font-semibold">Contact Us</div>
                <div className="text-sm text-trust-600">We're here to help</div>
              </div>
            </a>
          </Button>
        </div>

        {/* Final Message */}
        <div className="border-t border-trust-200 pt-8">
          <h3 className="text-lg font-semibold text-trust-900 mb-4">
            We're Here When You're Ready
          </h3>
          <p className="text-trust-600 mb-4">
            Take your time to think it over. Our guides will be here whenever you decide 
            you're ready to take action and solve these problems once and for all.
          </p>
          <div className="text-sm text-trust-500">
            <p>Questions? Email us at <a href="mailto:support@simplestepsguides.com" className="text-primary-600 hover:text-primary-700">support@simplestepsguides.com</a></p>
            <p className="mt-1">We typically respond within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
