'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import JobCard from '@/components/JobCard'
import { Search, Filter } from 'lucide-react'

// Mock data for demonstration - expanded for pagination testing
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
    title: 'UX/UI Designer - Remote',
    description: 'Thiết kế giao diện người dùng cho các ứng dụng di động và web. Làm việc từ xa, flexible working hours.',
    salary: '12,000,000 - 20,000,000 VND',
    country: 'Remote',
    jobType: 'FULLTIME',
    category: 'Thiết kế',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research'],
    createdAt: new Date('2024-01-08'),
    employer: {
      company: 'Creative Studio'
    }
  },
  {
    id: '5',
    title: 'Marketing Executive - Singapore',
    description: 'Marketing position tại Singapore với cơ hội phát triển career quốc tế. Company sẽ sponsor work permit.',
    salary: 'S$3,500 - S$5,000',
    country: 'Singapore',
    jobType: 'FULLTIME',
    category: 'Marketing',
    skills: ['Digital Marketing', 'Social Media', 'Analytics', 'English'],
    createdAt: new Date('2024-01-05'),
    employer: {
      company: 'Global Marketing Solutions'
    }
  },
  {
    id: '6',
    title: 'Backend Developer - Node.js',
    description: 'Phát triển API và hệ thống backend với Node.js, Express và MongoDB. Cần có kinh nghiệm với microservices và cloud platforms.',
    salary: '18,000,000 - 30,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    createdAt: new Date('2024-01-14'),
    employer: {
      company: 'CloudTech Vietnam'
    }
  },
  {
    id: '7',
    title: 'DevOps Engineer - Seoul',
    description: 'Quản lý infrastructure và CI/CD pipelines tại Seoul, Hàn Quốc. Làm việc với Kubernetes, Docker và các công nghệ cloud.',
    salary: '₩35,000,000 - ₩50,000,000',
    country: 'Hàn Quốc',
    jobType: 'FULLTIME',
    category: 'Phần mềm',
    skills: ['Kubernetes', 'Docker', 'Jenkins', 'AWS'],
    createdAt: new Date('2024-01-13'),
    employer: {
      company: 'Seoul DevOps Co.'
    }
  },
  {
    id: '8',
    title: 'Mobile App Developer - Flutter',
    description: 'Phát triển ứng dụng di động cross-platform với Flutter. Làm việc trong team agile và phát triển sản phẩm từ ý tưởng đến deployment.',
    salary: '16,000,000 - 28,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    createdAt: new Date('2024-01-11'),
    employer: {
      company: 'Mobile Innovations'
    }
  },
  {
    id: '9',
    title: 'AI/ML Engineer - Research Lab',
    description: 'Nghiên cứu và phát triển các mô hình Machine Learning và Deep Learning. Làm việc với datasets lớn và implement các algorithms tiên tiến.',
    salary: '25,000,000 - 40,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Dữ liệu',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
    createdAt: new Date('2024-01-09'),
    employer: {
      company: 'AI Research Lab'
    }
  },
  {
    id: '10',
    title: 'Product Manager - Fintech',
    description: 'Quản lý sản phẩm fintech, làm việc với team development để deliver các tính năng mới. Cần hiểu biết về banking và payment systems.',
    salary: '22,000,000 - 35,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Tài chính',
    skills: ['Product Management', 'Fintech', 'Agile', 'Data Analysis'],
    createdAt: new Date('2024-01-07'),
    employer: {
      company: 'FinTech Solutions'
    }
  },
  {
    id: '11',
    title: 'Cybersecurity Specialist - Remote',
    description: 'Bảo mật hệ thống và network, phân tích threats và implement security measures. Làm việc remote với team quốc tế.',
    salary: '$2,500 - $4,000',
    country: 'Remote',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['Network Security', 'Penetration Testing', 'CISSP', 'Incident Response'],
    createdAt: new Date('2024-01-06'),
    employer: {
      company: 'CyberGuard International'
    }
  },
  {
    id: '12',
    title: 'QA Engineer - Manual & Automation',
    description: 'Thực hiện testing manual và automation cho web applications. Viết test cases và maintain test frameworks.',
    salary: '12,000,000 - 22,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Phần mềm',
    skills: ['Manual Testing', 'Selenium', 'Test Automation', 'API Testing'],
    createdAt: new Date('2024-01-04'),
    employer: {
      company: 'Quality Assurance Pro'
    }
  },
  {
    id: '13',
    title: 'Business Analyst - Banking',
    description: 'Phân tích business requirements và thiết kế solutions cho ngành banking. Làm việc với stakeholders để hiểu và document processes.',
    salary: '15,000,000 - 25,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Tài chính',
    skills: ['Business Analysis', 'Banking Domain', 'Requirements Gathering', 'Process Modeling'],
    createdAt: new Date('2024-01-03'),
    employer: {
      company: 'Banking Solutions Corp'
    }
  },
  {
    id: '14',
    title: 'Game Developer - Unity',
    description: 'Phát triển games mobile với Unity engine. Làm việc trong team creative để tạo ra những game experiences thú vị.',
    salary: '14,000,000 - 26,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Thiết kế',
    skills: ['Unity', 'C#', 'Game Design', '3D Modeling'],
    createdAt: new Date('2024-01-02'),
    employer: {
      company: 'Game Studio Vietnam'
    }
  },
  {
    id: '15',
    title: 'Cloud Architect - AWS',
    description: 'Thiết kế và implement cloud infrastructure trên AWS. Lead technical decisions và mentor junior developers.',
    salary: '30,000,000 - 50,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['AWS', 'Cloud Architecture', 'Terraform', 'Microservices'],
    createdAt: new Date('2024-01-01'),
    employer: {
      company: 'Cloud Excellence'
    }
  },
  {
    id: '16',
    title: 'Nhân Viên Bán Hàng tại Showroom Q.2',
    description: 'MÔ TẢ CÔNG VIỆC - Tư vấn sản phẩm phù hợp với nhu cầu của khách hàng. - Thuyết phục khách hàng mua sản phẩm. - Làm báo giá, lên đơn hàng cho khách. - Chăm sóc và duy trì mối quan hệ với khách hàng. - Trưng bày, chăm sóc, bảo quản sản phẩm theo quy định. - Thực hiện một số công việc khác theo yêu cầu cấp trên. **** Lương: thỏa thuận ****',
    salary: 'Thỏa thuận',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Thị trường việc làm',
    skills: ['Bán hàng', 'Tư vấn khách hàng', 'Chăm sóc khách hàng'],
    createdAt: new Date('2025-07-23'),
    employer: {
      company: 'CÔNG TY CP XNK HÀNG VIỆT'
    }
  }
]

