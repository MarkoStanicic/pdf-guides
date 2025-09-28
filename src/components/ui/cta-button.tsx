'use client'

import React, { useState } from 'react'
import { Button } from './button'
import { formatPrice } from '@/lib/utils'
import { Download, ShieldCheck, Clock } from 'lucide-react'

interface CTAButtonProps {
  productId: string
  price: number
  productName: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showFeatures?: boolean
  onCheckout?: () => void
}

export function CTAButton({ 
  productId, 
  price, 
  productName, 
  className,
  size = 'lg',
  showFeatures = true,
  onCheckout 
}: CTAButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      // Call API to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      window.location.href = url
      
      onCheckout?.()
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <Button
        onClick={handleCheckout}
        loading={loading}
        variant="primary"
        size={size}
        className="w-full relative group"
      >
        <Download className="mr-2 h-5 w-5" />
        <span className="font-semibold">
          Get Instant Access - {formatPrice(price)}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-20 transition-opacity rounded-md" />
      </Button>
      
      {showFeatures && (
        <div className="mt-4 flex flex-col sm:flex-row gap-3 text-sm text-trust-600 justify-center">
          <div className="flex items-center justify-center">
            <Download className="mr-1 h-4 w-4 text-success-600" />
            <span>Instant Download</span>
          </div>
          <div className="flex items-center justify-center">
            <ShieldCheck className="mr-1 h-4 w-4 text-success-600" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center justify-center">
            <Clock className="mr-1 h-4 w-4 text-success-600" />
            <span>Lifetime Access</span>
          </div>
        </div>
      )}
      
      <p className="text-center text-xs text-trust-500 mt-3">
        Secure checkout powered by Stripe • No subscription required
      </p>
    </div>
  )
}
