import Stripe from 'stripe'
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
}

// Initialize Stripe on the server  
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
})

// Initialize Stripe on the client
let stripePromise: Promise<StripeJS | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export interface CreateCheckoutSessionParams {
  priceId: string
  productId: string
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  metadata?: Record<string, string>
}

export async function createCheckoutSession({
  priceId,
  productId,
  successUrl,
  cancelUrl,
  customerEmail,
  metadata = {},
}: CreateCheckoutSessionParams) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        productId,
        ...metadata,
      },
      payment_intent_data: {
        metadata: {
          productId,
          ...metadata,
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string | string[],
  webhookSecret: string
) {
  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw new Error('Invalid webhook signature')
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    })
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    throw new Error('Failed to retrieve checkout session')
  }
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId)
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    throw new Error('Failed to retrieve payment intent')
  }
}

// Utility functions for formatting
export function formatAmountForDisplay(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatAmountFromStripe(amount: number, currency: string = 'usd'): number {
  return Math.round(amount / 100)
}
