import { Product, BlogPost } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://simplestepsguides.com'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Simple Steps Guides'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Practical PDF guides that solve everyday problems. Proven methods for potty training, stopping snoring, and fixing dark circles naturally.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0123', // Update with real phone number
      contactType: 'customer service',
      email: 'support@simplestepsguides.com',
    },
    sameAs: [
      'https://twitter.com/simplestepsguides',
      'https://facebook.com/simplestepsguides',
      'https://pinterest.com/simplestepsguides',
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Get instant access to proven, step-by-step guides that solve everyday problems. Potty training, stop snoring, fix dark circles naturally - all with our 30-day guarantee.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.ogImage || `${SITE_URL}/products/${product.slug}.jpg`,
    url: `${SITE_URL}/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: product.testimonials.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: product.testimonials.map(testimonial => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: testimonial.content,
    })),
  }
}

export function generateBundleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Complete Wellness Bundle',
    description: 'Get all 3 proven guides and save $12! Everything you need for better parenting, health, and beauty.',
    image: `${SITE_URL}/products/bundle.jpg`,
    url: `${SITE_URL}/pricing`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    category: 'Health & Wellness',
    offers: {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/blog/default.jpg`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.content.split(' ').length,
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqItems: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
