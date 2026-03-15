import { Metadata } from 'next'
import { getProject } from '@/lib/data'
import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EditProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.id)
  return {
    title: project ? `Edit ${project.title}` : 'Edit Project',
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  )
}

