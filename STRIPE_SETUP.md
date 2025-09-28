# Stripe Setup Guide

## 1. Create Products & Prices in Stripe Dashboard

### Products to Create:
1. **Potty Training in 3 Days** - $7 
2. **Stop Snoring in 7 Days** - $5
3. **Fix Dark Circles Naturally** - $5  
4. **Complete Wellness Bundle** - $15

### Steps:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Click "Add Product" for each guide:

**Example: Potty Training Guide**
```
Product name: Potty Training in 3 Days
Description: A proven, stress-free method to get your toddler fully potty trained in just 3 days
Price: $7.00 USD (One time)
```

3. **Copy the Price IDs** (starts with `price_xxx`) for each product

## 2. Get Your API Keys

### From Stripe Dashboard:
1. Go to [API Keys](https://dashboard.stripe.com/apikeys)
2. Copy these keys:
   - **Publishable key** (starts with `pk_live_xxx`)
   - **Secret key** (starts with `sk_live_xxx`)

## 3. Set Up Webhook

1. Go to [Webhooks](https://dashboard.stripe.com/webhooks) 
2. Click "Add endpoint"
3. **Endpoint URL**: `https://yourdomain.com/api/stripe-webhook`
4. **Events to send**:
   - `checkout.session.completed`
5. Copy the **Webhook Secret** (starts with `whsec_xxx`)

## 4. Update Environment Variables

Update your `.env.local` file:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY  
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Stripe Price IDs (from step 1)
STRIPE_POTTY_TRAINING_PRICE_ID=price_YOUR_POTTY_TRAINING_PRICE_ID
STRIPE_STOP_SNORING_PRICE_ID=price_YOUR_STOP_SNORING_PRICE_ID
STRIPE_DARK_CIRCLES_PRICE_ID=price_YOUR_DARK_CIRCLES_PRICE_ID
STRIPE_BUNDLE_PRICE_ID=price_YOUR_BUNDLE_PRICE_ID
```

## 5. Test Mode First

**IMPORTANT**: Start with test keys first:
- Use `sk_test_xxx` and `pk_test_xxx` 
- Create test products with same names
- Test full purchase flow
- Switch to live keys only when everything works

## 6. Test Purchase Flow

1. Complete a test purchase
2. Check Stripe Dashboard for payment
3. Verify webhook received in logs  
4. Check email delivery works
5. Test PDF download link

✅ **Ready for production when all tests pass!**
