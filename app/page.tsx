import { getPersonalInfo, getProjects } from '@/lib/data'
import HeroSection from '@/components/home/HeroSection'
import PreviousProjectSection from '@/components/home/PreviousProjectSection'
import { getBaseUrl } from '@/lib/siteUrl'

export default async function Home() {
  const personalInfo = await getPersonalInfo()
  const projects = await getProjects()
  const previousProject = projects[0] || null
  const baseUrl = getBaseUrl()
  
  const personSchema = personalInfo ? {
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
  } : null

  return (
    <>
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      <HeroSection personalInfo={personalInfo} />
      <PreviousProjectSection project={previousProject} />
    </>
  )
}

