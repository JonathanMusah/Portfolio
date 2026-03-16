import { Metadata } from 'next'
import { getProjects } from '@/lib/data'
import ProjectCard from '@/components/projects/ProjectCard'
import ExternalProjectSpotlight from '@/components/projects/ExternalProjectSpotlight'
import { externalProjects } from '@/lib/externalProjects'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of projects and applications',
}

export default async function ProjectsPage() {
  const allProjects = await getProjects()

  // Filter out DB projects that duplicate an external project (by matching title keywords)
  const externalNames = externalProjects.map((p) => p.name.toLowerCase())
  const projects = allProjects.filter(
    (p) => !externalNames.some((name) => name.includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(name.split('—')[0].trim().toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#0a0a14] relative py-20">
      <div className="grid-bg" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-slate-300/[0.035] rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="code-tag mb-4">&lt;projects&gt;</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-100">My Projects</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of projects I&apos;ve worked on, showcasing my skills and experience
          </p>
          <div className="glow-line mt-8" />
        </div>

        <ExternalProjectSpotlight projects={externalProjects} />

        {projects.length > 0 && (
          <>
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl text-gray-100 font-semibold">Portfolio Entries</h2>
              <p className="text-gray-400 mt-2">Smaller projects and shipped builds stored in the portfolio database.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

