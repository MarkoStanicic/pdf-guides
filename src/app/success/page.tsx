import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Download, ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Purchase Successful - Check Your Email',
  description: 'Thank you for your purchase! Check your email for download links to your guides.',
  robots: { index: false, follow: false }, // Don't index success pages
}

export default function SuccessPage() {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-success-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="h-12 w-12 text-success-600" />
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold tracking-tight text-trust-900 sm:text-5xl mb-6">
          🎉 Purchase Successful!
        </h1>
        
        <p className="text-lg text-trust-600 mb-8">
          Thank you for choosing Simple Steps Guides! Your order has been processed successfully.
        </p>

        {/* Email Instructions */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-semibold text-trust-900 mb-4">
            Check Your Email
          </h2>
          <p className="text-trust-700 mb-4">
            We've sent your download links to the email address you provided during checkout. 
            The email should arrive within 5 minutes.
          </p>
          <p className="text-sm text-trust-600">
            Don't see the email? Check your spam/promotions folder, or contact us for help.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="text-left bg-trust-50 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-trust-900 mb-6 text-center">
            What Happens Next:
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm font-semibold text-primary-700">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-trust-900">Download Your Guides</h4>
                <p className="text-trust-600">Click the download links in your email to get your PDF guides instantly.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm font-semibold text-primary-700">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-trust-900">Save to Your Device</h4>
                <p className="text-trust-600">Save the PDFs to your phone, tablet, or computer for easy access anytime.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm font-semibold text-primary-700">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-trust-900">Start Following the Steps</h4>
                <p className="text-trust-600">Begin implementing the methods today and see results within days!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-accent-800 mb-2">⏰ Important:</h3>
          <p className="text-accent-700 text-sm">
            Download links expire after 15 minutes for security. If you miss the window, 
            contact us and we'll send fresh links immediately.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild variant="primary" size="lg">
            <Link href="/blog">
              <BookOpen className="mr-2 h-5 w-5" />
              Read Our Blog for More Tips
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowRight className="mr-2 h-5 w-5" />
              Back to Homepage
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="border-t border-trust-200 pt-8">
          <h3 className="text-lg font-semibold text-trust-900 mb-4">
            Need Help?
          </h3>
          <p className="text-trust-600 mb-4">
            If you have any questions or need assistance, we're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a 
              href="mailto:support@simplestepsguides.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              📧 support@simplestepsguides.com
            </a>
            <span className="hidden sm:inline text-trust-400">•</span>
            <span className="text-trust-600">
              💰 30-Day Money-Back Guarantee
            </span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 p-6 bg-gradient-to-r from-success-50 to-primary-50 rounded-lg">
          <p className="text-trust-700 font-medium mb-2">
            🎉 You've joined over 1,000 people who've transformed their lives with our guides!
          </p>
          <p className="text-trust-600 text-sm">
            Share your success story with us - we love hearing about your results!
          </p>
        </div>
      </div>
    </div>
  )
}
