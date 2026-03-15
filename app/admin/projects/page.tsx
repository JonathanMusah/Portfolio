import { Metadata } from 'next'
import { getProjects } from '@/lib/data'
import Link from 'next/link'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import ProjectActions from '@/components/admin/ProjectActions'

export const metadata: Metadata = {
  title: 'Manage Projects',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary flex items-center gap-2">
          <FaPlus /> New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No projects yet.</p>
          <Link href="/admin/projects/new" className="btn-primary inline-flex items-center gap-2">
            <FaPlus /> Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                    {project.updatedAt && (
                      <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <ProjectActions projectId={project.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

