import { Metadata } from 'next'
import BlogPostForm from '@/components/admin/BlogPostForm'

export const metadata: Metadata = {
  title: 'New Blog Post',
}

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>
      <BlogPostForm />
    </div>
  )
}

