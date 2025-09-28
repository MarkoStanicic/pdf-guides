## Production Deployment Runbook (Hetzner + EasyPanel)

### 1) Prerequisites
- Domain DNS A record → server IP (e.g., `simplestepsguides.com` and `www` if needed)
- AWS S3 private bucket with objects:
  - `guides/potty-training-3-days.pdf`
  - `guides/stop-snoring-7-days.pdf`
  - `guides/fix-dark-circles-naturally.pdf`
- IAM user with least-privilege (ListBucket/GetObject on the bucket)
- Resend account with verified domain (SPF/DKIM)
- Stripe LIVE products and prices created

### 2) Stripe LIVE setup
1. Products (one-time USD):
   - Potty Training in 3 Days — $7
   - Stop Snoring in 7 Days — $5
   - Fix Dark Circles Naturally — $5
   - Complete Wellness Bundle — $15
   Copy each Price ID (`price_...`).
2. Webhook endpoint (LIVE):
   - URL: `https://simplestepsguides.com/api/stripe-webhook`
   - Event: `checkout.session.completed`
   - Copy Signing secret (`whsec_...`).

### 3) Environment variables (production)
Add these in EasyPanel → App → Settings → Environment. Use `.env.production.example` as a template.

Required:
- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://simplestepsguides.com`
- `NEXT_PUBLIC_SITE_NAME=Simple Steps Guides`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
- `STRIPE_SECRET_KEY=sk_live_...`
- `STRIPE_WEBHOOK_SECRET=whsec_...`
- `STRIPE_POTTY_TRAINING_PRICE_ID=price_...`
- `STRIPE_STOP_SNORING_PRICE_ID=price_...`
- `STRIPE_DARK_CIRCLES_PRICE_ID=price_...`
- `STRIPE_BUNDLE_PRICE_ID=price_...`
- `AWS_ACCESS_KEY_ID=...`
- `AWS_SECRET_ACCESS_KEY=...`
- `AWS_REGION=us-east-1`
- `AWS_S3_BUCKET=simplesteps-guides`
- `RESEND_API_KEY=re_...`
- `FROM_EMAIL=noreply@simplestepsguides.com`

Optional:
- `NEXT_TELEMETRY_DISABLED=1`

### 4) Deploy with EasyPanel
1. Create app → Source: Git (or Docker registry) → Build type: Docker → Expose port 3000
2. Add all environment variables (above)
3. Deploy the app
4. Domains → Add `simplestepsguides.com` → Enable Let’s Encrypt SSL
5. Redeploy if prompted

### 5) Post-deploy checks
- Visit homepage (should be fast, no console errors)
- Blog pages render, CTAs show updated $5–$7 pricing
- `/sitemap.xml` and `/robots.txt` reachable
- SEO tags present (view page source → Open Graph / JSON-LD)

### 6) Live purchase smoke test (refund after)
1. Buy the $5 guide
2. Verify:
   - Stripe Dashboard (LIVE) shows the charge
   - Webhook delivery: 200 OK
   - Resend shows email sent successfully
   - Email contains a 15‑min S3 presigned link that downloads

If failure:
- Confirm `STRIPE_WEBHOOK_SECRET` matches the LIVE endpoint
- Check application logs in EasyPanel
- Check Resend Activity for bounces/errors

### 7) Security quick-audit
- HTTPS only, secrets only in server env (never client)
- Stripe webhook signature verification enabled
- S3 bucket private, server creates short-lived presigned URLs
- Least-privilege IAM policy
- Keep dependencies updated and monitor logs

### 8) Operations
- Refund test charges in Stripe after verification
- Set up Stripe email receipts if desired (Dashboard → Settings → Email)
- Consider daily backups of repository and environment values

# Deployment Guide

This guide covers multiple deployment options for Simple Steps Guides.

## 🏗️ Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Stripe account with products and webhook configured
- [ ] File storage setup (AWS S3 or CloudFlare R2)
- [ ] Resend account for email delivery
- [ ] Domain name registered and DNS configured
- [ ] SSL certificate ready (or auto-generated)
- [ ] All PDF files uploaded to storage bucket
- [ ] Environment variables ready

## 🚀 Deployment Options

### Option 1: Hetzner VPS (Recommended)

Best for: Full control, cost-effective, high performance

#### Step 1: Server Setup
```bash
# Connect to your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install nginx

# Install Certbot for SSL
apt install certbot python3-certbot-nginx
```

