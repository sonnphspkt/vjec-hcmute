'use client'

import { useState } from 'react'
import { Upload, FileText, User, Mail, Phone, MapPin, GraduationCap, Award } from 'lucide-react'

interface StudentProfileData {
  fullName: string
  email: string
  phone: string
  address: string
  major: string
  year: string
  gpa: string
  skills: string[]
  resumeUrl: string
}

export default function StudentCVForm() {
  const [formData, setFormData] = useState<StudentProfileData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    major: '',
    year: '',
    gpa: '',
    skills: [],
    resumeUrl: ''
  })
  const [skillInput, setSkillInput] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, resume: 'Chỉ chấp nhận file PDF, DOC, DOCX' })
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, resume: 'File không được vượt quá 5MB' })
      return
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // TODO: Implement actual file upload to cloud storage
    setTimeout(() => {
      setFormData({
        ...formData,
        resumeUrl: `uploads/${file.name}`
      })
      setErrors({ ...errors, resume: '' })
    }, 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.fullName) newErrors.fullName = 'Họ tên là bắt buộc'
    if (!formData.email) newErrors.email = 'Email là bắt buộc'
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc'
    if (!formData.major) newErrors.major = 'Ngành học là bắt buộc'
    if (!formData.year) newErrors.year = 'Năm học là bắt buộc'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement API call to save student profile
      console.log('Saving student profile:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Hồ sơ đã được cập nhật thành công!')
    } catch (err) {
      console.error('Error saving profile:', err)
      setErrors({ general: 'Có lỗi xảy ra. Vui lòng thử lại.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hồ sơ cá nhân</h2>
        <p className="text-gray-600">Cập nhật thông tin và CV để tăng cơ hội tìm được việc làm phù hợp</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2" />
              Họ và tên *
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 mr-2" />
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@hcmute.edu.vn"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              Số điện thoại *
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0123456789"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="TP. Hồ Chí Minh"
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="major" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <GraduationCap className="h-4 w-4 mr-2" />
              Ngành học *
            </label>
            <select
              id="major"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            >
              <option value="">Chọn ngành học</option>
              <option value="computer-science">Khoa học máy tính</option>
              <option value="software-engineering">Kỹ thuật phần mềm</option>
              <option value="information-technology">Công nghệ thông tin</option>
              <option value="electrical-engineering">Kỹ thuật điện</option>
              <option value="mechanical-engineering">Kỹ thuật cơ khí</option>
              <option value="industrial-engineering">Kỹ thuật công nghiệp</option>
              <option value="other">Khác</option>
            </select>
            {errors.major && <p className="mt-1 text-sm text-red-600">{errors.major}</p>}
          </div>

          <div>
            <label htmlFor="year" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Award className="h-4 w-4 mr-2" />
              Năm học *
            </label>
            <select
              id="year"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            >
              <option value="">Chọn năm học</option>
              <option value="1">Năm 1</option>
              <option value="2">Năm 2</option>
              <option value="3">Năm 3</option>
              <option value="4">Năm 4</option>
              <option value="5">Năm 5</option>
              <option value="graduated">Đã tốt nghiệp</option>
            </select>
            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
          </div>

          <div>
            <label htmlFor="gpa" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Award className="h-4 w-4 mr-2" />
              GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              id="gpa"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              placeholder="3.50"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kỹ năng
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Nhập kỹ năng (VD: React, Java, Python...)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Thêm
            </button>
          </div>
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
        </div>

        {/* CV Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CV/Resume
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {formData.resumeUrl ? (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <FileText className="h-8 w-8" />
                <span>CV đã được tải lên: {formData.resumeUrl.split('/').pop()}</span>
              </div>
            ) : (
              <div>
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Tải lên CV của bạn</p>
                <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (tối đa 5MB)</p>
              </div>
            )}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              {formData.resumeUrl ? 'Thay đổi CV' : 'Chọn file'}
            </label>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Đang tải lên... {uploadProgress}%</p>
              </div>
            )}
          </div>
          {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
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
            {isLoading ? 'Đang lưu...' : 'Cập nhật hồ sơ'}
          </button>
        </div>
      </form>
    </div>
  )
} 