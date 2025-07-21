import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get pending job posts with employer information
    const pendingJobs = await prisma.jobPost.findMany({
      where: {
        approved: false
      },
      include: {
        employer: {
          include: {
            user: {
              select: {
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data to match frontend interface
    const transformedJobs = pendingJobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      country: job.country,
      jobType: job.jobType,
      createdAt: job.createdAt.toISOString(),
      employer: {
        id: job.employer.id,
        company: job.employer.company,
        verified: job.employer.verified,
        user: {
          email: job.employer.user.email
        }
      }
    }))

    return NextResponse.json(transformedJobs)
  } catch (error) {
    console.error('Error fetching pending jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending jobs' },
      { status: 500 }
    )
  }
} 