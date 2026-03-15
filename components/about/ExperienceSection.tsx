'use client'

import { motion } from 'framer-motion'
import { FaBriefcase, FaCode, FaLaptopCode, FaBuilding } from 'react-icons/fa'

interface Experience {
  title: string
  company: string
  location: string
  period: string
  type: string
  description: string[]
  icon: React.ComponentType<{ className?: string }>
}

const experiences: Experience[] = [
  {
    title: 'Freelance Web Developer',
    company: 'Self-Employed / Remote',
    location: 'Accra, Ghana',
    period: 'Jan 2022 — Present',
    type: 'Freelance',
    description: [
      'Designed and developed interactive websites using Next.js, React, and TypeScript for diverse clients.',
      'Integrated RESTful APIs, optimized UI performance, and implemented responsive layouts with MUI and Tailwind CSS.',
      'Collaborated directly with clients to deliver scalable, secure, and user-friendly web applications.',
    ],
    icon: FaLaptopCode,
  },
  {
    title: 'National Service Personnel',
    company: 'Ghana Cocoa Board (Seed Production Division)',
    location: 'Accra, Ghana',
    period: 'Sep 2024 — Sep 2025',
    type: 'Full-time',
    description: [
      'Supported IT systems through maintenance, troubleshooting, and database management.',
      'Assisted with record digitization initiatives to improve workflow efficiency across the division.',
      'Provided technical support to staff and contributed to process automation initiatives.',
    ],
    icon: FaBuilding,
  },
  {
    title: 'Developer — Final Year Project',
    company: 'Ghana Communication Technology University',
    location: 'Accra, Ghana',
    period: 'Jan 2024 — Jun 2024',
    type: 'Academic',
    description: [
      'Built a Crime Investigation System using Next.js and Prisma for comprehensive crime data management.',
      'Integrated facial recognition technology to enable efficient suspect identification.',
      'Created intuitive role-based dashboards for Admin and Officer roles using MUI and Tailwind CSS.',
    ],
    icon: FaCode,
  },
]

export default function ExperienceSection() {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px">
        <div className="h-full bg-gradient-to-b from-primary-500/50 via-accent-500/50 to-transparent" />
      </div>

      <div className="space-y-16">
        {experiences.map((exp, index) => {
          const Icon = exp.icon
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
              className={`relative flex flex-col md:flex-row items-start gap-8 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-16 h-16 rounded-full bg-[#0a0a14] border-2 border-primary-500/50 flex items-center justify-center
                             shadow-lg shadow-primary-500/20"
                >
                  <Icon className="text-xl text-primary-400" />
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card group"
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/10 to-transparent" />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      {exp.type}
                    </span>
                    <span className="text-sm text-gray-500 font-mono">{exp.period}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-100 mb-1 group-hover:text-primary-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-accent-400 font-semibold mb-1">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-4 font-mono">{exp.location}</p>

                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
