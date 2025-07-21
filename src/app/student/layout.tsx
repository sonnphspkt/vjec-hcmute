'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, AuthUser } from '@/lib/auth'

export default function StudentLayout({
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

    // Kiểm tra đăng nhập
    if (!currentUser) {
      // Redirect về trang login với thông báo
      router.push('/auth/login?message=Bạn cần đăng nhập để truy cập trang sinh viên')
      return
    }
  }, [router])

  // Hiển thị loading trong khi kiểm tra đăng nhập
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    )
  }

  // Không hiển thị gì nếu chưa đăng nhập (đang redirect)
  if (!user) {
    return null
  }

  // Hiển thị nội dung student nếu đã đăng nhập
  return <>{children}</>
} 