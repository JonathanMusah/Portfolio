'use client'

import { motion } from 'framer-motion'
import { Education } from '@prisma/client'
import Image from 'next/image'
import { FaGraduationCap } from 'react-icons/fa'

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <FaGraduationCap className="mx-auto text-4xl mb-4 text-gray-600" />
        <p>No education information available yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          className="card group relative overflow-hidden"
          whileHover={{ y: -4 }}
        >
          {/* Left gradient accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500 via-accent-500 to-transparent" />
          
          <div className="flex flex-col md:flex-row gap-6 pl-4">
            {edu.logo && (
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/[0.03] p-3 border border-white/[0.06] group-hover:border-primary-500/30 transition-colors">
                <Image
                  src={edu.logo}
                  alt={edu.institution}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-primary-400 transition-colors">
                {edu.degree}
              </h3>
              <p className="text-lg font-semibold gradient-text-static mb-2">
                {edu.institution}
              </p>
              {edu.field && (
                <p className="text-gray-400 font-medium mb-3">{edu.field}</p>
              )}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-md text-sm font-mono border border-primary-500/20">
                  {new Date(edu.startDate).getFullYear()} —{' '}
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                </span>
              </div>
              {edu.description && (
                <p className="text-gray-400 leading-relaxed mt-3 text-sm">{edu.description}</p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

