import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://simplestepsguides.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/success',
        '/cancel',
        '/api/',
        '/_next/',
        '/admin/',
        '/private/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
