import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  proficiency: z.number().min(0).max(100),
  icon: z.string().optional(),
  order: z.number().default(0),
})

interface RouteParams {
  params: { id: string }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = skillSchema.parse(body)
    const skill = await prisma.skill.update({
      where: { id: params.id },
      data: validatedData,
    })
    return NextResponse.json(skill)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    console.error('Error updating skill:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.skill.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Skill deleted' })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
