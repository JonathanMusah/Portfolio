import Link from 'next/link'
import { ExternalProject } from '@/lib/externalProjects'

interface ExternalProjectSpotlightProps {
  projects: ExternalProject[]
}

function getStatusLabel(status: ExternalProject['status']) {
  if (status === 'ready') return 'Ready'
  if (status === 'planned') return 'Planned'
  return 'Under Active Development'
}

export default function ExternalProjectSpotlight({ projects }: ExternalProjectSpotlightProps) {
  if (projects.length === 0) return null

  return (
    <section className="mb-14">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">Flagship Builds</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Large Projects Integrated Smartly</h2>
        <p className="text-gray-400 mt-3 max-w-3xl leading-relaxed">
          These are substantial products kept as separate codebases. This portfolio tracks their progress and links to live demos once deployed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-100">{project.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-md border border-white/[0.12] text-gray-300">
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{project.category}</p>
                <p className="text-gray-400 leading-relaxed">{project.summary}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-300 mb-2">Architecture</p>
              <div className="flex flex-wrap gap-2">
                {project.architecture.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs border border-white/[0.08] text-gray-300 rounded-md bg-white/[0.01]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>



            {project.notes && <p className="mt-2 text-sm text-gray-500">{project.notes}</p>}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-500 transition-colors"
                >
                  Open Live Demo
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-md border border-white/[0.1] text-gray-400">
                  Live demo will be added after deployment
                </span>
              )}

              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-md border border-white/[0.14] text-gray-200 hover:border-white/[0.25] transition-colors"
                >
                  View Repository
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
