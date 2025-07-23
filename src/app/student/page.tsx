'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StudentCVForm from '@/components/StudentCVForm'
import { Briefcase, FileText, TrendingUp, Clock, Download, BookOpen, MessageCircle } from 'lucide-react'

// Mock recommended jobs for student
const mockRecommendedJobs = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    description: 'Cơ hội thực tập tuyệt vời cho sinh viên IT. Học hỏi React, Next.js từ đội ngũ senior experience.',
    salary: '3,000,000 - 5,000,000 VND',
    country: 'Việt Nam',
    jobType: 'INTERNSHIP',
    category: 'Công nghệ thông tin',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    createdAt: new Date('2024-01-15'),
    employer: {
      company: 'Tech Startup VN'
    }
  },
  {
    id: '2', 
    title: 'Software Engineer - Entry Level',
    description: 'Vị trí entry-level cho sinh viên mới tốt nghiệp. Training đầy đủ, môi trường thân thiện.',
    salary: '12,000,000 - 18,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME',
    category: 'Công nghệ thông tin',
    skills: ['Java', 'Spring Boot', 'MySQL'],
    createdAt: new Date('2024-01-14'),
    employer: {
      company: 'Software Solutions Co.'
    }
  },
  {
    id: '3',
    title: 'IT Support Specialist',
    description: 'Hỗ trợ kỹ thuật cho công ty Nhật Bản tại TP.HCM. Cơ hội học tiếng Nhật và phát triển career.',
    salary: '8,000,000 - 12,000,000 VND',
    country: 'Việt Nam',
    jobType: 'FULLTIME', 
    category: 'Công nghệ thông tin',
    skills: ['Windows', 'Networking', 'Tiếng Nhật N4+'],
    createdAt: new Date('2024-01-13'),
    employer: {
      company: 'Sakura Technologies'
    }
  }
]

function StatsCard({ title, value, icon: Icon, color, bgColor }: {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function JobCard({ job, onViewDetails }: { 
  job: typeof mockRecommendedJobs[0], 
  onViewDetails: (jobId: string) => void 
}) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <h4 className="font-medium text-gray-900 mb-2">{job.title}</h4>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{job.description}</p>
      <p className="text-sm font-medium text-green-600 mb-2">{job.salary}</p>
      <p className="text-xs text-gray-500 mb-3">{job.employer.company}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {job.skills.slice(0, 2).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {skill}
          </span>
        ))}
        {job.skills.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
            +{job.skills.length - 2}
          </span>
        )}
      </div>
      <button 
        onClick={() => onViewDetails(job.id)}
        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
      >
        Xem chi tiết
      </button>
    </div>
  )
}

