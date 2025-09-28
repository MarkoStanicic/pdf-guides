import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Simple Steps Guides | Practical PDF Guides That Get Results",
    template: "%s | Simple Steps Guides"
  },
  description: "Get instant access to proven, step-by-step guides that solve everyday problems. Potty training, stop snoring, fix dark circles naturally - all with our 30-day guarantee.",
  keywords: ["PDF guides", "potty training", "stop snoring", "dark circles", "parenting", "health", "beauty"],
  authors: [{ name: "Simple Steps Guides" }],
  creator: "Simple Steps Guides",
  publisher: "Simple Steps Guides",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://simplestepsguides.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Simple Steps Guides",
    title: "Simple Steps Guides | Practical PDF Guides That Get Results",
    description: "Get instant access to proven, step-by-step guides that solve everyday problems. Potty training, stop snoring, fix dark circles naturally - all with our 30-day guarantee.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Simple Steps Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Steps Guides | Practical PDF Guides That Get Results",
    description: "Get instant access to proven, step-by-step guides that solve everyday problems. Potty training, stop snoring, fix dark circles naturally - all with our 30-day guarantee.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebsiteSchema()} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-trust-900`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
