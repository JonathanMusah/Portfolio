import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const info = await prisma.personalInfo.findFirst({
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(info)
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.title || !body.bio || !body.email) {
      return NextResponse.json(
        { error: 'Name, title, bio, and email are required' },
        { status: 400 }
      )
    }

    const existing = await prisma.personalInfo.findFirst()

    let info
    if (existing) {
      info = await prisma.personalInfo.update({
        where: { id: existing.id },
        data: body,
      })
    } else {
      info = await prisma.personalInfo.create({ data: body })
    }

    return NextResponse.json(info)
  } catch (error) {
    console.error('Error updating personal info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
