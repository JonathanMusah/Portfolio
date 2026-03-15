'use client'

import { motion } from 'framer-motion'
import { BlogPost } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: BlogPost
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="card group cursor-pointer"
      whileHover={{ y: -6 }}
    >
      <Link href={`/blog/${post.slug}`}>
        {post.image && (
          <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.04]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/80 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] group-hover:border-primary-500/10 transition-colors">
            <span className="text-xs font-mono text-gray-500">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Draft'}
            </span>
            <motion.span
              className="text-primary-400 font-medium flex items-center gap-1 text-sm"
              whileHover={{ x: 3 }}
            >
              Read more <span>→</span>
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

