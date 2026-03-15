import { Metadata } from 'next'
import { getBlogPosts } from '@/lib/data'
import BlogCard from '@/components/blog/BlogCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest blog posts and updates',
}

export default async function BlogPage() {
  const posts = await getBlogPosts(true) // Only published posts

  return (
    <div className="min-h-screen bg-[#0a0a14] relative py-20">
      <div className="grid-bg" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-slate-300/[0.035] rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="code-tag mb-4">&lt;blog&gt;</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-100">Blog & Updates</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Thoughts, tutorials, and updates from my journey as a developer
          </p>
          <div className="glow-line mt-8" />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-mono mb-4">{'// No blog posts available yet.'}</p>
            <p className="text-gray-600 font-mono">{'// Check back soon for updates!'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

