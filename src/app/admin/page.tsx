'use client'

import { CheckCircle, XCircle, Eye, Clock, Users, Briefcase, Building2, AlertTriangle } from 'lucide-react'

// Mock data for demonstration
const mockPendingJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Tech Solutions Vietnam',
    salary: '20,000,000 - 30,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    submittedAt: '2024-01-15T10:30:00Z',
    employer: {
      id: 'emp1',
      email: 'hr@techsolutions.vn',
      company: 'Tech Solutions Vietnam',
      verified: false
    }
  },
  {
    id: '2', 
    title: 'Software Engineer - Tokyo Office',
    company: 'Sakura Tech Japan',
    salary: '¥4,500,000 - ¥6,000,000',
    country: 'Nhật Bản',
    jobType: 'FULLTIME',
    submittedAt: '2024-01-14T14:20:00Z',
    employer: {
      id: 'emp2',
      email: 'careers@sakuratech.jp',
      company: 'Sakura Tech Japan',
      verified: true
    }
  },
  {
    id: '3',
    title: 'UX/UI Designer Intern',
    company: 'Creative Studio',
    salary: '5,000,000 - 8,000,000 VND',
    country: 'Việt Nam',
    jobType: 'INTERNSHIP',
    submittedAt: '2024-01-13T09:15:00Z',
    employer: {
      id: 'emp3',
      email: 'design@creativestudio.vn',
      company: 'Creative Studio',
      verified: false
    }
  }
]

const mockStats = {
  totalJobs: 45,
  pendingJobs: 8,
  approvedJobs: 32,
  rejectedJobs: 5,
  totalEmployers: 23,
  verifiedEmployers: 18,
  totalStudents: 156
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
  job: typeof mockPendingJobs[0]
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
              <span>{job.company}</span>
                             {!job.employer.verified && (
                 <div title="Nhà tuyển dụng chưa xác minh">
                   <AlertTriangle className="h-4 w-4 text-yellow-500" />
                 </div>
               )}
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(job.submittedAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
              {job.jobType}
            </span>
            <span className="text-sm text-gray-600">{job.country}</span>
            <span className="text-sm font-medium text-green-600">{job.salary}</span>
          </div>
          <p className="text-sm text-gray-600">
            Email: {job.employer.email}
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
  const handleApprove = async (jobId: string) => {
    // TODO: Implement approve logic
    console.log('Approving job:', jobId)
    alert('Bài đăng đã được duyệt!')
  }

  const handleReject = async (jobId: string) => {
    // TODO: Implement reject logic
    console.log('Rejecting job:', jobId)
    alert('Bài đăng đã bị từ chối!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Quản lý hệ thống VJEC-HCMUTE Job Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Tổng số việc làm"
            value={mockStats.totalJobs}
            icon={Briefcase}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Chờ duyệt"
            value={mockStats.pendingJobs}
            icon={Clock}
            color="text-yellow-600"
            bgColor="bg-yellow-100"
          />
          <StatsCard
            title="Nhà tuyển dụng"
            value={mockStats.totalEmployers}
            icon={Building2}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Sinh viên"
            value={mockStats.totalStudents}
            icon={Users}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>

        {/* Pending Jobs Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Bài đăng tuyển dụng chờ duyệt ({mockPendingJobs.length})
            </h2>
          </div>
          <div className="p-6">
            {mockPendingJobs.length > 0 ? (
              <div className="space-y-6">
                {mockPendingJobs.map((job) => (
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
    </div>
  )
} 