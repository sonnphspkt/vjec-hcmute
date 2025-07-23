'use client'
import Link from 'next/link'
import { Search, Menu, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const user = session?.user
  const isAdmin = user?.role === 'ADMIN'

  return (
    <nav className="bg-white shadow-md border-b">
      {/* Header với logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">VJEC-HCMUTE</div>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/news" className="text-gray-700 hover:text-blue-600 font-medium">
              Tin tức
            </Link>
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 font-medium">
              Việc làm
            </Link>
            
            {/* Chỉ hiển thị tab Sinh viên khi user đã đăng nhập */}
            {user && (
              <Link href="/student" className="text-gray-700 hover:text-blue-600 font-medium">
                Sinh viên
              </Link>
            )}
            
            {/* Chỉ hiển thị tab Admin khi user có role ADMIN */}
            {user && isAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                Admin
              </Link>
            )}
            
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                Quốc tế
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                <Link href="/jobs?country=japan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Nhật Bản
                </Link>
                <Link href="/jobs?country=korea" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Hàn Quốc
                </Link>
                <Link href="/jobs?country=singapore" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Singapore
                </Link>
              </div>
            </div>
            <Link href="/domestic" className="text-gray-700 hover:text-blue-600 font-medium">
              Trong nước
            </Link>
          </div>

          {/* Search và User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Tìm kiếm việc làm..."
                className="bg-transparent text-sm focus:outline-none w-48"
              />
            </div>

            {/* User Authentication Section */}
            <div className="flex items-center space-x-2">
              {status === 'loading' ? (
                /* Loading state */
                <div className="text-sm text-gray-600">Đang tải...</div>
              ) : user ? (
                /* User logged in */
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      Xin chào, {user.fullName || user.email}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {user.role}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                /* User not logged in */
                <>
                  <Link 
                    href="/auth/login"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Đăng nhập
                  </Link>
                  <Link 
                    href="/auth/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden border-t bg-gray-50 px-4 py-3 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-3">
          <Link href="/news" className="text-gray-700 font-medium">Tin tức</Link>
          <Link href="/jobs" className="text-gray-700 font-medium">Việc làm</Link>
          
          {/* Mobile Sinh viên Link - chỉ hiển thị khi đã đăng nhập */}
          {user && (
            <Link href="/student" className="text-gray-700 font-medium">Sinh viên</Link>
          )}
          
          {/* Mobile Admin Link - chỉ hiển thị khi là admin */}
          {user && isAdmin && (
            <Link href="/admin" className="text-gray-700 font-medium">Admin</Link>
          )}
          
          <Link href="/jobs?country=japan" className="text-gray-700 font-medium">Nhật Bản</Link>
          <Link href="/domestic" className="text-gray-700 font-medium">Trong nước</Link>
          
          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2 border">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm việc làm..."
              className="text-sm focus:outline-none flex-1"
            />
          </div>

          {/* Mobile User Section */}
          {user ? (
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {user.fullName || user.email} ({user.role})
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t pt-3 mt-3 flex space-x-3">
              <Link 
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/auth/register"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 