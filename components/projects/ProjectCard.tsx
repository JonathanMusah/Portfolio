'use client'

import { motion } from 'framer-motion'
import { Project } from '@prisma/client'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const techStack = JSON.parse(project.techStack || '[]') as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="card group cursor-pointer"
      whileHover={{ y: -6 }}
    >
      {project.image && (
        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.04]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/80 to-transparent" />
          {project.featured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 px-3 py-1 text-xs font-mono font-bold bg-primary-500/20 text-primary-300 rounded-md border border-primary-500/30 backdrop-blur-sm"
            >
              Featured
            </motion.span>
          )}
        </div>
      )}
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm">
          {project.description}
        </p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono font-medium bg-white/[0.03] text-gray-400 rounded-md border border-white/[0.06] group-hover:border-primary-500/20 group-hover:text-primary-400 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 pt-3 border-t border-white/[0.04] group-hover:border-primary-500/10 transition-colors">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors font-medium text-sm"
              whileHover={{ x: 3 }}
            >
              <FaGithub /> <span>Code</span>
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors font-medium text-sm"
              whileHover={{ x: 3 }}
            >
              <FaExternalLinkAlt /> <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

