import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const certSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string(),
  expiryDate: z.string().optional().nullable(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')).nullable(),
  logo: z.string().optional(),
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
    const validatedData = certSchema.parse(body)

    const certification = await prisma.certification.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        issueDate: new Date(validatedData.issueDate),
        expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
        credentialUrl: validatedData.credentialUrl || null,
      },
    })
    return NextResponse.json(certification)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    console.error('Error updating certification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.certification.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Certification deleted' })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