#### Step 2: Application Setup
```bash
# Create app directory
mkdir -p /var/www/simplestepsguides
cd /var/www/simplestepsguides

# Clone repository
git clone <your-repo-url> .

# Install dependencies
npm install

# Create environment file
nano .env.local
# (Copy your environment variables)

# Build the application
npm run build

# Create logs directory
mkdir -p logs
```

#### Step 3: PM2 Setup
```bash
# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
# Follow the instructions to run the generated command
```

#### Step 4: Nginx Configuration
```bash
# Create Nginx config
nano /etc/nginx/sites-available/simplestepsguides
```

```nginx
server {
    listen 80;
    server_name simplestepsguides.com www.simplestepsguides.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'; frame-ancestors 'self';" always;

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
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private must-revalidate any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
```

```bash
# Enable the site
ln -s /etc/nginx/sites-available/simplestepsguides /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Get SSL certificate
certbot --nginx -d simplestepsguides.com -d www.simplestepsguides.com
```

#### Step 5: Maintenance Scripts
Create useful scripts for deployment:

```bash
# Create update script
nano /var/www/simplestepsguides/update.sh
```

```bash
#!/bin/bash
cd /var/www/simplestepsguides
git pull origin main
npm install
npm run build
pm2 restart simplestepsguides
echo "Deployment completed successfully!"
```

```bash
chmod +x update.sh
```

### Option 2: Vercel (Easiest)

Best for: Quick deployment, automatic scaling, zero maintenance

#### Setup
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

#### Limitations
- Serverless functions have time limits (may affect large file processing)
- More expensive at scale
- Less control over server configuration

### Option 3: DigitalOcean App Platform

Best for: Managed deployment with control

#### Setup
1. Create new app in DigitalOcean
2. Connect GitHub repository
3. Configure environment variables
4. Set build and run commands:
   - Build: `npm run build`
   - Run: `npm start`

### Option 4: Docker Deployment

Best for: Containerized environments, Kubernetes, scalability

#### Build and Run
```bash
# Build the image
docker build -t simplestepsguides .

# Run container
docker run -p 3000:3000 --env-file .env.local simplestepsguides
```

#### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/simplestepsguides
          git pull origin main
          npm install
          npm run build
          pm2 restart simplestepsguides
```

## 🛡️ Security Considerations

### Server Hardening
```bash
# Update packages regularly
apt update && apt upgrade

# Setup firewall
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Secure SSH
nano /etc/ssh/sshd_config
# Set PermitRootLogin no
# Set PasswordAuthentication no
systemctl restart ssh

# Install fail2ban
apt install fail2ban
```

### SSL/TLS Configuration
- Use strong SSL configuration
- Enable HSTS headers
- Configure secure cipher suites
- Set up automatic certificate renewal

### Monitoring Setup
```bash
# Install htop for system monitoring
apt install htop

# Setup log rotation
nano /etc/logrotate.d/simplestepsguides
```

```
/var/www/simplestepsguides/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    postrotate
        pm2 reload simplestepsguides > /dev/null
    endscript
}
```

## 📊 Performance Optimization

### Server-level Optimizations
- Enable Nginx gzip compression
- Set up proper caching headers
- Configure connection pooling
- Monitor memory usage with PM2

### Application-level Optimizations
- Enable Next.js image optimization
- Implement proper caching strategies
- Optimize bundle size
- Use CDN for static assets

## 🚨 Troubleshooting

### Common Issues

#### Application Won't Start
```bash
# Check PM2 logs
pm2 logs simplestepsguides

# Check system resources
htop

# Restart application
pm2 restart simplestepsguides
```

#### SSL Certificate Issues
```bash
# Check certificate status
certbot certificates

# Renew certificates
certbot renew --dry-run

# Force renewal
certbot renew --force-renewal
```

#### Database Connection Issues
- Verify environment variables
- Check network connectivity
- Confirm database credentials

### Backup and Recovery

#### Application Backup
```bash
# Create backup script
nano /root/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf "$BACKUP_DIR/app_$DATE.tar.gz" /var/www/simplestepsguides

# Backup environment variables
cp /var/www/simplestepsguides/.env.local "$BACKUP_DIR/env_$DATE.backup"

# Remove old backups (keep last 30 days)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
chmod +x /root/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /root/backup.sh
```

## 📞 Support and Monitoring

### Health Checks
Create API endpoint for health monitoring:
```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  })
}
```

### Monitoring Tools
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance monitoring**: New Relic, DataDog
- **Log management**: Loggly, Papertrail

This completes your deployment guide. Choose the option that best fits your technical requirements and budget.
