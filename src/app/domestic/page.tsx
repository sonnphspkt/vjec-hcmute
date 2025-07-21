'use client'
import { Suspense, useState } from 'react'
import JobCard from '@/components/JobCard'
import { Search, Filter, MapPin, Building, TrendingUp } from 'lucide-react'

// Mock domestic jobs data - focused on Vietnam
const mockDomesticJobs = [
  {
    id: '1',
    title: 'Senior Full-stack Developer',
    description: 'Phát triển ứng dụng web full-stack cho hệ thống ngân hàng số. Sử dụng React, Node.js, và PostgreSQL. Yêu cầu có kinh nghiệm 3+ năm và hiểu biết về fintech.',
    salary: '25,000,000 - 40,000,000 VND',
    country: 'Việt Nam',
    location: 'TP. Hồ Chí Minh',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    createdAt: new Date('2024-01-20'),
    employer: {
      company: 'VietcomBank Digital'
    },
    featured: true
  },
  {
    id: '2',
    title: 'Frontend Developer (React/Vue.js)',
    description: 'Tham gia xây dựng giao diện người dùng cho các ứng dụng e-commerce lớn. Làm việc với team quốc tế, môi trường năng động và nhiều thách thức.',
    salary: '18,000,000 - 28,000,000 VND',
    country: 'Việt Nam',
    location: 'Hà Nội',
    jobType: 'FULLTIME',
    category: 'Phát triển web',
    skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
    createdAt: new Date('2024-01-18'),
    employer: {
      company: 'Tiki Corporation'
    },
    featured: true
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    description: 'Quản lý hạ tầng cloud, CI/CD pipeline và monitoring systems. Cơ hội làm việc với các công nghệ hiện đại và scale lớn.',
    salary: '30,000,000 - 50,000,000 VND',
    country: 'Việt Nam',
    location: 'TP. Hồ Chí Minh',
    jobType: 'FULLTIME',
    category: 'DevOps',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Jenkins'],
    createdAt: new Date('2024-01-15'),
    employer: {
      company: 'FPT Software'
    },
    featured: false
  },
  {
    id: '4',
    title: 'Data Scientist - Fresher Welcome',
    description: 'Phân tích dữ liệu khách hàng và xây dựng các mô hình machine learning. Chào đón fresher có passion về data science.',
    salary: '15,000,000 - 25,000,000 VND',
    country: 'Việt Nam',
    location: 'Đà Nẵng',
    jobType: 'FULLTIME',
    category: 'Data Science',
    skills: ['Python', 'SQL', 'Machine Learning', 'Tableau'],
    createdAt: new Date('2024-01-12'),
    employer: {
      company: 'VNG Corporation'
    },
    featured: false
  },
  {
    id: '5',
    title: 'Mobile App Developer (Flutter)',
    description: 'Phát triển ứng dụng mobile cross-platform cho startup fintech. Cơ hội tham gia từ giai đoạn đầu và có equity.',
    salary: '20,000,000 - 35,000,000 VND + Equity',
    country: 'Việt Nam',
    location: 'TP. Hồ Chí Minh',
    jobType: 'FULLTIME',
    category: 'Mobile Development',
    skills: ['Flutter', 'Dart', 'Firebase', 'RESTful API'],
    createdAt: new Date('2024-01-10'),
    employer: {
      company: 'Momo (M_Service)'
    },
    featured: false
  },
  {
    id: '6',
    title: 'UI/UX Designer',
    description: 'Thiết kế trải nghiệm người dùng cho ứng dụng giáo dục online. Yêu cầu có portfolio chất lượng và hiểu biết về user research.',
    salary: '18,000,000 - 30,000,000 VND',
    country: 'Việt Nam',
    location: 'Hà Nội',
    jobType: 'FULLTIME',
    category: 'UI/UX Design',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
    createdAt: new Date('2024-01-08'),
    employer: {
      company: 'ELSA Corp'
    },
    featured: false
  },
  {
    id: '7',
    title: 'Backend Developer (Java/Spring)',
    description: 'Xây dựng và maintain các microservices cho hệ thống logistics. Làm việc với high-traffic applications và distributed systems.',
    salary: '22,000,000 - 38,000,000 VND',
    country: 'Việt Nam',
    location: 'TP. Hồ Chí Minh',
    jobType: 'FULLTIME',
    category: 'Backend Development',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Redis'],
    createdAt: new Date('2024-01-05'),
    employer: {
      company: 'Grab Vietnam'
    },
    featured: false
  },
  {
    id: '8',
    title: 'Intern - Software Developer',
    description: 'Chương trình thực tập 6 tháng với mentorship từ senior developers. Cơ hội học hỏi và phát triển skills thực tế.',
    salary: '6,000,000 - 10,000,000 VND',
    country: 'Việt Nam',
    location: 'Hà Nội',
    jobType: 'INTERNSHIP',
    category: 'Internship',
    skills: ['Java', 'Python', 'SQL', 'Git'],
    createdAt: new Date('2024-01-03'),
    employer: {
      company: 'Viettel Cyber Security'
    },
    featured: false
  }
]

