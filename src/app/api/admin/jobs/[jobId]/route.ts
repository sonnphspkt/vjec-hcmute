import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
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

    // Delete the job post
    await prisma.jobPost.delete({
      where: {
        id: jobId
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully'
    })

  } catch (error) {
    console.error('Job deletion error:', error)
    
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }
    
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
} 