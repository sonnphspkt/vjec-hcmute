import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession, isAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin (in a real app, you'd verify JWT token)
    // For now, we'll trust the session from localStorage
    
    // Get statistics
    const [
      totalJobs,
      pendingJobs,
      approvedJobs,
      totalEmployers,
      verifiedEmployers,
      totalStudents
    ] = await Promise.all([
      prisma.jobPost.count(),
      prisma.jobPost.count({ where: { approved: false } }),
      prisma.jobPost.count({ where: { approved: true } }),
      prisma.employerProfile.count(),
      prisma.employerProfile.count({ where: { verified: true } }),
      prisma.studentProfile.count()
    ])

    const stats = {
      totalJobs,
      pendingJobs,
      approvedJobs,
      rejectedJobs: totalJobs - pendingJobs - approvedJobs,
      totalEmployers,
      verifiedEmployers,
      totalStudents
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
} 