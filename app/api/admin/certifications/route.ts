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

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(certifications)
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = certSchema.parse(body)

    const certification = await prisma.certification.create({
      data: {
        ...validatedData,
        issueDate: new Date(validatedData.issueDate),
        expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
        credentialUrl: validatedData.credentialUrl || null,
      },
    })
    return NextResponse.json(certification, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    console.error('Error creating certification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
