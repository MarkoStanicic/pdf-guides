import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { getProductById, getBundle } from '@/lib/products'

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if it's the bundle or a single product
    let product
    let priceId: string

    if (productId === 'complete-wellness-bundle') {
      const bundle = getBundle()
      product = {
        id: bundle.id,
        name: bundle.name,
        price: bundle.price,
      }
      priceId = bundle.stripePriceId
    } else {
      product = getProductById(productId)
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      priceId = product.stripePriceId
    }

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID not configured for this product' },
        { status: 500 }
      )
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    // Create checkout session
    const session = await createCheckoutSession({
      priceId,
      productId: product.id,
      successUrl: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/cancel`,
      metadata: {
        productId: product.id,
        productName: product.name,
      },
    })

    return NextResponse.json({
      id: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
