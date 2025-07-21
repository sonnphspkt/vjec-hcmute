import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const jobId = params.id

    // Check if job exists and is pending
    const job = await prisma.jobPost.findUnique({
      where: { id: jobId }
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.approved) {
      return NextResponse.json(
        { error: 'Job already approved' },
        { status: 400 }
      )
    }

    // Approve the job
    const updatedJob = await prisma.jobPost.update({
      where: { id: jobId },
      data: { approved: true }
    })

    return NextResponse.json({
      message: 'Job approved successfully',
      job: updatedJob
    })
  } catch (error) {
    console.error('Error approving job:', error)
    return NextResponse.json(
      { error: 'Failed to approve job' },
      { status: 500 }
    )
  }
} 