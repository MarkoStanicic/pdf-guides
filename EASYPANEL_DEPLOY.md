# EasyPanel Deployment Guide

## 1. Prepare Your Hetzner Server

1. Create Hetzner server (minimum 2GB RAM recommended)
2. Install EasyPanel following their installation guide
3. Access EasyPanel at `https://your-server-ip:3000`

## 2. Create Application in EasyPanel

1. **Go to Applications → Create App**
2. **App Name**: `simplestepsguides`
3. **Source Type**: Git Repository 
4. **Repository URL**: `https://github.com/yourusername/simplestepsguides.git`
5. **Branch**: `main`
6. **Build Type**: Docker
7. **Dockerfile Path**: `./Dockerfile` (default)

## 3. Configure Environment Variables

In EasyPanel App Settings → Environment Variables, add:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Stripe Keys (LIVE KEYS FOR PRODUCTION!)
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY  
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Stripe Price IDs
STRIPE_POTTY_TRAINING_PRICE_ID=price_YOUR_POTTY_TRAINING_ID
STRIPE_STOP_SNORING_PRICE_ID=price_YOUR_STOP_SNORING_ID
STRIPE_DARK_CIRCLES_PRICE_ID=price_YOUR_DARK_CIRCLES_ID
STRIPE_BUNDLE_PRICE_ID=price_YOUR_BUNDLE_ID

# Email Service
RESEND_API_KEY=re_YOUR_RESEND_API_KEY

# File Storage (R2 or S3)
R2_ACCESS_KEY_ID=YOUR_R2_ACCESS_KEY
R2_SECRET_ACCESS_KEY=YOUR_R2_SECRET_KEY
R2_BUCKET_NAME=YOUR_R2_BUCKET_NAME
R2_ACCOUNT_ID=YOUR_R2_ACCOUNT_ID

# OR AWS S3 (choose one)
# AWS_S3_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY  
# AWS_S3_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
# AWS_S3_BUCKET_NAME=YOUR_S3_BUCKET_NAME
# AWS_S3_REGION=us-east-1
```

## 4. Configure Domain & SSL

1. **In EasyPanel App → Domains**:
   - Add your domain (e.g., `simplestepsguides.com`)
   - Enable SSL (Let's Encrypt)
   - Set port: `3000`

2. **DNS Setup**:
   - Point your domain A record to your server IP
   - Wait for DNS propagation (5-30 minutes)

## 5. Deploy Application

1. Click **Deploy** in EasyPanel
2. Monitor logs for any build errors
3. Once deployed, test at `https://yourdomain.com`

## 6. Post-Deployment Checklist

✅ **Test website loads correctly**  
✅ **Test Stripe checkout flow**  
✅ **Verify webhook endpoint**: `https://yourdomain.com/api/stripe-webhook`  
✅ **Test email delivery**  
✅ **Check all pages load (blog, product pages)**  
✅ **Test mobile responsiveness**

## 7. Update Stripe Webhook URL

**IMPORTANT**: Update your Stripe webhook endpoint:
1. Go to Stripe Dashboard → Webhooks
2. Edit your webhook endpoint URL to: `https://yourdomain.com/api/stripe-webhook`
3. Test webhook delivery

## Troubleshooting

**Build Fails**: Check environment variables are set correctly  
**500 Errors**: Check server logs in EasyPanel  
**Stripe Issues**: Verify live keys and webhook URL  
**Email Issues**: Check Resend API key and domain verification

## Performance Tips

- Monitor server resources in EasyPanel dashboard
- Enable caching if traffic increases  
- Consider CDN for static assets (images, fonts)
- Set up monitoring/alerts for downtime

🚀 **Your site should now be live and ready to sell!**
