import { Product, Bundle } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id: 'potty-training-3-days',
    name: 'Potty Training in 3 Days',
    slug: 'potty-training',
    description:
      'A proven, stress-free method to get your toddler fully potty trained in just 3 days. No more accidents, no more diapers!',
    price: 7,
    stripePrice: '$7',
    stripePriceId: process.env.STRIPE_POTTY_TRAINING_PRICE_ID || '',
    fileKey: 'guides/potty-training-3-days.pdf',
    category: 'parenting',
    tags: ['potty training', 'toddler', 'parenting', 'diapers'],
    features: [
      'Step-by-step 3-day method that actually works',
      'How to prepare your child mentally and physically',
      'Troubleshooting guide for common setbacks',
      'Night training strategies included',
      'Reward systems and positive reinforcement techniques',
      'What to do if your child resists',
      'Shopping checklist for supplies needed',
      'Daily schedule templates for all 3 days',
    ],
    testimonials: [
      {
        id: 'pt-1',
        name: 'Sarah M.',
        content:
          "I was skeptical but desperate. My 2.5-year-old was completely potty trained by day 3! No more diaper budget eating our savings.",
        rating: 5,
        verified: true,
      },
      {
        id: 'pt-2',
        name: 'Mike D.',
        content:
          'This method saved our sanity. Clear instructions, realistic expectations, and it actually worked for our stubborn toddler.',
        rating: 5,
        verified: true,
      },
      {
        id: 'pt-3',
        name: 'Jennifer L.',
        content:
          "Worth every penny. We tried everything else first - this is the only thing that worked. Wish I'd found it sooner!",
        rating: 5,
        verified: true,
      },
    ],
    faq: [
      {
        id: 'pt-faq-1',
        question: 'What age is this method suitable for?',
        answer:
          'This method works best for children between 20 months to 4 years old who show signs of readiness. The guide includes a readiness checklist.',
      },
      {
        id: 'pt-faq-2',
        question: 'What if my child has accidents after the 3 days?',
        answer:
          'The guide covers this! Some children need a few more days to fully master it. We provide troubleshooting steps for common setbacks.',
      },
      {
        id: 'pt-faq-3',
        question: 'Do I need to stay home for 3 days straight?',
        answer:
          'Yes, the method requires your full attention and consistency for the initial 3 days. Think of it as an investment in your future freedom!',
      },
      {
        id: 'pt-faq-4',
        question: 'Does this work for night training too?',
        answer:
          'The guide focuses on daytime training first, but includes bonus strategies for transitioning to night training once daytime is mastered.',
      },
    ],
    seoTitle: 'Potty Training in 3 Days - Proven Method That Works | Simple Steps Guides',
    seoDescription:
      'Get your toddler fully potty trained in just 3 days with our proven, stress-free method. No more accidents, no more diapers. Instant download PDF guide.',
  },
  {
    id: 'stop-snoring-7-days',
    name: 'Stop Snoring in 7 Days',
    slug: 'stop-snoring',
    description:
      'Natural, scientifically-backed techniques to eliminate snoring in just one week. Better sleep for you and your partner.',
    price: 5,
    stripePrice: '$5',
    stripePriceId: process.env.STRIPE_STOP_SNORING_PRICE_ID || '',
    fileKey: 'guides/stop-snoring-7-days.pdf',
    category: 'health',
    tags: ['snoring', 'sleep', 'health', 'natural remedies'],
    features: [
      '7-day progressive treatment plan',
      'Identify your specific type of snoring',
      'Natural throat and tongue exercises',
      'Sleep position optimization techniques',
      'Breathing exercises for better airflow',
      'Diet modifications that reduce snoring',
      'Environmental factors checklist',
      'When to see a doctor (red flags guide)',
    ],
    testimonials: [
      {
        id: 'ss-1',
        name: 'Robert T.',
        content:
          "My wife can finally sleep through the night! The exercises seemed weird at first but they actually work. Snoring stopped by day 5.",
        rating: 5,
        verified: true,
      },
      {
        id: 'ss-2',
        name: 'Linda K.',
        content:
          'Simple exercises, easy to follow. I was snoring so loud I woke myself up. Not anymore! This guide is a life changer.',
        rating: 5,
        verified: true,
      },
      {
        id: 'ss-3',
        name: 'David M.',
        content:
          'I tried everything - strips, sprays, devices. These natural methods are the only thing that worked long-term.',
        rating: 5,
        verified: true,
      },
    ],
    faq: [
      {
        id: 'ss-faq-1',
        question: 'Will this work for severe snoring?',
        answer:
          'The guide covers mild to moderate snoring. For severe cases or sleep apnea, we include guidance on when to consult a medical professional.',
      },
      {
        id: 'ss-faq-2',
        question: 'How long do I need to do the exercises?',
        answer:
          'Most people see results within 3-5 days. The exercises take just 10-15 minutes daily and become a simple bedtime routine.',
      },
      {
        id: 'ss-faq-3',
        question: 'Are the methods completely natural?',
        answer:
          'Yes! All techniques are natural, drug-free, and based on proven medical research. No devices, sprays, or supplements required.',
      },
      {
        id: 'ss-faq-4',
        question: 'What if the snoring comes back?',
        answer:
          'The guide includes maintenance routines to prevent snoring from returning. Most people only need to do the exercises 2-3 times per week after initial success.',
      },
    ],
    seoTitle: 'Stop Snoring in 7 Days - Natural Methods That Work | Simple Steps Guides',
    seoDescription:
      'Eliminate snoring naturally in just 7 days with proven techniques. Better sleep for you and your partner. Instant download PDF guide with exercises.',
  },
  {
    id: 'fix-dark-circles-naturally',
    name: 'Fix Dark Circles Naturally',
    slug: 'dark-circles',
    description:
      'Proven natural remedies to eliminate dark circles and under-eye bags. Look younger and more refreshed in just weeks.',
    price: 5,
    stripePrice: '$5',
    stripePriceId: process.env.STRIPE_DARK_CIRCLES_PRICE_ID || '',
    fileKey: 'guides/fix-dark-circles-naturally.pdf',
    category: 'beauty',
    tags: ['dark circles', 'beauty', 'skincare', 'natural remedies'],
    features: [
      'Identify the root cause of your dark circles',
      'DIY natural remedies using kitchen ingredients',
      'Professional techniques you can do at home',
      'Makeup tips to conceal while healing',
      'Lifestyle changes for long-term results',
      '3-week treatment protocol',
      'Before and after photo tracking system',
      'Maintenance routine to prevent recurrence',
    ],
    testimonials: [
      {
        id: 'dc-1',
        name: 'Amanda S.',
        content:
          "I've struggled with dark circles since college. These natural remedies actually work - I can see the difference in just 2 weeks!",
        rating: 5,
        verified: true,
      },
      {
        id: 'dc-2',
        name: 'Jessica R.',
        content:
          'No more expensive eye creams that do nothing. These simple kitchen remedies gave me better results than products costing $100+.',
        rating: 5,
        verified: true,
      },
      {
        id: 'dc-3',
        name: 'Marie C.',
        content:
          'Finally look refreshed in the morning! The lifestyle tips made a huge difference. People keep asking if I got botox.',
        rating: 5,
        verified: true,
      },
    ],
    faq: [
      {
        id: 'dc-faq-1',
        question: 'How long until I see results?',
        answer:
          'Most people notice improvement within 1-2 weeks. Full results typically appear after 3-4 weeks of consistent application of the methods.',
      },
      {
        id: 'dc-faq-2',
        question: 'Will this work for genetic dark circles?',
        answer:
          'Yes! The guide addresses different types of dark circles including genetic ones. While genetic circles may not disappear completely, they can be significantly reduced.',
      },
      {
        id: 'dc-faq-3',
        question: 'Are all ingredients easy to find?',
        answer:
          'Absolutely! Most remedies use common kitchen ingredients or items easily found at any grocery store or pharmacy.',
      },
      {
        id: 'dc-faq-4',
        question: 'Is this safe for sensitive skin?',
        answer:
          'The guide includes patch test instructions and gentler alternatives for sensitive skin. All remedies are natural and generally well-tolerated.',
      },
    ],
    seoTitle: 'Fix Dark Circles Naturally - Proven Remedies That Work | Simple Steps Guides',
    seoDescription:
      'Eliminate dark circles and under-eye bags naturally with proven remedies. Look younger and refreshed in weeks. Instant download PDF guide.',
  },
]

export const BUNDLE: Bundle = {
  id: 'complete-wellness-bundle',
  name: 'Complete Wellness Bundle',
  description:
    'Get all 3 guides and save $12! Everything you need for better parenting, health, and beauty.',
  products: ['potty-training-3-days', 'stop-snoring-7-days', 'fix-dark-circles-naturally'],
  price: 15,
  stripePrice: '$15',
  stripePriceId: process.env.STRIPE_BUNDLE_PRICE_ID || '',
  discount: 39, // Save $12 on individual purchases
  seoTitle: 'Complete Wellness Bundle - All 3 Guides for $19 | Simple Steps Guides',
  seoDescription:
    'Get all 3 proven guides - Potty Training, Stop Snoring, Fix Dark Circles - for just $19. Save $12 on individual purchases. Instant download.',
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(product => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter(product => product.category === category)
}

export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getBundle(): Bundle {
  return BUNDLE
}

export function calculateBundleSavings(): number {
  const bundlePrice = BUNDLE.price
  const individualTotal = BUNDLE.products.reduce((total, productId) => {
    const product = getProductById(productId)
    return total + (product?.price || 0)
  }, 0)
  return individualTotal - bundlePrice
}
