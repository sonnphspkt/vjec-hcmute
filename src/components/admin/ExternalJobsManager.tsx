'use client'

import { useState } from 'react'
import { JobPost, EmployerProfile, User } from '@prisma/client'

type ExternalJob = JobPost & {
  employer: EmployerProfile & {
    user: {
      email: string
    }
  }
}

interface ExternalJobsManagerProps {
  initialJobs: ExternalJob[]
}

export default function ExternalJobsManager({ initialJobs }: ExternalJobsManagerProps) {
  const [jobs, setJobs] = useState<ExternalJob[]>(initialJobs)
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [selectedSource, setSelectedSource] = useState<string>('all')

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    const statusMatch = filter === 'all' || 
      (filter === 'pending' && !job.approved) ||
      (filter === 'approved' && job.approved)
    
    const sourceMatch = selectedSource === 'all' || job.externalSource === selectedSource
    
    return statusMatch && sourceMatch
  })

  // Get unique sources
  const sources = Array.from(new Set(
    jobs.map(job => job.externalSource).filter(Boolean) as string[]
  ))

  const handleApprove = async (jobId: string) => {
    setLoading(jobId)
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/approve`, {
        method: 'POST'
      })
      
      if (response.ok) {
        setJobs(prev => prev.map(job => 
          job.id === jobId ? { ...job, approved: true } : job
        ))
      } else {
        alert('Lỗi khi approve job')
      }
    } catch (error) {
      console.error('Approve error:', error)
      alert('Lỗi khi approve job')
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (jobId: string) => {
    setLoading(jobId)
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setJobs(prev => prev.filter(job => job.id !== jobId))
      } else {
        alert('Lỗi khi reject job')
      }
    } catch (error) {
      console.error('Reject error:', error)
      alert('Lỗi khi reject job')
    } finally {
      setLoading(null)
    }
  }

  const handleBulkApprove = async () => {
    const pendingJobs = filteredJobs.filter(job => !job.approved)
    if (pendingJobs.length === 0) return
    
    const confirmed = confirm(`Approve ${pendingJobs.length} jobs?`)
    if (!confirmed) return

    setLoading('bulk')
    try {
      const response = await fetch('/api/admin/jobs/bulk-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobIds: pendingJobs.map(job => job.id) 
        })
      })
      
      if (response.ok) {
        setJobs(prev => prev.map(job => 
          pendingJobs.find(pJob => pJob.id === job.id) 
            ? { ...job, approved: true } 
            : job
        ))
      } else {
        alert('Lỗi khi bulk approve')
      }
    } catch (error) {
      console.error('Bulk approve error:', error)
      alert('Lỗi khi bulk approve')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header with filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-medium text-gray-900">
            External Jobs ({filteredJobs.length})
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status Filter */}
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ approval</option>
              <option value="approved">Đã approve</option>
            </select>

            {/* Source Filter */}
            <select 
              value={selectedSource} 
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">Tất cả nguồn</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>

            {/* Bulk Actions */}
            {filteredJobs.some(job => !job.approved) && (
              <button
                onClick={handleBulkApprove}
                disabled={loading === 'bulk'}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
              >
                {loading === 'bulk' ? 'Approving...' : 'Approve All'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="divide-y divide-gray-200">
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Không có external jobs nào
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {job.title}
                    </h3>
                    
                    {/* Source Badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.externalSource}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Company:</strong> {job.employer.company}</p>
                    <p><strong>Email:</strong> {job.employer.user.email}</p>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Country:</strong> {job.country}</p>
                    <p><strong>Created:</strong> {new Date(job.createdAt).toLocaleString('vi-VN')}</p>
                    {job.externalUrl && (
                      <p>
                        <strong>Original URL:</strong>{' '}
                        <a 
                          href={job.externalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View Original
                        </a>
                      </p>
                    )}
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-4 flex-shrink-0">
                  <div className="flex gap-2">
                    {!job.approved && (
                      <button
                        onClick={() => handleApprove(job.id)}
                        disabled={loading === job.id}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                      >
                        {loading === job.id ? 'Approving...' : 'Approve'}
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleReject(job.id)}
                      disabled={loading === job.id}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
                    >
                      {loading === job.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 