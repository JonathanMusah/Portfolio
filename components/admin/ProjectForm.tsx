'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Project } from '@prisma/client'
import ImageUpload from './ImageUpload'

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  longDescription: z.string().optional(),
  techStack: z.string().min(1, 'Tech stack is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  image: z.string().optional(),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState(project?.image || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          longDescription: project.longDescription || '',
          techStack: project.techStack,
          githubUrl: project.githubUrl || '',
          liveUrl: project.liveUrl || '',
          featured: project.featured,
          image: project.image || '',
        }
      : {
          featured: false,
        },
  })

  const featured = watch('featured')

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)

    try {
      const url = project ? `/api/admin/projects/${project.id}` : '/api/admin/projects'
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          image: imageUrl,
        }),
      })

      if (response.ok) {
        router.push('/admin/projects')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save project')
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="input-field"
          placeholder="Project Title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="input-field resize-none"
          placeholder="Short description of the project"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Long Description
        </label>
        <textarea
          id="longDescription"
          {...register('longDescription')}
          rows={6}
          className="input-field resize-none"
          placeholder="Detailed description (optional)"
        />
      </div>

      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-2">
          Tech Stack (JSON array) *
        </label>
        <input
          id="techStack"
          type="text"
          {...register('techStack')}
          className="input-field"
          placeholder={'"["React", "Next.js", "TypeScript"]"'}
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter as JSON array, e.g., [&quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;]
        </p>
        {errors.techStack && (
          <p className="mt-1 text-sm text-red-600">{errors.techStack.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub URL
          </label>
          <input
            id="githubUrl"
            type="url"
            {...register('githubUrl')}
            className="input-field"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Live Demo URL
          </label>
          <input
            id="liveUrl"
            type="url"
            {...register('liveUrl')}
            className="input-field"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Project Image
        </label>
        <ImageUpload
          currentImage={imageUrl}
          onImageUploaded={(url) => {
            setImageUrl(url)
            setValue('image', url)
          }}
        />
      </div>

      <div className="flex items-center">
        <input
          id="featured"
          type="checkbox"
          checked={featured}
          onChange={(e) => setValue('featured', e.target.checked)}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
          Feature this project
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

