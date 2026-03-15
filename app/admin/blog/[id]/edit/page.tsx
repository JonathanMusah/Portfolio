import { Metadata } from 'next'
import { getBlogPostById } from '@/lib/data'
import { notFound } from 'next/navigation'
import BlogPostForm from '@/components/admin/BlogPostForm'

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditBlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostById(params.id)
  return {
    title: post ? `Edit ${post.title}` : 'Edit Blog Post',
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const post = await getBlogPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog Post</h1>
      <BlogPostForm post={post} />
    </div>
  )
}

