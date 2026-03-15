import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import FooterClient from '@/components/layout/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { getPersonalInfo } from '@/lib/data'
import { getBaseUrl } from '@/lib/siteUrl'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  title: {
    default: 'Jonathan Musah | Software Engineer',
    template: '%s | Jonathan Musah'
  },
  description: 'Software Engineer specializing in Next.js, React, and TypeScript. Building modern web experiences with clean, efficient code.',
  keywords: ['software engineer', 'next.js developer', 'react developer', 'typescript', 'web developer', 'Jonathan Musah'],
  authors: [{ name: 'Jonathan Musah' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Jonathan Musah',
  },
  metadataBase: new URL(baseUrl),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personalInfo = await getPersonalInfo()
  
  const websiteSchema = personalInfo ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: personalInfo.name || 'Jonathan Musah',
    url: baseUrl,
    description: personalInfo.bio || 'Software Engineer specializing in Next.js, React, and TypeScript',
    author: {
      '@type': 'Person',
      name: personalInfo.name || 'Jonathan Musah',
      email: personalInfo.email,
      url: personalInfo.github || personalInfo.linkedin,
    },
  } : null

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {websiteSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        )}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className}`}>
        <div className="noise-overlay" />
        <ErrorBoundary>
          <ThemeProvider>
            <ToastProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <FooterClient personalInfo={personalInfo} />
            </ToastProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

