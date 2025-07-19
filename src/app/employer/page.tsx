import EmployerForm from '@/components/EmployerForm'
import { Briefcase, Eye, DollarSign, Clock, Plus } from 'lucide-react'

// Mock data for demonstration
const mockStats = {
  totalJobs: 12,
  activeJobs: 8,
  pendingJobs: 3,
  totalViews: 1547
}

const mockRecentJobs = [
  {
    id: '1',
    title: 'Frontend Developer - React/Next.js',
    status: 'active',
    views: 234,
    applications: 12,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Backend Engineer - Node.js',
    status: 'pending',
    views: 89,
    applications: 5,
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    status: 'active',
    views: 156,
    applications: 8,
    createdAt: '2024-01-10'
  }
]

function StatsCard({ title, value, icon: Icon, color }: {
  title: string
  value: number
  icon: any
  color: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function RecentJobsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang hiển thị'
      case 'pending': return 'Chờ duyệt'
      case 'expired': return 'Hết hạn'
      default: return status
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Tin đăng gần đây</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiêu đề công việc
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lượt xem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ứng viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đăng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockRecentJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                    {getStatusText(job.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.applications}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Xem
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function EmployerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Nhà tuyển dụng
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý tin đăng tuyển dụng và theo dõi hiệu quả
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Đăng tin mới
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Tổng tin đăng"
            value={mockStats.totalJobs}
            icon={Briefcase}
            color="bg-blue-500"
          />
          <StatsCard
            title="Đang hiển thị"
            value={mockStats.activeJobs}
            icon={Eye}
            color="bg-green-500"
          />
          <StatsCard
            title="Chờ duyệt"
            value={mockStats.pendingJobs}
            icon={Clock}
            color="bg-yellow-500"
          />
          <StatsCard
            title="Tổng lượt xem"
            value={mockStats.totalViews}
            icon={Eye}
            color="bg-purple-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Tổng quan
              </button>
              <button className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Đăng tin mới
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Quản lý tin đăng
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Thanh toán
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <EmployerForm />
          </div>
        </div>

        {/* Recent Jobs Table */}
        <RecentJobsTable />
      </div>
    </div>
  )
} 