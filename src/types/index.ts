export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stripePrice: string
  stripePriceId: string
  fileKey: string
  features: string[]
  testimonials: Testimonial[]
  faq: FAQItem[]
  category: 'parenting' | 'health' | 'beauty'
  tags: string[]
  seoTitle: string
  seoDescription: string
  ogImage?: string
}

export interface Testimonial {
  id: string
  name: string
  avatar?: string
  content: string
  rating: number
  verified?: boolean
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  image?: string
  category: string
  tags: string[]
  readingTime: number
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
}

export interface EmailTemplate {
  subject: string
  html: string
  text?: string
}

export interface CheckoutData {
  productId: string
  priceId: string
  quantity?: number
  metadata?: Record<string, string>
}

export interface DownloadLink {
  url: string
  expiresAt: string
}

export interface Bundle {
  id: string
  name: string
  description: string
  products: string[] // Product IDs
  price: number
  stripePrice: string
  stripePriceId: string
  discount: number // percentage
  seoTitle: string
  seoDescription: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    facebook: string
    pinterest: string
  }
}

export interface NavigationItem {
  name: string
  href: string
  external?: boolean
}

export interface CheckoutSession {
  id: string
  url: string
}

export interface StripeWebhookEvent {
  id: string
  type: string
  data: {
    object: any
  }
}
