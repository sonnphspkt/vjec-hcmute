'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If session is loaded and user is not admin, redirect
    if (status === 'loading') return // Still loading
    
    if (status === 'unauthenticated') {
      router.push('/auth/login?message=Bạn cần đăng nhập để truy cập trang này')
      return
    }

    if (session?.user?.role !== 'ADMIN') {
      router.push('/auth/login?message=Bạn cần quyền admin để truy cập trang này')
      return
    }
  }, [session, status, router])

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated or not admin (redirecting)
  if (status === 'unauthenticated' || session?.user?.role !== 'ADMIN') {
    return null
  }

  // Render admin content for authenticated admin users
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">
                Chào mừng, {session.user.fullName || session.user.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {session.user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
} 