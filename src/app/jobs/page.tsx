import { Suspense } from 'react'
import JobCard from '@/components/JobCard'
import { Search, Filter } from 'lucide-react'

// Mock data for demonstration
const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer - React/Next.js',
    description: 'Tìm kiếm Frontend Developer có kinh nghiệm với React và Next.js để phát triển các ứng dụng web hiện đại. Yêu cầu có kinh nghiệm ít nhất 2 năm và thành thạo TypeScript.',
    salary: '15,000,000 - 25,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    createdAt: new Date('2024-01-15'),
    employer: {
      company: 'Tech Solutions Vietnam'
    }
  },
  {
    id: '2',
    title: 'Software Engineer - Tokyo Office',
    description: 'Cơ hội làm việc tại Tokyo, Nhật Bản cho vị trí Software Engineer. Công ty hỗ trợ visa và nhà ở. Yêu cầu tiếng Nhật N3 trở lên và kinh nghiệm lập trình 1-3 năm.',
    salary: '¥3,500,000 - ¥5,000,000',
    country: 'Nhật Bản',
    jobType: 'FULLTIME',
    category: 'Phần mềm',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Japanese N3'],
    createdAt: new Date('2024-01-12'),
    employer: {
      company: 'NipponTech Corp'
    }
  },
  {
    id: '3',
    title: 'Data Analytics Intern',
    description: 'Chương trình thực tập 6 tháng về Data Analytics tại công ty fintech hàng đầu. Học hỏi từ các chuyên gia và làm việc với dữ liệu thực tế.',
    salary: '5,000,000 - 8,000,000 VND',
    country: 'Việt Nam',
    jobType: 'INTERNSHIP',
    category: 'Dữ liệu',
    skills: ['Python', 'SQL', 'Power BI', 'Statistics'],
    createdAt: new Date('2024-01-10'),
    employer: {
      company: 'FinData Analytics'
    }
  },
  {
    id: '4',
    title: 'Remote UI/UX Designer',
    description: 'Thiết kế giao diện người dùng cho các ứng dụng mobile và web. Làm việc remote 100% với team quốc tế.',
    salary: '$1,200 - $2,000 USD',
    country: 'Remote',
    jobType: 'REMOTE',
    category: 'Thiết kế',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    createdAt: new Date('2024-01-08'),
    employer: {
      company: 'Global Design Studio'
    }
  },
  {
    id: '5',
    title: 'Marketing Assistant - Part-time',
    description: 'Hỗ trợ team marketing trong các hoạt động quảng bá sản phẩm và quản lý social media. Thời gian linh hoạt, phù hợp cho sinh viên.',
    salary: '100,000 - 150,000 VND/giờ',
    country: 'Việt Nam',
    jobType: 'PARTTIME',
    category: 'Marketing',
    skills: ['Social Media', 'Content Writing', 'Canva', 'Facebook Ads'],
    createdAt: new Date('2024-01-05'),
    employer: {
      company: 'Creative Marketing Agency'
    }
  }
]

function JobFilters() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Bộ lọc tìm kiếm
      </h3>
      
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Từ khóa
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo vị trí, công ty..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa điểm
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Tất cả địa điểm</option>
            <option value="vietnam">Việt Nam</option>
            <option value="japan">Nhật Bản</option>
            <option value="singapore">Singapore</option>
            <option value="korea">Hàn Quốc</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại hình công việc
          </label>
          <div className="space-y-2">
            {[
              { value: 'FULLTIME', label: 'Toàn thời gian' },
              { value: 'PARTTIME', label: 'Bán thời gian' },
              { value: 'INTERNSHIP', label: 'Thực tập' },
              { value: 'REMOTE', label: 'Remote' }
            ].map((type) => (
              <label key={type.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lĩnh vực
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">Tất cả lĩnh vực</option>
            <option value="it">Công nghệ thông tin</option>
            <option value="marketing">Marketing</option>
            <option value="design">Thiết kế</option>
            <option value="finance">Tài chính</option>
            <option value="hr">Nhân sự</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  )
}

function JobsList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Danh sách việc làm ({mockJobs.length} kết quả)
        </h2>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option>Mới nhất</option>
          <option>Lương cao nhất</option>
          <option>Phù hợp nhất</option>
        </select>
      </div>

      <div className="grid gap-6">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 pt-8">
        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Trước
        </button>
        {[1, 2, 3, '...', 10].map((page, index) => (
          <button
            key={index}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              page === 1
                ? 'text-white bg-blue-600 border border-blue-600'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Sau
        </button>
      </div>
    </div>
  )
}

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tìm kiếm việc làm
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá hàng nghìn cơ hội việc làm từ các doanh nghiệp uy tín trong và ngoài nước
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <JobFilters />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Đang tải...</div>}>
              <JobsList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 