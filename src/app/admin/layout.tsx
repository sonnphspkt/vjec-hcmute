'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, isAdmin, AuthUser } from '@/lib/auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getSession()
    setUser(currentUser)
    setIsLoading(false)

    // Kiểm tra quyền admin
    if (!currentUser || !isAdmin(currentUser)) {
      // Redirect về trang login với thông báo
      router.push('/auth/login?message=Bạn cần quyền admin để truy cập trang này')
      return
    }
  }, [router])

  // Hiển thị loading trong khi kiểm tra quyền
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  // Không hiển thị gì nếu không có quyền (đang redirect)
  if (!user || !isAdmin(user)) {
    return null
  }

  // Hiển thị nội dung admin nếu có quyền
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Quản lý hệ thống VJEC-HCMUTE Job Portal
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
} 