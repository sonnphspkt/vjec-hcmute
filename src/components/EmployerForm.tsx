'use client'

import { useState } from 'react'
import { Building2, MapPin, DollarSign, FileText, Tag } from 'lucide-react'

interface JobFormData {
  title: string
  description: string
  salary: string
  country: string
  jobType: 'FULLTIME' | 'PARTTIME' | 'INTERNSHIP' | 'REMOTE'
  category: string
  skills: string[]
}

export default function EmployerForm() {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    salary: '',
    country: '',
    jobType: 'FULLTIME',
    category: '',
    skills: []
  })
  const [skillInput, setSkillInput] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      })
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    
    if (!formData.title) newErrors.title = 'Tiêu đề công việc là bắt buộc'
    if (!formData.description) newErrors.description = 'Mô tả công việc là bắt buộc'
    if (!formData.salary) newErrors.salary = 'Mức lương là bắt buộc'
    if (!formData.country) newErrors.country = 'Địa điểm làm việc là bắt buộc'
    if (!formData.category) newErrors.category = 'Lĩnh vực là bắt buộc'
    if (formData.skills.length === 0) newErrors.skills = 'Cần ít nhất 1 kỹ năng'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual job posting logic with payment
      console.log('Job posting data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Redirect to payment page
      alert('Bài đăng đã được tạo! Vui lòng thanh toán để kích hoạt.')
    } catch (error) {
      setErrors({ general: 'Có lỗi xảy ra. Vui lòng thử lại.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Đăng tin tuyển dụng
        </h2>
        <p className="text-gray-600">
          Tạo bài đăng tuyển dụng để tìm kiếm những ứng viên phù hợp cho công ty của bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {errors.general}
          </div>
        )}

        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề công việc *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="title"
              className={`w-full pl-10 pr-3 py-3 border ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Ví dụ: Frontend Developer - React/Next.js"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Job Type & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
              Loại hình công việc *
            </label>
            <select
              id="jobType"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value as any })}
            >
              <option value="FULLTIME">Toàn thời gian</option>
              <option value="PARTTIME">Bán thời gian</option>
              <option value="INTERNSHIP">Thực tập</option>
              <option value="REMOTE">Remote</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Lĩnh vực *
            </label>
            <select
              id="category"
              className={`w-full px-3 py-3 border ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Chọn lĩnh vực</option>
              <option value="Công nghệ thông tin">Công nghệ thông tin</option>
              <option value="Marketing">Marketing</option>
              <option value="Thiết kế">Thiết kế</option>
              <option value="Tài chính">Tài chính</option>
              <option value="Nhân sự">Nhân sự</option>
              <option value="Kỹ thuật">Kỹ thuật</option>
              <option value="Kinh doanh">Kinh doanh</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
        </div>

        {/* Location & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Địa điểm làm việc *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="country"
                className={`w-full pl-10 pr-3 py-3 border ${
                  errors.country ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ví dụ: TP.HCM, Hà Nội, Tokyo..."
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
              Mức lương *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="salary"
                className={`w-full pl-10 pr-3 py-3 border ${
                  errors.salary ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ví dụ: 15,000,000 - 25,000,000 VND"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
            {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kỹ năng yêu cầu *
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập kỹ năng và nhấn Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Thêm
              </button>
            </div>
            
            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả công việc *
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="description"
              rows={8}
              className={`w-full pl-10 pr-3 py-3 border ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Mô tả chi tiết về công việc, yêu cầu, quyền lợi..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Payment Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Lưu ý về thanh toán
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Phí đăng tin: <strong>1,000,000 VND</strong> cho mỗi bài đăng.
                  Bài đăng sẽ được kích hoạt sau khi thanh toán thành công và được admin duyệt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng tin & Thanh toán'}
          </button>
        </div>
      </form>
    </div>
  )
} 