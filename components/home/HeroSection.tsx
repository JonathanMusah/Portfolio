'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FaDownload, FaEnvelope, FaChevronDown, FaGithub, FaLinkedin } from 'react-icons/fa'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import { useEffect, useState, useRef } from 'react'

interface PersonalInfo {
  name?: string | null
  title?: string | null
  bio?: string | null
  resumeUrl?: string | null
  github?: string | null
  linkedin?: string | null
}

interface HeroSectionProps {
  personalInfo: PersonalInfo | null
}

const roles = [
  'Software Engineer',
  'Next.js Developer',
  'React Specialist',
  'TypeScript Enthusiast',
  'Problem Solver',
]

function TypewriterText() {
  const [currentRole, setCurrentRole] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(role.slice(0, text.length + 1))
          if (text.length === role.length) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setText(role.slice(0, text.length - 1))
          if (text.length === 0) {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )
    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentRole])

  return (
    <span className="font-mono">
      {text}
      <span className="animate-blink text-primary-400">|</span>
    </span>
  )
}

function FloatingCodeBlock({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 1, duration: 1 }}
      className={`absolute font-mono text-[10px] sm:text-xs text-primary-500/20 select-none pointer-events-none whitespace-pre ${className}`}
    >
      {`const dev = {
  name: "Jonathan",
  stack: ["Next.js", "React"],
  passion: "Building Impact"
};`}
    </motion.div>
  )
}

function StatusIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span className="text-sm text-gray-400 font-mono">Available for work</span>
    </motion.div>
  )
}

export default function HeroSection({ personalInfo }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02)
        mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const name = personalInfo?.name || 'Jonathan Musah'
  const bio = personalInfo?.bio || "I'm a passionate Software Engineer who enjoys turning ideas into smart, functional web applications. Skilled in Next.js, React, TypeScript, and Python, I focus on clean design and practical solutions that make a real impact."

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-[#0a0a14]">
      {/* Particle Canvas Background */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg z-[1]" />

      {/* Subtle atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-slate-300/[0.04] rounded-full blur-[110px] z-[1]" />

      {/* Floating code blocks */}
      <FloatingCodeBlock className="top-[15%] right-[5%] hidden lg:block" delay={0} />
      <FloatingCodeBlock className="bottom-[20%] left-[3%] hidden lg:block" delay={0.5} />

      {/* Main Content */}
      <section className="relative min-h-screen flex items-center justify-center px-4 z-10">
        <motion.div style={{ x: springX, y: springY }} className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Status indicator */}
            <StatusIndicator />

            {/* Code-style opening tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 mb-4"
            >
              <span className="code-tag">&lt;developer&gt;</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
            >
              <span className="block text-gray-100">
                {name.split(' ')[0]}
              </span>
              <span className="block text-primary-300 mt-2">
                {name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            {/* Typewriter Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 mb-2"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <span className="text-accent-400 font-mono text-sm">~/role $</span>
                <span className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium">
                  <TypewriterText />
                </span>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed"
            >
              {bio}
            </motion.p>

            {/* Code-style closing tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-4 mb-8"
            >
              <span className="code-tag">&lt;/developer&gt;</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <Link
                  href={personalInfo?.resumeUrl || 'https://drive.google.com/file/d/YOUR_CV_FILE_ID/view'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-glow flex items-center gap-2.5"
                >
                  <FaDownload className="text-sm" /> Download Resume
                </Link>
              <Link
                href="/contact"
                className="btn-secondary flex items-center gap-2.5"
              >
                <FaEnvelope className="text-sm" /> Get In Touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex items-center gap-4 mt-8"
            >
              {[
                { icon: FaGithub, href: personalInfo?.github || 'https://github.com/JonathanMusah', label: 'GitHub' },
                { icon: FaLinkedin, href: personalInfo?.linkedin || 'https://www.linkedin.com/in/jonathan-musah-9ab39b20a', label: 'LinkedIn' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center
                             text-gray-500 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="text-xs text-gray-600 font-mono tracking-widest uppercase group-hover:text-primary-400 transition-colors">
              scroll
            </span>
            <FaChevronDown className="text-gray-600 group-hover:text-primary-400 transition-colors" />
          </motion.div>
        </motion.div>
      </section>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a14] to-transparent z-[2]" />
    </div>
  )
}

