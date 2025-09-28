import { Resend } from 'resend'
import { Product } from '@/types'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@simplestepsguides.com'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Simple Steps Guides'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://simplestepsguides.com'

export interface SendDownloadEmailParams {
  to: string
  product: Product
  downloadUrl: string
  expiresAt: string
}

export async function sendDownloadEmail({
  to,
  product,
  downloadUrl,
  expiresAt,
}: SendDownloadEmailParams) {
  const expiryDate = new Date(expiresAt).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const subject = `Your ${product.name} guide is ready for download! 🎉`

  const html = createDownloadEmailHTML({
    productName: product.name,
    downloadUrl,
    expiryDate,
  })

  const text = createDownloadEmailText({
    productName: product.name,
    downloadUrl,
    expiryDate,
  })

  try {
    const data = await resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
      text,
    })

    console.log('Download email sent successfully:', data)
    return data
  } catch (error) {
    console.error('Failed to send download email:', error)
    throw new Error('Failed to send download email')
  }
}

interface EmailContentParams {
  productName: string
  downloadUrl: string
  expiryDate: string
}

function createDownloadEmailHTML({
  productName,
  downloadUrl,
  expiryDate,
}: EmailContentParams): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${productName} Guide</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #2563eb; margin-bottom: 10px;">${SITE_NAME}</h1>
    <div style="width: 60px; height: 2px; background: #2563eb; margin: 0 auto;"></div>
  </div>

  <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
    <h2 style="color: #1e293b; margin-top: 0;">🎉 Your guide is ready!</h2>
    <p>Thanks for your purchase! Your <strong>${productName}</strong> guide is now available for download.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${downloadUrl}" 
         style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
        📥 Download Your Guide Now
      </a>
    </div>
    
    <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e;"><strong>⏰ Important:</strong> This download link expires on <strong>${expiryDate}</strong> for security reasons.</p>
    </div>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
    <h3 style="color: #1e293b;">Quick Start Tips:</h3>
    <ul>
      <li>Download the PDF immediately to avoid expiration</li>
      <li>Save it to your device for offline access</li>
      <li>Follow the step-by-step instructions for best results</li>
      <li>Bookmark our blog for more helpful tips</li>
    </ul>
  </div>

  <div style="background: #dcfce7; border: 1px solid #16a34a; padding: 20px; border-radius: 6px; margin: 30px 0;">
    <h3 style="color: #15803d; margin-top: 0;">💰 30-Day Money-Back Guarantee</h3>
    <p style="margin-bottom: 0; color: #166534;">We're confident this guide will help you achieve your goals. If you're not satisfied for any reason, contact us within 30 days for a full refund.</p>
  </div>

  <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; color: #64748b; font-size: 14px;">
    <p>Need help? Reply to this email or visit <a href="${SITE_URL}" style="color: #2563eb;">${SITE_URL}</a></p>
    <p>© 2024 ${SITE_NAME}. All rights reserved.</p>
  </div>
</body>
</html>`
}

function createDownloadEmailText({
  productName,
  downloadUrl,
  expiryDate,
}: EmailContentParams): string {
  return `
${SITE_NAME}

🎉 Your ${productName} guide is ready!

Thanks for your purchase! Your "${productName}" guide is now available for download.

Download your guide: ${downloadUrl}

⏰ IMPORTANT: This download link expires on ${expiryDate} for security reasons.

Quick Start Tips:
- Download the PDF immediately to avoid expiration
- Save it to your device for offline access  
- Follow the step-by-step instructions for best results
- Bookmark our blog for more helpful tips

💰 30-Day Money-Back Guarantee
We're confident this guide will help you achieve your goals. If you're not satisfied for any reason, contact us within 30 days for a full refund.

Need help? Reply to this email or visit ${SITE_URL}

© 2024 ${SITE_NAME}. All rights reserved.
`
}

export async function sendSupportEmail({
  from,
  subject,
  message,
}: {
  from: string
  subject: string
  message: string
}) {
  const supportEmail = 'support@simplestepsguides.com' // Update with your support email

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [supportEmail],
      subject: `Support Request: ${subject}`,
      html: `
        <h3>Support Request</h3>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 6px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `,
      text: `
Support Request

From: ${from}
Subject: ${subject}

Message:
${message}
      `,
    })

    console.log('Support email sent successfully:', data)
    return data
  } catch (error) {
    console.error('Failed to send support email:', error)
    throw new Error('Failed to send support email')
  }
}
