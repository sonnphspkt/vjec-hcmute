import { MapPin, Clock, DollarSign, Building2 } from 'lucide-react'

interface JobCardProps {
  job: {
    id: string
    title: string
    description: string
    salary: string
    country: string
    jobType: string
    category: string
    skills: string[]
    createdAt: Date
    employer: {
      company: string
    }
  }
}

export default function JobCard({ job }: JobCardProps) {
  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'FULLTIME': return 'bg-green-100 text-green-800'
      case 'PARTTIME': return 'bg-blue-100 text-blue-800'
      case 'INTERNSHIP': return 'bg-purple-100 text-purple-800'
      case 'REMOTE': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getJobTypeText = (type: string) => {
    switch (type) {
      case 'FULLTIME': return 'Toàn thời gian'
      case 'PARTTIME': return 'Bán thời gian'
      case 'INTERNSHIP': return 'Thực tập'
      case 'REMOTE': return 'Remote'
      default: return type
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building2 className="h-4 w-4 mr-2" />
            <span className="font-medium">{job.employer.company}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
          {getJobTypeText(job.jobType)}
        </span>
      </div>

      {/* Job Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{job.country}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          <span className="font-medium text-green-600">{job.salary}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{new Date(job.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {job.description}
      </p>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">{job.category}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Xem chi tiết
        </button>
      </div>
    </div>
  )
} 