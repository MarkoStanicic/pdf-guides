import React from 'react'
import Link from 'next/link'
import { BookOpen, Mail, Shield, ArrowRight } from 'lucide-react'

const navigation = {
  guides: [
    { name: 'Potty Training in 3 Days', href: '/potty-training' },
    { name: 'Stop Snoring in 7 Days', href: '/stop-snoring' },
    { name: 'Fix Dark Circles Naturally', href: '/dark-circles' },
    { name: 'Complete Bundle', href: '/pricing' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refunds' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-trust-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">
                Simple Steps Guides
              </span>
            </div>
            <p className="text-sm leading-6 text-trust-300">
              Practical, step-by-step guides that solve everyday problems. No fluff, just results.
            </p>
            <div className="flex space-x-6">
              <a
                href="mailto:support@simplestepsguides.com"
                className="text-trust-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center text-sm text-trust-300">
                <Shield className="mr-2 h-4 w-4 text-success-400" />
                <span>Secure Stripe Checkout</span>
              </div>
              <div className="flex items-center text-sm text-trust-300">
                <Shield className="mr-2 h-4 w-4 text-success-400" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Our Guides</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.guides.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-trust-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-trust-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-trust-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-trust-300">
                  Get weekly tips and updates.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-trust-400 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:w-56 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-trust-800 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-trust-400">
              &copy; 2024 Simple Steps Guides. All rights reserved.
            </p>
            <p className="mt-4 text-xs leading-5 text-trust-400 sm:mt-0">
              Made with ❤️ for people who want real results
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
