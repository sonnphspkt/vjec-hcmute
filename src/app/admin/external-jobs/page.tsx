import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ExternalJobsManager from '@/components/admin/ExternalJobsManager'

async function getExternalJobs() {
  const jobs = await prisma.jobPost.findMany({
    where: {
      externalSource: {
        not: null
      }
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
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  })

  return jobs
}

async function getJobStats() {
  const totalExternal = await prisma.jobPost.count({
    where: {
      externalSource: {
        not: null
      }
    }
  })

  const pendingApproval = await prisma.jobPost.count({
    where: {
      externalSource: {
        not: null
      },
      approved: false
    }
  })

  const sourceStats = await Promise.all([
    'TOPCV',
    'VIETNAMWORKS', 
    'CAREERBUILDER',
    'JOBSGO',
    'GLINTS',
    'INDEED',
    'CAREERLINK',
    'JOBSTREET'
  ].map(async (source) => {
    const count = await prisma.jobPost.count({
      where: {
        externalSource: source
      }
    })
    return { source, count }
  }))

  return {
    totalExternal,
    pendingApproval,
    sourceStats: sourceStats.filter(stat => stat.count > 0)
  }
}

export default async function ExternalJobsPage() {
  const session = await getServerSession()
  
  // Kiểm tra admin role
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    redirect('/auth/login')
  }

  const [jobs, stats] = await Promise.all([
    getExternalJobs(),
    getJobStats()
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quản lý Jobs từ External Sources
        </h1>
        <p className="text-gray-600">
          Import, approve và quản lý job posts từ các nguồn bên ngoài
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng External Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalExternal}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chờ Approval</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApproval}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Sources</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sourceStats.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Source Breakdown */}
      {stats.sourceStats.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Breakdown theo Source</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.sourceStats.map((stat) => (
                <div key={stat.source} className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stat.count}</div>
                  <div className="text-sm text-gray-600">{stat.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* External Jobs Manager Component */}
      <Suspense fallback={
        <div className="bg-white rounded-lg shadow p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      }>
        <ExternalJobsManager initialJobs={jobs} />
      </Suspense>
    </div>
  )
} 