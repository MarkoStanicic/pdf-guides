'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Menu, X, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Guides', href: '/#guides' },
  { name: 'Bundle', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
]

const products = [
  { name: 'Potty Training in 3 Days', href: '/potty-training' },
  { name: 'Stop Snoring in 7 Days', href: '/stop-snoring' },
  { name: 'Fix Dark Circles Naturally', href: '/dark-circles' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-trust-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-trust-900">
              Simple Steps Guides
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-trust-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 text-trust-900 hover:text-primary-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild variant="primary" size="sm">
            <Link href="/pricing">
              Get All Guides - $19
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'lg:hidden',
        mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'
      )}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-trust-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-trust-900">
                Simple Steps Guides
              </span>
            </Link>
            <Button
              variant="ghost"
              className="-m-2.5 rounded-md p-2.5 text-trust-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-trust-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-trust-900 hover:bg-trust-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="space-y-2 py-6">
                <div className="text-sm font-medium text-trust-500 px-3 mb-2">Our Guides</div>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-trust-700 hover:bg-trust-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
              
              <div className="py-6">
                <Button asChild variant="primary" className="w-full">
                  <Link href="/pricing">
                    Get All Guides - $19
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
