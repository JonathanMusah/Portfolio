'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Project, BlogPost } from '@prisma/client'

interface SearchBarProps {
  projects: Project[]
  blogPosts: BlogPost[]
  onResultClick?: (type: 'project' | 'blog', id: string, slug?: string) => void
}

export default function SearchBar({ projects, blogPosts, onResultClick }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return { projects: [], posts: [] }

    const lowerQuery = query.toLowerCase()

    const projectResults = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.techStack.toLowerCase().includes(lowerQuery)
    )

    const postResults = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery)
    )

    return { projects: projectResults.slice(0, 5), posts: postResults.slice(0, 5) }
  }, [query, projects, blogPosts])

  const hasResults = results.projects.length > 0 || results.posts.length > 0
  const showResults = isOpen && query.length >= 2

  return (
    <div className="relative">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search projects, blog posts..."
          className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
          aria-label="Search"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
        >
          {hasResults ? (
            <>
              {results.projects.length > 0 && (
                <div className="p-2">
                  <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Projects</h3>
                  {results.projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        onResultClick?.('project', project.id)
                        setQuery('')
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      <p className="font-semibold text-gray-900">{project.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
                    </button>
                  ))}
                </div>
              )}

              {results.posts.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase">Blog Posts</h3>
                  {results.posts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => {
                        onResultClick?.('blog', post.id, post.slug)
                        setQuery('')
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      <p className="font-semibold text-gray-900">{post.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{post.excerpt}</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

