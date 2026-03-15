'use client'

import { motion } from 'framer-motion'
import { Certification } from '@prisma/client'
import Image from 'next/image'
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'

interface CertificationsSectionProps {
  certifications: Certification[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <FaCertificate className="mx-auto text-4xl mb-4 text-gray-600" />
        <p>No certifications available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          className="card group"
          whileHover={{ y: -5 }}
        >
          <div className="relative z-10">
            {cert.logo && (
              <div className="relative w-16 h-16 mb-5 rounded-xl overflow-hidden bg-white/[0.03] p-2 border border-white/[0.06] group-hover:border-primary-500/30 transition-colors">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-primary-400 transition-colors">
              {cert.name}
            </h3>
            <p className="text-sm font-semibold text-accent-400 mb-3">{cert.issuer}</p>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500 font-mono">
                <span className="text-gray-600">issued:</span>{' '}
                {new Date(cert.issueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              {cert.expiryDate && (
                <p className="text-xs text-gray-500 font-mono">
                  <span className="text-gray-600">expires:</span>{' '}
                  {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
            {cert.credentialUrl && (
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold text-sm"
                whileHover={{ x: 5 }}
              >
                View Credential <FaExternalLinkAlt size={10} />
              </motion.a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

