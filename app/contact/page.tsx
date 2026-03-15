import { Metadata } from 'next'
import { getPersonalInfo } from '@/lib/data'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact | Jonathan Musah',
  description: 'Get in touch with Jonathan Musah for collaborations, freelance work, or just to say hello.',
}

export default async function ContactPage() {
  const personalInfo = await getPersonalInfo()

  return (
    <div className="min-h-screen bg-[#0a0a14] py-20">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[420px] h-[420px] bg-slate-300/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="code-tag">&lt;contact&gt;</span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 mb-6">
            <span className="text-gray-100">Get In Touch</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo personalInfo={personalInfo} />
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
