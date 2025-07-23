import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const session = await getServerSession()
    
    // Check admin access
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId } = params

    // Update job approval status
    const updatedJob = await prisma.jobPost.update({
      where: {
        id: jobId
      },
      data: {
        approved: true
      },
      include: {
        employer: {
          select: {
            company: true,
            user: {
              select: {
                email: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      job: updatedJob,
      message: 'Job approved successfully'
    })

  } catch (error) {
    console.error('Job approval error:', error)
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }
    
    return NextResponse.json({ error: 'Failed to approve job' }, { status: 500 })
  }
} 