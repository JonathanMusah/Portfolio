import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@prisma/client'

interface PreviousProjectSectionProps {
  project: Project | null
}

function parseTechStack(value: string) {
  try {
    return JSON.parse(value) as string[]
  } catch {
    return []
  }
}

export default function PreviousProjectSection({ project }: PreviousProjectSectionProps) {
  const techStack = project ? parseTechStack(project.techStack) : []

  return (
    <section className="relative py-20 border-t border-white/[0.06] bg-[#090912]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-100">Previous Project</h2>
          <p className="mt-3 text-gray-400 max-w-2xl">
            Starting with one project for launch. More projects will be added in phases.
          </p>
        </div>

        {project ? (
          <article className="grid grid-cols-1 md:grid-cols-5 gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
            <div className="md:col-span-2 rounded-xl overflow-hidden border border-white/[0.08] bg-black/20 min-h-[220px] relative">
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm">
                  Preview image coming soon
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              <h3 className="text-2xl font-semibold text-gray-100">{project.title}</h3>
              <p className="mt-3 text-gray-400 leading-relaxed">{project.description}</p>

              {techStack.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {techStack.slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs border border-white/[0.08] text-gray-300 rounded-md bg-white/[0.02]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
                  >
                    Open Live Version
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md border border-white/[0.12] text-gray-200 hover:border-white/[0.22] transition-colors"
                  >
                    View Source
                  </Link>
                )}
                <Link
                  href="/projects"
                  className="px-4 py-2 rounded-md border border-white/[0.08] text-gray-300 hover:text-gray-100 hover:border-white/[0.18] transition-colors"
                >
                  See Projects Page
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.16] bg-white/[0.01] p-8 text-center">
            <p className="text-gray-300">No project has been published yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Add your first project in Admin and it will appear here automatically.
            </p>
            <div className="mt-6">
              <Link
                href="/projects"
                className="px-4 py-2 rounded-md border border-white/[0.12] text-gray-200 hover:border-white/[0.22] transition-colors"
              >
                Go to Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}