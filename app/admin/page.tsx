import { Metadata } from 'next'
import { getProjects, getBlogPosts } from '@/lib/data'
import Link from 'next/link'
import { FaProjectDiagram, FaBlog, FaPlus } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing portfolio content',
}

export default async function AdminDashboard() {
  const projects = await getProjects()
  const blogPosts = await getBlogPosts()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FaProjectDiagram className="text-primary-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                <p className="text-gray-600">{projects.length} total</p>
              </div>
            </div>
            <Link
              href="/admin/projects/new"
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus /> New
            </Link>
          </div>
          <Link
            href="/admin/projects"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Manage Projects →
          </Link>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FaBlog className="text-primary-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
                <p className="text-gray-600">{blogPosts.length} total</p>
              </div>
            </div>
            <Link
              href="/admin/blog/new"
              className="btn-primary flex items-center gap-2"
            >
              <FaPlus /> New
            </Link>
          </div>
          <Link
            href="/admin/blog"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Manage Blog Posts →
          </Link>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/personal-info"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Personal Info</h3>
            <p className="text-sm text-gray-600">Update your profile information</p>
          </Link>
          <Link
            href="/admin/skills"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Skills</h3>
            <p className="text-sm text-gray-600">Manage your skills and proficiencies</p>
          </Link>
          <Link
            href="/admin/education"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Education</h3>
            <p className="text-sm text-gray-600">Update education history</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

