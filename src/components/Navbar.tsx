import Link from 'next/link'
import { Search, Menu } from 'lucide-react'

export default function Navbar() {
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
            <Link href="/student" className="text-gray-700 hover:text-blue-600 font-medium">
              Sinh viên
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
              Admin
            </Link>
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
            <Link href="/jobs?country=vietnam" className="text-gray-700 hover:text-blue-600 font-medium">
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

            {/* User Menu */}
            <div className="flex items-center space-x-2">
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
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-gray-50 px-4 py-3">
        <div className="flex flex-col space-y-3">
          <Link href="/news" className="text-gray-700 font-medium">Tin tức</Link>
          <Link href="/jobs" className="text-gray-700 font-medium">Việc làm</Link>
          <Link href="/jobs?country=japan" className="text-gray-700 font-medium">Nhật Bản</Link>
          <Link href="/jobs?country=vietnam" className="text-gray-700 font-medium">Trong nước</Link>
          
          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-lg px-3 py-2 border">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm việc làm..."
              className="text-sm focus:outline-none flex-1"
            />
          </div>
        </div>
      </div>
    </nav>
  )
} 