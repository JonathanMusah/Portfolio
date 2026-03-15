const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.blogPost.deleteMany()
  await prisma.project.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.education.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.personalInfo.deleteMany()

  // Create Personal Info
  await prisma.personalInfo.create({
    data: {
      name: 'Jonathan Musah',
      title: 'Software Engineer | Next.js & React Developer',
      bio: "I'm a passionate Software Engineer who enjoys turning ideas into smart, functional web applications. Skilled in Next.js, React, TypeScript, and Python, I focus on clean design and practical solutions. I developed a Crime Investigation System using facial recognition to support smarter policing and improve data management. I love learning new tools, solving real problems, and building software that makes an impact.",
      email: 'musahjonathan66@gmail.com',
      location: 'Greater Accra, Ghana',
      linkedin: 'https://www.linkedin.com/in/jonathan-musah-9ab39b20a',
      github: 'https://github.com/JonathanMusah',
    },
  })

  // Create Skills
  const skillsData = [
    // Frontend
    { name: 'Next.js', category: 'Frontend', proficiency: 95 },
    { name: 'React', category: 'Frontend', proficiency: 95 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 90 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
    { name: 'MUI', category: 'Frontend', proficiency: 85 },
    { name: 'Responsive UI Design', category: 'Frontend', proficiency: 90 },
    
    // Backend
    { name: 'Prisma ORM', category: 'Backend', proficiency: 90 },
    { name: 'MySQL', category: 'Backend', proficiency: 85 },
    { name: 'SQLite', category: 'Backend', proficiency: 85 },
    { name: 'API Integration', category: 'Backend', proficiency: 90 },
    { name: 'Authentication Systems', category: 'Backend', proficiency: 85 },
    
    // Programming
    { name: 'Python', category: 'Programming', proficiency: 80 },
    { name: 'JavaScript', category: 'Programming', proficiency: 95 },
    { name: 'Problem Solving', category: 'Programming', proficiency: 90 },
    { name: 'Algorithms', category: 'Programming', proficiency: 80 },
    
    // Specialized
    { name: 'Facial Recognition Integration', category: 'Specialized', proficiency: 75 },
    { name: 'Data Management', category: 'Specialized', proficiency: 85 },
    { name: 'Secure Web Architecture', category: 'Specialized', proficiency: 80 },
    
    // Tools
    { name: 'Git', category: 'Tools', proficiency: 90 },
    { name: 'GitHub', category: 'Tools', proficiency: 95 },
    { name: 'VS Code', category: 'Tools', proficiency: 95 },
    { name: 'Postman', category: 'Tools', proficiency: 85 },
    { name: 'Debugging', category: 'Tools', proficiency: 90 },
  ]

  for (let i = 0; i < skillsData.length; i++) {
    await prisma.skill.create({
      data: { ...skillsData[i], order: i },
    })
  }

  // Create Education
  await prisma.education.create({
    data: {
      institution: 'Ghana Communication Technology University (GCTU)',
      degree: 'Bachelor of Science in Computer Engineering',
      field: 'Computer Engineering',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2025-09-01'),
      description: 'Gained strong knowledge in software development, computer systems, and database design. Final year project: Crime Investigation System utilizing facial recognition technology.',
      order: 0,
    },
  })

  // Create Projects
  await prisma.project.create({
    data: {
      title: 'Crime Investigation System',
      description: 'A comprehensive crime data management system with facial recognition capabilities for suspect identification.',
      longDescription: 'Built a Crime Investigation System using Next.js and Prisma for crime data management. Integrated facial recognition technology to identify suspects efficiently. Created intuitive dashboards for Admin and Officer roles using MUI and Tailwind CSS. This was my final year project at GCTU.',
      techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'Prisma', 'MySQL', 'MUI', 'Tailwind CSS', 'Facial Recognition']),
      featured: true,
      order: 0,
    },
  })

  await prisma.project.create({
    data: {
      title: 'Freelance Web Development',
      description: 'Designed and developed interactive websites for various clients.',
      longDescription: 'Designed and developed interactive websites using Next.js, React, and TypeScript. Integrated APIs, optimized UI performance, and implemented responsive layouts with MUI and Tailwind CSS. Collaborated with clients to deliver scalable, secure, and user-friendly applications.',
      techStack: JSON.stringify(['Next.js', 'React', 'TypeScript', 'MUI', 'Tailwind CSS', 'API Integration']),
      featured: true,
      order: 1,
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
