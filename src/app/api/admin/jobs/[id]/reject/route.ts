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
    const body = await request.json()
    const { reason } = body

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
        { error: 'Cannot reject an approved job' },
        { status: 400 }
      )
    }

    // For now, we'll delete the rejected job
    // In a real system, you might want to keep it with a 'rejected' status
    await prisma.jobPost.delete({
      where: { id: jobId }
    })

    // TODO: In a real system, you might want to:
    // 1. Send notification to employer about rejection
    // 2. Keep rejection record for audit purposes
    // 3. Store rejection reason

    return NextResponse.json({
      message: 'Job rejected and removed successfully',
      reason: reason || 'No reason provided'
    })
  } catch (error) {
    console.error('Error rejecting job:', error)
    return NextResponse.json(
      { error: 'Failed to reject job' },
      { status: 500 }
    )
  }
} 