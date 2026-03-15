import { prisma } from './prisma'

export async function getPersonalInfo() {
  try {
    const info = await prisma.personalInfo.findFirst({
      orderBy: { updatedAt: 'desc' },
    })
    return info
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return null
  }
}

export async function getSkills() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })
    return skills
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export async function getEducation() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' },
    })
    return education
  } catch (error) {
    console.error('Error fetching education:', error)
    return []
  }
}

export async function getCertifications() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { order: 'asc' },
    })
    return certifications
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
}

export async function getProjects(featured?: boolean) {
  try {
    const projects = await prisma.project.findMany({
      where: featured ? { featured: true } : undefined,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    })
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    })
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getBlogPosts(published?: boolean) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: published ? { published: true } : undefined,
      orderBy: { publishedAt: 'desc' },
    })
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    })
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    })
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

