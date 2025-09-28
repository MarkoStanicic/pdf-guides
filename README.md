# Simple Steps Guides

A complete Next.js application for selling PDF guides with Stripe checkout, automated email delivery, and SEO-optimized blog system.

## 🎯 Overview

Simple Steps Guides is a digital product business that sells practical PDF guides for everyday problems:
- **Potty Training in 3 Days** ($12)
- **Stop Snoring in 7 Days** ($9)
- **Fix Dark Circles Naturally** ($10)
- **Complete Bundle** ($19 - Save $12)

## ✨ Features

### 🛒 E-commerce
- Stripe Checkout integration
- Automated webhook handling
- Instant PDF delivery via email
- No user accounts required (frictionless)

### 📝 Content Management
- MDX blog system with rich content
- SEO-optimized pages and blog posts
- Automated sitemap generation
- JSON-LD structured data

### 🎨 Design & UX
- Trust-building design with security badges
- Mobile-responsive layout
- Performance optimized
- Conversion-focused CTAs

### 🔧 Technical
- Next.js 14+ with App Router
- TypeScript for type safety
- TailwindCSS for styling
- CloudFlare R2 or AWS S3 for file storage
- Resend for email delivery

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account
- Resend account
- AWS S3 or CloudFlare R2 bucket

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd simplestepsguides
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see [Configuration](#configuration))

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Visit your application**
   Open [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# You'll also need to set price IDs for each product:
STRIPE_POTTY_TRAINING_PRICE_ID=price_...
STRIPE_STOP_SNORING_PRICE_ID=price_...
STRIPE_DARK_CIRCLES_PRICE_ID=price_...
STRIPE_BUNDLE_PRICE_ID=price_...

# Storage (choose AWS S3 OR CloudFlare R2)
# For AWS S3:
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# For CloudFlare R2:
# R2_ACCESS_KEY_ID=your_r2_access_key
# R2_SECRET_ACCESS_KEY=your_r2_secret_key
# R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
# R2_BUCKET=your-r2-bucket-name

# Email Configuration
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@simplestepsguides.com

# Application Configuration
NEXT_PUBLIC_SITE_URL=https://simplestepsguides.com
NEXT_PUBLIC_SITE_NAME="Simple Steps Guides"
```

### Stripe Setup

1. **Create products in Stripe Dashboard**
   - Potty Training in 3 Days - $12
   - Stop Snoring in 7 Days - $9
   - Fix Dark Circles Naturally - $10
   - Complete Bundle - $19

2. **Set up webhook endpoint**
   - URL: `https://yourdomain.com/api/stripe-webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

3. **Upload PDF files**
   Upload your guide PDFs to your S3/R2 bucket with these file keys:
   - `guides/potty-training-3-days.pdf`
   - `guides/stop-snoring-7-days.pdf`
   - `guides/fix-dark-circles-naturally.pdf`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── checkout/      # Stripe checkout
│   │   └── stripe-webhook/ # Webhook handler
│   ├── blog/              # Blog pages
│   ├── [product-slugs]/   # Product pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   ├── ui/               # UI primitives
│   └── seo/              # SEO components
├── content/              # Blog content (MDX)
│   └── blog/            # Blog posts
├── lib/                 # Utility libraries
│   ├── products.ts      # Product data
│   ├── stripe.ts        # Stripe integration
│   ├── storage.ts       # File storage
│   ├── email.ts         # Email sending
│   └── blog.ts          # Blog utilities
└── types/               # TypeScript types
```

## 📝 Content Management

### Adding Blog Posts

Create new MDX files in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Post description for SEO and previews"
publishedAt: "2024-01-15"
category: "parenting" # parenting, health, beauty, tips
tags: ["tag1", "tag2"]
featured: false # Set to true for featured posts
image: "/blog/your-image.jpg" # Optional
---

# Your Content Here

Write your blog post content using Markdown.

<CTABanner /> <!-- Includes a product CTA in the post -->
```

### Updating Products

Edit `src/lib/products.ts` to modify product information, pricing, features, testimonials, and FAQs.

## 🚢 Deployment

### Hetzner VPS Deployment

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Application Deployment**
   ```bash
   # Clone your repository
   git clone <your-repo>
   cd simplestepsguides
   
   # Install dependencies
   npm install
   
   # Build the application
   npm run build
   
   # Start with PM2
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name simplestepsguides.com www.simplestepsguides.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL Certificate**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d simplestepsguides.com -d www.simplestepsguides.com
   ```

### PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'simplestepsguides',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
```

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript checks

# Deployment
pm2 start ecosystem.config.js  # Start with PM2
pm2 restart simplestepsguides  # Restart app
pm2 logs simplestepsguides     # View logs
```

## 🎯 SEO Features

### Implemented
- ✅ Comprehensive meta tags
- ✅ Open Graph and Twitter Cards
- ✅ JSON-LD structured data
- ✅ Automatic sitemap generation
- ✅ Optimized robots.txt
- ✅ Blog with proper heading structure
- ✅ Image alt tags and optimization

### SEO Checklist
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Optimize Core Web Vitals
- [ ] Add more internal linking
- [ ] Create pillar content strategy

## 🛡️ Security

### Best Practices Implemented
- Environment variables for secrets
- Stripe webhook signature verification
- Secure file storage with pre-signed URLs
- Rate limiting on API routes (recommended to add)
- HTTPS enforcement in production

### Recommendations
- Add rate limiting middleware
- Implement CSP headers
- Regular security audits
- Monitor for suspicious activity

## 📊 Analytics & Monitoring

### Recommended Tools
- **Google Analytics 4** - Traffic and conversion tracking
- **Google Search Console** - SEO monitoring
- **Stripe Dashboard** - Payment analytics
- **PM2 Monitoring** - Application health

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Email: support@simplestepsguides.com
- Documentation: Check this README
- Issues: Create GitHub issues for bugs

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS.