'use client'

import { PersonalInfo } from '@prisma/client'

interface StructuredDataProps {
  personalInfo: PersonalInfo | null
  type?: 'Person' | 'WebSite'
}

export default function StructuredData({ personalInfo, type = 'Person' }: StructuredDataProps) {
  if (!personalInfo) return null

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (type === 'WebSite') {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: personalInfo.name || 'Portfolio',
      url: baseUrl,
      description: personalInfo.bio || 'Personal portfolio website',
      author: {
        '@type': 'Person',
        name: personalInfo.name || 'Your Name',
        email: personalInfo.email,
        url: personalInfo.github || personalInfo.linkedin,
      },
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    )
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name || 'Your Name',
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    email: personalInfo.email,
    url: baseUrl,
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
      personalInfo.twitter,
    ].filter(Boolean),
    address: personalInfo.location
      ? {
          '@type': 'PostalAddress',
          addressLocality: personalInfo.location,
        }
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}

