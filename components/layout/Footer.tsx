'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, key: 'github' },
  { name: 'LinkedIn', icon: FaLinkedin, key: 'linkedin' },
  { name: 'Twitter', icon: FaTwitter, key: 'twitter' },
  { name: 'Email', icon: FaEnvelope, key: 'email' },
]

interface FooterProps {
  personalInfo: {
    name?: string | null
    github?: string | null
    linkedin?: string | null
    twitter?: string | null
    email?: string | null
  } | null
}

export default function Footer({ personalInfo }: FooterProps) {
  const getSocialUrl = (key: string) => {
    switch (key) {
      case 'github':
        return personalInfo?.github || 'https://github.com/JonathanMusah'
      case 'linkedin':
        return personalInfo?.linkedin || 'https://www.linkedin.com/in/jonathan-musah-9ab39b20a'
      case 'twitter':
        return personalInfo?.twitter || '#'
      case 'email':
        return personalInfo?.email ? `mailto:${personalInfo.email}` : 'mailto:musahjonathan66@gmail.com'
      default:
        return '#'
    }
  }

  return (
    <footer className="relative bg-[#060609] border-t border-white/[0.04] overflow-hidden">
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-primary-500/[0.03] blur-[60px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-black text-sm">
                JM
              </div>
              <span className="text-lg font-bold text-gray-200">
                Jonathan<span className="text-primary-400">.</span>dev
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">
              Turning ideas into smart, functional web applications. Based in Accra, Ghana.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/projects', label: 'Projects' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-primary-400 transition-colors duration-300 text-sm hover-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">Connect</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                const url = getSocialUrl(social.key)
                if (url === '#') return null
                return (
                  <motion.a
                    key={social.key}
                    href={url}
                    target={social.key === 'email' ? undefined : '_blank'}
                    rel={social.key === 'email' ? undefined : 'noopener noreferrer'}
                    className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06]
                               flex items-center justify-center text-gray-500 hover:text-primary-400 
                               hover:border-primary-500/30 hover:bg-primary-500/5
                               transition-all duration-300"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-mono">
            &copy; {new Date().getFullYear()} {personalInfo?.name || 'Jonathan Musah'}
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Built with <FaHeart className="text-accent-500 text-xs" /> using Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
