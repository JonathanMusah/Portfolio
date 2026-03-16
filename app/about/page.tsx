import { Metadata } from 'next'
import { getPersonalInfo, getSkills, getEducation, getCertifications } from '@/lib/data'
import SkillsSection from '@/components/about/SkillsSection'
import EducationSection from '@/components/about/EducationSection'
import CertificationsSection from '@/components/about/CertificationsSection'
import ExperienceSection from '@/components/about/ExperienceSection'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | Jonathan Musah',
  description: 'Learn more about Jonathan Musah — Software Engineer specializing in Next.js, React, TypeScript, and Python.',
}

export const revalidate = 60 // Revalidate data every 60 seconds

export default async function AboutPage() {
  const personalInfo = await getPersonalInfo()
  const skills = await getSkills()
  const education = await getEducation()
  const certifications = await getCertifications()

  const bio = personalInfo?.bio || "I'm a passionate Software Engineer who enjoys turning ideas into smart, functional web applications. Skilled in Next.js, React, TypeScript, and Python, I focus on clean design and practical solutions. I developed a Crime Investigation System using facial recognition to support smarter policing and improve data management. I love learning new tools, solving real problems, and building software that makes an impact."

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/3 w-[420px] h-[420px] bg-slate-300/[0.04] rounded-full blur-[120px]" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="code-tag">&lt;about&gt;</span>
              <h1 className="text-5xl md:text-7xl font-black mt-4 mb-6">
                <span className="text-gray-100">About</span>{' '}
                <span className="text-primary-300">Me</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                {bio}
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '3+', label: 'Years Coding' },
                  { value: '10+', label: 'Projects Built' },
                  { value: 'BSc', label: 'Computer Eng.' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-2xl font-black gradient-text-static">{stat.value}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <span className="code-tag block mt-8">&lt;/about&gt;</span>
            </div>
            {personalInfo?.avatar && (
              <div className="relative w-72 h-72 mx-auto md:mx-0 md:ml-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-2xl animate-pulse-glow" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/[0.08] animate-morph">
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  />
                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="w-full h-px bg-primary-400/30 animate-scan-line" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="glow-line max-w-4xl mx-auto" />

      {/* Professional Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="code-tag">&lt;experience&gt;</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4">
              <span className="text-gray-100">Professional Experience</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              My journey building software and solving real-world problems
            </p>
          </div>
          <ExperienceSection />
        </div>
      </section>

      {/* Divider */}
      <div className="glow-line max-w-4xl mx-auto" />

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="code-tag">&lt;skills&gt;</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4">
              <span className="text-gray-100">Skills & Technologies</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The technologies and tools I use to bring ideas to life
            </p>
          </div>
          <SkillsSection skills={skills} />
        </div>
      </section>

      {/* Divider */}
      <div className="glow-line max-w-4xl mx-auto" />

      {/* Education Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="code-tag">&lt;education&gt;</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4">
              <span className="text-gray-100">Education</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Academic foundation in Computer Engineering
            </p>
          </div>
          <EducationSection education={education} />
        </div>
      </section>

      {/* Divider */}
      <div className="glow-line max-w-4xl mx-auto" />

      {/* Certifications Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="code-tag">&lt;certifications&gt;</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4">
              <span className="text-gray-100">Certifications</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Continuous learning and professional development
            </p>
          </div>
          <CertificationsSection certifications={certifications} />
        </div>
      </section>
    </div>
  )
}