export default function StudentPage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showCoursesModal, setShowCoursesModal] = useState(false)
  const [showConsultingModal, setShowConsultingModal] = useState(false)
  const router = useRouter()

  const handleViewJobDetails = (jobId: string) => {
    // Navigate to job details page
    router.push(`/jobs/${jobId}`)
  }

  const handleViewAllJobs = () => {
    // Navigate to jobs page with student-friendly filters
    router.push('/jobs?type=internship&type=entry-level')
  }

  const handleDownloadCV = () => {
    setShowDownloadModal(true)
  }

  const handleFreeCourses = () => {
    setShowCoursesModal(true)
  }

  const handleConsulting = () => {
    setShowConsultingModal(true)
  }

  const downloadCVTemplate = (templateType: string) => {
    // In a real app, this would download an actual CV template
    alert(`Đang tải xuống mẫu CV ${templateType}...`)
    setShowDownloadModal(false)
  }

  const enrollCourse = (courseType: string) => {
    // In a real app, this would redirect to course enrollment
    alert(`Đang chuyển hướng đến khóa học ${courseType}...`)
    setShowCoursesModal(false)
  }

  const bookConsulting = (consultingType: string) => {
    // In a real app, this would open booking form or calendar
    alert(`Đang đặt lịch tư vấn ${consultingType}...`)
    setShowConsultingModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Sinh viên</h1>
          <p className="text-gray-600 mt-2">Quản lý hồ sơ và tìm kiếm cơ hội việc làm phù hợp</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Việc làm phù hợp"
            value={mockRecommendedJobs.length}
            icon={Briefcase}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Hồ sơ hoàn thiện"
            value="75%"
            icon={FileText}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <StatsCard
            title="Lượt xem hồ sơ"
            value="24"
            icon={TrendingUp}
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
          <StatsCard
            title="Ứng tuyển gần đây"
            value="3"
            icon={Clock}
            color="text-orange-600"
            bgColor="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Profile Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <StudentCVForm />
          </div>

          {/* Recommended Jobs - Takes 1 column */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Việc làm phù hợp ({mockRecommendedJobs.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Dựa trên hồ sơ và kỹ năng của bạn
                </p>
              </div>
              <div className="p-6 space-y-4">
                {mockRecommendedJobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onViewDetails={handleViewJobDetails}
                  />
                ))}
                <div className="text-center pt-4">
                  <button 
                    onClick={handleViewAllJobs}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Xem tất cả việc làm phù hợp →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleDownloadCV}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left flex items-center"
                >
                  <Download className="h-5 w-5 mr-3" />
                  📄 Tải xuống CV mẫu
                </button>
                <button 
                  onClick={handleFreeCourses}
                  className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-left flex items-center"
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  📚 Khóa học kỹ năng miễn phí
                </button>
                <button 
                  onClick={handleConsulting}
                  className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-left flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  💬 Tư vấn nghề nghiệp 1:1
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Download CV Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn mẫu CV</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => downloadCVTemplate('Công nghệ thông tin')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">CV Công nghệ thông tin</div>
                    <div className="text-sm text-gray-600">Phù hợp cho Developer, IT Support</div>
                  </button>
                  <button 
                    onClick={() => downloadCVTemplate('Kỹ thuật')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">CV Kỹ thuật</div>
                    <div className="text-sm text-gray-600">Phù hợp cho Kỹ sư, Technician</div>
                  </button>
                  <button 
                    onClick={() => downloadCVTemplate('Quản lý')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">CV Quản lý</div>
                    <div className="text-sm text-gray-600">Phù hợp cho Team Lead, Manager</div>
                  </button>
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setShowDownloadModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Free Courses Modal */}
        {showCoursesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Khóa học miễn phí</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => enrollCourse('Kỹ năng phỏng vấn')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">Kỹ năng phỏng vấn</div>
                    <div className="text-sm text-gray-600">4 giờ • 15 bài học</div>
                  </button>
                  <button 
                    onClick={() => enrollCourse('Viết CV hiệu quả')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">Viết CV hiệu quả</div>
                    <div className="text-sm text-gray-600">3 giờ • 12 bài học</div>
                  </button>
                  <button 
                    onClick={() => enrollCourse('Kỹ năng giao tiếp')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">Kỹ năng giao tiếp workplace</div>
                    <div className="text-sm text-gray-600">5 giờ • 20 bài học</div>
                  </button>
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setShowCoursesModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consulting Modal */}
        {showConsultingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tư vấn nghề nghiệp</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => bookConsulting('Định hướng nghề nghiệp')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">Định hướng nghề nghiệp</div>
                    <div className="text-sm text-gray-600">45 phút • 1:1 với chuyên gia</div>
                  </button>
                  <button 
                    onClick={() => bookConsulting('Review CV')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">Review CV</div>
                    <div className="text-sm text-gray-600">30 phút • Feedback chi tiết</div>
                  </button>
                  <button 
                    onClick={() => bookConsulting('Mock interview')}
                    className="w-full p-3 text-left border rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium">Mock interview</div>
                    <div className="text-sm text-gray-600">60 phút • Thực hành phỏng vấn</div>
                  </button>
                </div>
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={() => setShowConsultingModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 