const locations = ['Tất cả thành phố', 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng']
const jobTypes = [
  { value: 'all', label: 'Tất cả loại hình' },
  { value: 'FULLTIME', label: 'Toàn thời gian' },
  { value: 'PARTTIME', label: 'Bán thời gian' },
  { value: 'INTERNSHIP', label: 'Thực tập' },
  { value: 'CONTRACT', label: 'Hợp đồng' }
]

function JobFilters() {
  const [selectedLocation, setSelectedLocation] = useState('Tất cả thành phố')
  const [selectedJobType, setSelectedJobType] = useState('all')

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Lọc việc làm trong nước
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
            <MapPin className="h-4 w-4 inline mr-1" />
            Thành phố
          </label>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại hình công việc
          </label>
          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {jobTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mức lương (triệu VND)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Từ"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Đến"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kinh nghiệm
          </label>
          <div className="space-y-2">
            {[
              { value: 'fresher', label: 'Fresher (0-1 năm)' },
              { value: 'junior', label: 'Junior (1-3 năm)' },
              { value: 'senior', label: 'Senior (3+ năm)' },
              { value: 'lead', label: 'Lead/Manager' }
            ].map((level) => (
              <label key={level.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Tìm kiếm việc làm
        </button>
      </div>
    </div>
  )
}

function FeaturedSection() {
  const featuredJobs = mockDomesticJobs.filter(job => job.featured)
  
  return (
    <section className="mb-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Việc làm nổi bật</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredJobs.map((job) => (
          <div key={job.id} className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </section>
  )
}

function JobsList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Tất cả việc làm trong nước ({mockDomesticJobs.length} kết quả)
        </h2>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <option>Mới nhất</option>
          <option>Lương cao nhất</option>
          <option>Phù hợp nhất</option>
          <option>Gần nhất</option>
        </select>
      </div>

      <div className="grid gap-6">
        {mockDomesticJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 pt-8">
        <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          Trước
        </button>
        {[1, 2, 3, '...', 8].map((page, index) => (
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

export default function DomesticJobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              🇻🇳 Việc làm trong nước
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Khám phá hàng nghìn cơ hội việc làm chất lượng tại Việt Nam từ các doanh nghiệp uy tín
            </p>
            <div className="mt-6 flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                <span>500+ công ty</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>63 tỉnh thành</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span>Cập nhật hàng ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Jobs */}
        <FeaturedSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <JobFilters />
            
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
              <h3 className="text-lg font-semibold mb-4">Thống kê nhanh</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">TP.HCM</span>
                  <span className="font-semibold text-blue-600">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hà Nội</span>
                  <span className="font-semibold text-blue-600">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đà Nẵng</span>
                  <span className="font-semibold text-blue-600">12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Khác</span>
                  <span className="font-semibold text-blue-600">8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="text-center py-12">Đang tải...</div>}>
              <JobsList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 