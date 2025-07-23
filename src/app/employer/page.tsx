'use client'
import { useState } from 'react'
import EmployerForm from '@/components/EmployerForm'
import { Briefcase, Eye, Clock, Plus, Users, Star, TrendingUp } from 'lucide-react'

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
  icon: React.ComponentType<{ className?: string }>
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

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Chào mừng đến với Dashboard Nhà tuyển dụng! 👋
        </h3>
        <p className="text-gray-600 mb-4">
          Quản lý tin tuyển dụng hiệu quả và tiếp cận được nhiều ứng viên chất lượng hơn.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium">Premium Features</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Upgrade để mở khóa thêm tính năng</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium">Analytics</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Theo dõi hiệu quả tuyển dụng</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium">Candidate Pool</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Truy cập pool ứng viên HCMUTE</p>
          </div>
        </div>
      </div>

      {/* Tips for better recruitment */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Tips để tuyển dụng hiệu quả hơn
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Viết mô tả công việc chi tiết</p>
              <p className="text-sm text-gray-600">Cung cấp thông tin đầy đủ về yêu cầu, benefits và môi trường làm việc</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Phản hồi nhanh chóng</p>
              <p className="text-sm text-gray-600">Ứng viên đánh giá cao việc được phản hồi kịp thời</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-1 mr-3 mt-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Cập nhật thường xuyên</p>
              <p className="text-sm text-gray-600">Giữ cho tin đăng luôn fresh và relevant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ManageJobsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Quản lý tin đăng tuyển dụng</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm">
          <Plus className="h-4 w-4 mr-2" />
          Đăng tin mới
        </button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm font-medium text-gray-700">
            <div className="md:col-span-2">Tiêu đề công việc</div>
            <div>Trạng thái</div>
            <div>Lượt xem</div>
            <div>Ứng tuyển</div>
            <div>Hành động</div>
          </div>
        </div>
        
        <div className="divide-y">
          {mockRecentJobs.map((job) => (
            <div key={job.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div className="md:col-span-2">
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-500">Đăng ngày {job.createdAt}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status === 'active' ? 'Đang hiển thị' : 'Chờ duyệt'}
                  </span>
                </div>
                <div className="text-gray-900">{job.views}</div>
                <div className="text-gray-900">{job.applications}</div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Xem</button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm">Sửa</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PaymentTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gói dịch vụ hiện tại</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-blue-900">Gói Miễn phí</h4>
              <p className="text-sm text-blue-700">2 tin đăng miễn phí mỗi tháng</p>
            </div>
            <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Đang sử dụng</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Plan */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Gói Cơ bản</h3>
            <div className="text-3xl font-bold text-gray-900 mt-2">299,000₫</div>
            <p className="text-gray-600">/tháng</p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              10 tin đăng/tháng
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Hiển thị trong 30 ngày
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Email hỗ trợ
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Analytics cơ bản
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Nâng cấp
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white p-6 rounded-lg border border-blue-200 relative">
          <div className="absolute top-0 right-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-b text-sm">Phổ biến</span>
          </div>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Gói Premium</h3>
            <div className="text-3xl font-bold text-gray-900 mt-2">799,000₫</div>
            <p className="text-gray-600">/tháng</p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Không giới hạn tin đăng
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Tin đăng nổi bật
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Hỗ trợ ưu tiên
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              Analytics nâng cao
            </li>
            <li className="flex items-center text-sm">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
              CV database access
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Nâng cấp Premium
          </button>
        </div>
      </div>
    </div>
  )
}

function RecentJobsTable() {
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
                Công việc
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lượt xem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ứng tuyển
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
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">Đăng ngày {job.createdAt}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status === 'active' ? 'Đang hiển thị' : 'Chờ duyệt'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.applications}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">Xem</button>
                  <button className="text-gray-600 hover:text-gray-900">Sửa</button>
                  <button className="text-red-600 hover:text-red-900">Xóa</button>
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
  const [activeTab, setActiveTab] = useState('overview')

  const handleNewJobPost = () => {
    setActiveTab('post-job')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />
      case 'post-job':
        return <EmployerForm />
      case 'manage-jobs':
        return <ManageJobsTab />
      case 'payment':
        return <PaymentTab />
      default:
        return <OverviewTab />
    }
  }

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
            <button 
              onClick={handleNewJobPost}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center"
            >
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
              <button 
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tổng quan
              </button>
              <button 
                onClick={() => setActiveTab('post-job')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'post-job'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Đăng tin mới
              </button>
              <button 
                onClick={() => setActiveTab('manage-jobs')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'manage-jobs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Quản lý tin đăng
              </button>
              <button 
                onClick={() => setActiveTab('payment')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payment'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Thanh toán
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Recent Jobs Table - Only show on overview */}
        {activeTab === 'overview' && <RecentJobsTable />}
      </div>
    </div>
  )
} 