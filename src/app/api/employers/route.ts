import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const employers = await prisma.employerProfile.findMany({
      select: {
        id: true,
        company: true,
        verified: true,
        user: {
          select: {
            email: true
          }
        }
      },
      take: 10 // Limit results
    })

    return NextResponse.json({
      success: true,
      employers,
      count: employers.length
    })

  } catch (error) {
    console.error('Error fetching employers:', error)
    return NextResponse.json({ error: 'Failed to fetch employers' }, { status: 500 })
  }
} 