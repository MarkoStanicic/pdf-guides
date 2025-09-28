import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { generateShortLivedDownloadUrl, getFileKeyForProduct } from '@/lib/storage'
import { sendDownloadEmail } from '@/lib/email'
import { getProductById, getBundle } from '@/lib/products'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!webhookSecret) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('Missing stripe-signature header')
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const event = constructWebhookEvent(body, signature, webhookSecret!)

    console.log('Webhook event received:', event.type)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('Processing successful checkout:', session.id)
        
        // Get product information from metadata
        const productId = session.metadata?.productId
        const customerEmail = session.customer_details?.email

        if (!productId || !customerEmail) {
          console.error('Missing productId or customer email in session:', {
            productId,
            customerEmail,
            sessionId: session.id,
          })
          return NextResponse.json(
            { error: 'Missing required session data' },
            { status: 400 }
          )
        }

        // Handle bundle vs single product
        if (productId === 'complete-wellness-bundle') {
          await handleBundlePurchase(customerEmail, session.id)
        } else {
          await handleSingleProductPurchase(productId, customerEmail, session.id)
        }

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        // Additional processing if needed
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)
        // Handle failed payment if needed
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    
    return NextResponse.json(
      { 
        error: 'Webhook handler failed',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

async function handleSingleProductPurchase(
  productId: string, 
  customerEmail: string,
  _sessionId: string
) {
  try {
    // Get product details
    const product = getProductById(productId)
    if (!product) {
      throw new Error(`Product not found: ${productId}`)
    }

    // Generate download URL
    const fileKey = getFileKeyForProduct(productId)
    const { url: downloadUrl, expiresAt } = await generateShortLivedDownloadUrl(
      fileKey,
      `${product.name}.pdf`
    )

    // Send email with download link
    await sendDownloadEmail({
      to: customerEmail,
      product,
      downloadUrl,
      expiresAt,
    })

    console.log(`Download email sent for product ${productId} to ${customerEmail}`)
  } catch (error) {
    console.error(`Failed to handle single product purchase for ${productId}:`, error)
    throw error
  }
}

async function handleBundlePurchase(
  customerEmail: string,
  _sessionId: string
) {
  try {
    const bundle = getBundle()
    
    // Send separate emails for each product in the bundle
    for (const productId of bundle.products) {
      const product = getProductById(productId)
      if (!product) {
        console.error(`Product not found in bundle: ${productId}`)
        continue
      }

      try {
        // Generate download URL for each product
        const fileKey = getFileKeyForProduct(productId)
        const { url: downloadUrl, expiresAt } = await generateShortLivedDownloadUrl(
          fileKey,
          `${product.name}.pdf`
        )

        // Send individual email for each guide
        await sendDownloadEmail({
          to: customerEmail,
          product,
          downloadUrl,
          expiresAt,
        })

        console.log(`Bundle item email sent for ${productId} to ${customerEmail}`)
      } catch (error) {
        console.error(`Failed to send email for bundle item ${productId}:`, error)
        // Continue with other products even if one fails
      }
    }

    console.log(`Bundle purchase processed for ${customerEmail}`)
  } catch (error) {
    console.error('Failed to handle bundle purchase:', error)
    throw error
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
