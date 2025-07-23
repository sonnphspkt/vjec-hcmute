import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    // Check admin access
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobIds } = await request.json()

    if (!Array.isArray(jobIds) || jobIds.length === 0) {
      return NextResponse.json({ error: 'Invalid job IDs' }, { status: 400 })
    }

    // Bulk update jobs to approved
    const updateResult = await prisma.jobPost.updateMany({
      where: {
        id: {
          in: jobIds
        }
      },
      data: {
        approved: true
      }
    })

    return NextResponse.json({
      success: true,
      updatedCount: updateResult.count,
      message: `Successfully approved ${updateResult.count} jobs`
    })

  } catch (error) {
    console.error('Bulk approval error:', error)
    return NextResponse.json({ error: 'Failed to bulk approve jobs' }, { status: 500 })
  }
} 