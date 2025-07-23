'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If session is loading, wait
    if (status === 'loading') return
    
    // If not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/auth/login?message=Bạn cần đăng nhập để truy cập trang sinh viên')
      return
    }
  }, [session, status, router])

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (redirecting)
  if (status === 'unauthenticated') {
    return null
  }

  // Render student content for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-sm text-gray-600">
                Chào mừng, {session?.user?.fullName || session?.user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {session?.user?.role || 'STUDENT'}
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