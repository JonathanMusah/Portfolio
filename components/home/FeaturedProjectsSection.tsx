import Link from 'next/link'
import { externalProjects, ExternalProject } from '@/lib/externalProjects'

function getStatusColor(status: ExternalProject['status']) {
  if (status === 'ready') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  if (status === 'in-progress') return 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
}

function getStatusLabel(status: ExternalProject['status']) {
  if (status === 'ready') return 'Live'
  if (status === 'in-progress') return 'In Progress'
  return 'Planned'
}

function getCategoryIcon(category: string) {
  if (category.includes('Fintech')) return '💰'
  if (category.includes('E-commerce')) return '🛒'
  if (category.includes('Desktop')) return '🖥️'
  if (category.includes('Computer Vision') || category.includes('Research')) return '🔬'
  if (category.includes('Cybersecurity')) return '🛡️'
  return '🚀'
}

export default function FeaturedProjectsSection() {
  const featured = externalProjects.slice(0, 3)

  return (
    <section className="relative py-20 border-t border-white/[0.06] bg-[#090912]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-100">Featured Projects</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">
            A selection of recent projects spanning web platforms, AI tools, and security research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6 hover:border-white/[0.16] transition-all duration-300 flex flex-col"
            >
              {/* Category icon header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{getCategoryIcon(project.category)}</span>
                <span
                  className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusColor(project.status)}`}
                >
                  {getStatusLabel(project.status)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-100 mb-1 group-hover:text-primary-300 transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{project.category}</p>

              {/* Summary */}
              <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-grow line-clamp-3">
                {project.summary}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.architecture.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 text-[10px] border border-white/[0.08] text-gray-400 rounded bg-white/[0.01]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 mt-auto">
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs rounded-md border border-white/[0.12] text-gray-300 hover:border-white/[0.25] hover:text-gray-100 transition-colors"
                  >
                    Repository
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs rounded-md bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
                  >
                    Live Demo
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-md border border-white/[0.12] text-gray-300 hover:text-gray-100 hover:border-white/[0.22] transition-colors"
          >
            View All {externalProjects.length} Projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
