import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// External job sources configuration
const JOB_SOURCES = {
  TOPCV: {
    name: 'TopCV',
    rssUrl: null, // TopCV doesn't provide public RSS
    apiUrl: null, // No public API
    scrapeAllowed: false
  },
  VIETNAMWORKS: {
    name: 'VietnamWorks', 
    rssUrl: null,
    apiUrl: null,
    scrapeAllowed: false
  },
  CAREERBUILDER: {
    name: 'CareerBuilder',
    rssUrl: null,
    apiUrl: null,
    scrapeAllowed: false
  }
} as const

type JobSource = keyof typeof JOB_SOURCES

// Manual job feed integration (legal alternative)
export async function POST(request: NextRequest) {
  try {
    const { source, jobs } = await request.json()
    
    // Validate source
    if (!JOB_SOURCES[source as JobSource]) {
      return NextResponse.json({ error: 'Invalid job source' }, { status: 400 })
    }

    // Process and save jobs (from manual feeds or partnerships)
    const savedJobs = []
    
    for (const jobData of jobs) {
      try {
        const job = await prisma.jobPost.create({
          data: {
            title: jobData.title,
            description: jobData.description,
            salary: jobData.salary,
            country: jobData.country || 'Vietnam',
            jobType: jobData.jobType || 'FULLTIME',
            category: jobData.category,
            skills: JSON.stringify(jobData.skills || []),
            externalSource: source,
            externalId: jobData.externalId,
            externalUrl: jobData.originalUrl,
            employerId: jobData.employerId, // Must have valid employer
            approved: false // Require manual approval
          }
        })
        savedJobs.push(job)
      } catch (error) {
        console.error(`Failed to save job ${jobData.externalId}:`, error)
        // Continue with other jobs
      }
    }

    return NextResponse.json({ 
      success: true, 
      imported: savedJobs.length,
      total: jobs.length,
      message: `Successfully imported ${savedJobs.length}/${jobs.length} jobs from ${source}`
    })

  } catch (error) {
    console.error('Job import error:', error)
    return NextResponse.json({ error: 'Failed to import jobs' }, { status: 500 })
  }
}

// Get external job statistics
export async function GET() {
  try {
    // Get total external jobs
    const totalExternal = await prisma.jobPost.count({
      where: {
        externalSource: {
          not: null
        }
      }
    })

    // Get breakdown by source
    const sourceStats = await Promise.all(
      Object.keys(JOB_SOURCES).map(async (source) => {
        const count = await prisma.jobPost.count({
          where: {
            externalSource: source
          }
        })
        return { source, count }
      })
    )

    return NextResponse.json({
      totalExternalJobs: totalExternal,
      sourceBreakdown: sourceStats.filter(stat => stat.count > 0),
      availableSources: Object.keys(JOB_SOURCES),
      lastUpdated: new Date()
    })

  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
  }
} 