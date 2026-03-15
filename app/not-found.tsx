'use client'

import Link from 'next/link'
import { FaHome, FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a14] relative flex items-center justify-center px-4">
      <div className="grid-bg" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-9xl font-extrabold gradient-text mb-4 font-mono">404</h1>
          <div className="glow-line" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-100 mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-400 mb-12 leading-relaxed font-mono"
        >
          <span className="text-gray-600">{'// '}</span>The page you&apos;re looking for doesn&apos;t exist.
          <br />
          <span className="text-gray-600">{'// '}</span>Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/"
            className="btn-glow flex items-center gap-2"
          >
            <FaHome /> Go Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 rounded-lg border border-white/[0.06] bg-white/[0.03] text-gray-300 hover:border-primary-500/30 hover:text-primary-400 transition-all duration-300 flex items-center gap-2"
          >
            <FaArrowLeft /> View Projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 rounded-lg text-gray-500 hover:text-primary-400 hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06] transition-all duration-300 font-mono text-sm"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
