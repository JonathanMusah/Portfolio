'use client'

import { motion } from 'framer-motion'
import { Skill } from '@prisma/client'
import { FaCode, FaServer, FaTools, FaBrain, FaPalette, FaShieldAlt } from 'react-icons/fa'

interface SkillsSectionProps {
  skills: Skill[]
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Frontend Development': FaPalette,
  'Frontend': FaPalette,
  'Backend & Database': FaServer,
  'Backend': FaServer,
  'Programming & Logic': FaCode,
  'Programming': FaCode,
  'Specialized Systems': FaShieldAlt,
  'Tools & Version Control': FaTools,
  'Tools': FaTools,
  'Soft Skills': FaBrain,
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(groupedSkills).map(([category, categorySkills], index) => {
        const Icon = categoryIcons[category] || FaCode
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="card group"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                <Icon className="text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-100">{category}</h3>
            </div>
            
            <div className="space-y-4">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + skillIndex * 0.05 }}
                  className="group/skill"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-300 group-hover/skill:text-primary-400 transition-colors text-sm">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-md border border-primary-500/20">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-white/[0.03] rounded-full h-2 overflow-hidden border border-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + index * 0.1 + skillIndex * 0.05, ease: 'easeOut' }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background: `linear-gradient(90deg, #6366f1, #d946ef, #06b6d4)`,
                        backgroundSize: '200% 100%',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                           style={{ backgroundSize: '200% 100%' }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

