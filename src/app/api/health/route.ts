import { NextResponse } from 'next/server'

export async function GET() {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    services: {
      database: 'N/A', // No database in this app
      stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
      email: process.env.RESEND_API_KEY ? 'configured' : 'not configured',
      storage: process.env.AWS_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID ? 'configured' : 'not configured',
    }
  }

  return NextResponse.json(healthData, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
