import { Metadata } from 'next'
import { getBlogPosts } from '@/lib/data'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'
import BlogPostActions from '@/components/admin/BlogPostActions'

export const metadata: Metadata = {
  title: 'Manage Blog Posts',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2">
          <FaPlus /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No blog posts yet.</p>
          <Link href="/admin/blog/new" className="btn-primary inline-flex items-center gap-2">
            <FaPlus /> Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                    {post.published ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Slug: {post.slug}</span>
                    {post.publishedAt && (
                      <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <BlogPostActions postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

