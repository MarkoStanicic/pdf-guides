import { FAQItem } from '@/types'

export const SHARED_FAQ: FAQItem[] = [
  {
    id: 'shared-faq-1',
    question: 'How do I get my guide after purchase?',
    answer: 'After checkout, you\'ll instantly receive an email with a download link to your PDF. The link is secure and valid for a limited time. You can also save the file to your device for future use.',
  },
  {
    id: 'shared-faq-2', 
    question: 'Can I open the PDF on my phone or tablet?',
    answer: 'Yes! All guides work on phones, tablets, laptops, and desktops. You can also print them at home if you prefer a physical copy.',
  },
  {
    id: 'shared-faq-3',
    question: 'Do I need a special app to read the guide?',
    answer: 'No — any PDF reader will work (e.g. Adobe Acrobat, Apple Books, Google Drive).',
  },
  {
    id: 'shared-faq-4',
    question: 'Can I print the reward charts, checklists, or trackers?',
    answer: 'Absolutely. They\'re designed to be printed at home. You can print as many copies as you need for personal use.',
  },
  {
    id: 'shared-faq-5',
    question: 'What if I don\'t get the email?',
    answer: 'First, check your spam or promotions folder. If you still don\'t see it within 5 minutes, contact us at support@simplestepsguides.com and we\'ll resend it.',
  },
  {
    id: 'shared-faq-6',
    question: 'Can I share the guide with friends or family?',
    answer: 'The purchase includes a personal-use license only. If someone else wants a copy, please ask them to buy their own — this helps us keep creating affordable guides.',
  },
  {
    id: 'shared-faq-7',
    question: 'What if I\'m not satisfied with my purchase?',
    answer: 'We offer a 30-day money back guarantee. If you follow the guide and don\'t see results, email us at support@simplestepsguides.com for a full refund.',
  },
  {
    id: 'shared-faq-8',
    question: 'Do you sell physical books?',
    answer: 'No, our guides are 100% digital — that\'s how we keep them affordable and instantly accessible worldwide.',
  },
  {
    id: 'shared-faq-9',
    question: 'Is checkout secure?',
    answer: 'Yes, we use Stripe, one of the most trusted payment processors globally. Your information is encrypted and never stored on our servers.',
  },
]

// Helper function to combine product-specific FAQ with shared FAQ
export function combineWithSharedFAQ(productFAQ: FAQItem[]): FAQItem[] {
  return [...productFAQ, ...SHARED_FAQ]
}