function JobFilters({ 
  filters, 
  onFiltersChange 
}: { 
  filters: any, 
  onFiltersChange: (filters: any) => void 
}) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const applyFilters = () => {
    // Trigger re-filter (this is handled by parent component)
    console.log('Applying filters:', filters)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Bộ lọc
      </h3>
      
      <div className="space-y-4">
        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quốc gia
          </label>
          <select 
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Nhật Bản">Nhật Bản</option>
            <option value="Singapore">Singapore</option>
            <option value="Hàn Quốc">Hàn Quốc</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại công việc
          </label>
          <select 
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            <option value="FULLTIME">Toàn thời gian</option>
            <option value="PARTTIME">Bán thời gian</option>
            <option value="INTERNSHIP">Thực tập</option>
            <option value="CONTRACT">Hợp đồng</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lĩnh vực
          </label>
          <select 
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tất cả</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Phần mềm">Phần mềm</option>
            <option value="Dữ liệu">Dữ liệu</option>
            <option value="Thiết kế">Thiết kế</option>
            <option value="Marketing">Marketing</option>
            <option value="Tài chính">Tài chính</option>
            <option value="Nhân sự">Nhân sự</option>
          </select>
        </div>

        <button 
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  )
}

function JobsList({ 
  searchQuery, 
  filters, 
  sortBy, 
  currentPage, 
  onPageChange 
}: { 
  searchQuery: string,
  filters: any,
  sortBy: string,
  currentPage: number,
  onPageChange: (page: number) => void
}) {
  // Filter and sort jobs
  let filteredJobs = mockJobs.filter(job => {
    // Search filter
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !job.employer.company.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Country filter
    if (filters.country && job.country !== filters.country) {
      return false
    }
    
    // Job type filter
    if (filters.jobType && job.jobType !== filters.jobType) {
      return false
    }
    
    // Category filter
    if (filters.category && job.category !== filters.category) {
      return false
    }
    
    return true
  })

  // Sort jobs
  if (sortBy === 'newest') {
    filteredJobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  } else if (sortBy === 'oldest') {
    filteredJobs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  // Pagination
  const jobsPerPage = 5
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Danh sách việc làm ({filteredJobs.length} kết quả)
        </h2>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Không tìm thấy việc làm phù hợp</p>
          <p className="text-gray-400 text-sm mt-2">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 pt-8">
              <button 
                onClick={() => {
                  console.log('Trước button clicked')
                  onPageChange(Math.max(1, currentPage - 1))
                }}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              
              {/* Page Numbers */}
              {(() => {
                const maxVisiblePages = 5
                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
                
                // Adjust if we're near the end
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1)
                }
                
                const pages = []
                
                // Always show page 1 if not in range
                if (startPage > 1) {
                  pages.push(
                    <button
                      key={1}
                      onClick={() => {
                        console.log('First page (1) button clicked')
                        onPageChange(1)
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      1
                    </button>
                  )
                  
                  if (startPage > 2) {
                    pages.push(
                      <span key="ellipsis1" className="px-2 text-gray-400">...</span>
                    )
                  }
                }
                
                // Show page numbers in range
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => {
                        console.log(`Page ${i} button clicked`)
                        onPageChange(i)
                      }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg ${
                        i === currentPage
                          ? 'text-white bg-blue-600 border border-blue-600'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i}
                    </button>
                  )
                }
                
                // Always show last page if not in range
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis2" className="px-2 text-gray-400">...</span>
                    )
                  }
                  
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => {
                        console.log(`Last page (${totalPages}) button clicked`)
                        onPageChange(totalPages)
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  )
                }
                
                return pages
              })()}
              
              <button 
                onClick={() => {
                  console.log('Sau button clicked')
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function JobsContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    country: '',
    jobType: '',
    category: ''
  })
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Get initial search query from URL
    const query = searchParams.get('search') || ''
    const country = searchParams.get('country') || ''
    const type = searchParams.get('type') || ''
    
    setSearchQuery(query)
    setFilters(prev => ({
      ...prev,
      country: country,
      jobType: type
    }))
  }, [searchParams])

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    console.log('handlePageChange called with page:', page)
    console.log('Current page before change:', currentPage)
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Add alert for testing
    alert(`Changing to page ${page}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1">
        <JobFilters 
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      {/* Jobs List */}
      <div className="lg:col-span-3">
        <div className="mb-4 flex justify-between items-center">
          <div>
            {searchQuery && (
              <p className="text-gray-600">
                Kết quả tìm kiếm cho: "<span className="font-medium">{searchQuery}</span>"
              </p>
            )}
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>
        
        <JobsList 
          searchQuery={searchQuery}
          filters={filters}
          sortBy={sortBy}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
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
        <Suspense fallback={<div>Đang tải...</div>}>
          <JobsContent />
        </Suspense>
      </div>
    </div>
  )
} 