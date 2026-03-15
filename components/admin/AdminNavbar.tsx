'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { FaHome, FaSignOutAlt } from 'react-icons/fa'

export default function AdminNavbar() {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="text-xl font-bold text-primary-600"
            >
              Admin Panel
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/admin'
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname?.startsWith('/admin/projects')
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Projects
              </Link>
              <Link
                href="/admin/blog"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname?.startsWith('/admin/blog')
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Blog
              </Link>
            </div>
            </div>
            <div className="hidden lg:flex gap-6">
                <Link
                  href="/admin/skills"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname?.startsWith('/admin/skills')
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Skills
                </Link>
                <Link
                  href="/admin/education"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname?.startsWith('/admin/education')
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Education
                </Link>
                <Link
                  href="/admin/certifications"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname?.startsWith('/admin/certifications')
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Certifications
                </Link>
                <Link
                  href="/admin/personal-info"
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname?.startsWith('/admin/personal-info')
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>
            </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FaHome /> View Site
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

