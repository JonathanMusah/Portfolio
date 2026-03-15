import { Metadata } from 'next'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata: Metadata = {
  title: 'New Project',
}

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Project</h1>
      <ProjectForm />
    </div>
  )
}

