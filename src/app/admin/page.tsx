'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Eye, Clock, Users, Briefcase, Building2, AlertTriangle, FileText, Plus } from 'lucide-react'
import Link from 'next/link'

// Types for data
interface JobPost {
  id: string
  title: string
  description: string
  salary: string
  country: string
  jobType: string
  createdAt: string
  employer: {
    id: string
    company: string
    verified: boolean
    user: {
      email: string
    }
  }
}

interface Stats {
  totalJobs: number
  pendingJobs: number
  approvedJobs: number
  rejectedJobs: number
  totalEmployers: number
  verifiedEmployers: number
  totalStudents: number
}

function StatsCard({ title, value, icon: Icon, color, bgColor }: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  )
}

function JobCard({ job, onApprove, onReject }: {
  job: JobPost
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'FULLTIME': return 'bg-green-100 text-green-800'
      case 'PARTTIME': return 'bg-blue-100 text-blue-800'
      case 'INTERNSHIP': return 'bg-purple-100 text-purple-800'
      case 'REMOTE': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <Building2 className="h-4 w-4" />
              <span>{job.employer.company}</span>
              {!job.employer.verified && (
                <div title="Nhà tuyển dụng chưa xác minh">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(job.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
              {job.jobType}
            </span>
            <span className="text-sm text-gray-600">{job.country}</span>
            <span className="text-sm font-medium text-green-600">{job.salary}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Email: {job.employer.user.email}
          </p>
          <p className="text-sm text-gray-700 line-clamp-3">
            {job.description}
          </p>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={() => onApprove(job.id)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Duyệt
        </button>
        <button
          onClick={() => onReject(job.id)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Từ chối
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Eye className="h-4 w-4 mr-2" />
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    totalJobs: 0,
    pendingJobs: 0,
    approvedJobs: 0,
    rejectedJobs: 0,
    totalEmployers: 0,
    verifiedEmployers: 0,
    totalStudents: 0
  })
  const [pendingJobs, setPendingJobs] = useState<JobPost[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data when component mounts
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch stats and pending jobs
      const [statsResponse, jobsResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/pending-jobs')
      ])
      
      if (statsResponse.ok && jobsResponse.ok) {
        const statsData = await statsResponse.json()
        const jobsData = await jobsResponse.json()
        
        setStats(statsData)
        setPendingJobs(jobsData)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (jobId: string) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/approve`, {
        method: 'POST'
      })
      
      if (response.ok) {
        // Remove from pending jobs list
        setPendingJobs(prev => prev.filter(job => job.id !== jobId))
        // Update stats
        setStats(prev => ({
          ...prev,
          pendingJobs: prev.pendingJobs - 1,
          approvedJobs: prev.approvedJobs + 1
        }))
        alert('Bài đăng đã được duyệt!')
      }
    } catch (error) {
      console.error('Error approving job:', error)
      alert('Có lỗi xảy ra khi duyệt bài đăng!')
    }
  }

  const handleReject = async (jobId: string) => {
    const reason = prompt('Lý do từ chối (tùy chọn):')
    
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      })
      
      if (response.ok) {
        // Remove from pending jobs list
        setPendingJobs(prev => prev.filter(job => job.id !== jobId))
        // Update stats
        setStats(prev => ({
          ...prev,
          pendingJobs: prev.pendingJobs - 1,
          rejectedJobs: prev.rejectedJobs + 1
        }))
        alert('Bài đăng đã bị từ chối!')
      }
    } catch (error) {
      console.error('Error rejecting job:', error)
      alert('Có lỗi xảy ra khi từ chối bài đăng!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng số việc làm"
          value={stats.totalJobs}
          icon={Briefcase}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Chờ duyệt"
          value={stats.pendingJobs}
          icon={Clock}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
        />
        <StatsCard
          title="Nhà tuyển dụng"
          value={stats.totalEmployers}
          icon={Building2}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatsCard
          title="Sinh viên"
          value={stats.totalStudents}
          icon={Users}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quản lý nội dung</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/admin/articles"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    Quản lý bài viết
                  </h3>
                  <p className="text-sm text-gray-600">Tạo và quản lý tin tức tuyển dụng</p>
                </div>
              </div>
              <div className="text-blue-500 group-hover:text-blue-600">
                <Plus className="h-5 w-5" />
              </div>
            </Link>

            <Link 
              href="/admin/external-jobs"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                    External Jobs
                  </h3>
                  <p className="text-sm text-gray-600">Quản lý jobs từ nguồn bên ngoài</p>
                </div>
              </div>
              <div className="text-purple-500 group-hover:text-purple-600">
                <Plus className="h-5 w-5" />
              </div>
            </Link>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg opacity-50">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quản lý người dùng
                  </h3>
                  <p className="text-sm text-gray-600">Sắp ra mắt...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Jobs Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Bài đăng tuyển dụng chờ duyệt ({pendingJobs.length})
          </h2>
        </div>
        <div className="p-6">
          {pendingJobs.length > 0 ? (
            <div className="space-y-6">
              {pendingJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có bài đăng nào cần duyệt
              </h3>
              <p className="text-gray-600">
                Tất cả bài đăng tuyển dụng đã được xử lý.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 