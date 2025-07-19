import Link from 'next/link'
import { Search, Briefcase, GraduationCap, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Kết nối sinh viên HCMUTE <br />
              <span className="text-blue-200">với cơ hội toàn cầu</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Nền tảng tuyển dụng hàng đầu dành cho sinh viên Đại học Sư phạm Kỹ thuật TP.HCM 
              với hàng nghìn cơ hội việc làm trong nước và quốc tế
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
                <Search className="h-5 w-5 text-gray-400 ml-3" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm việc làm theo vị trí, công ty..."
                  className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  Tìm kiếm
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jobs?country=japan" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                🇯🇵 Việc làm Nhật Bản
              </Link>
              <Link href="/jobs?type=internship" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                🎓 Chương trình thực tập
              </Link>
              <Link href="/jobs?country=vietnam" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                🇻🇳 Việc làm trong nước
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Cơ hội việc làm</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Sinh viên đã có việc</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Doanh nghiệp đối tác</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-gray-600">Quốc gia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Khám phá cơ hội phát triển sự nghiệp
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Việc làm mới */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Việc làm mới</h3>
              <p className="text-gray-600 mb-6">
                Cập nhật hàng ngày các cơ hội việc làm mới từ các doanh nghiệp uy tín 
                trong và ngoài nước.
              </p>
              <Link href="/jobs" className="text-blue-600 font-semibold hover:text-blue-700">
                Xem tất cả việc làm →
              </Link>
            </div>

            {/* Học bổng */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Học bổng</h3>
              <p className="text-gray-600 mb-6">
                Thông tin về các chương trình học bổng, trao đổi sinh viên và 
                cơ hội học tập quốc tế.
              </p>
              <Link href="/scholarships" className="text-green-600 font-semibold hover:text-green-700">
                Tìm hiểu thêm →
              </Link>
            </div>

            {/* Hướng nghiệp */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Hướng nghiệp</h3>
              <p className="text-gray-600 mb-6">
                Tư vấn định hướng nghiệp, xây dựng CV và chuẩn bị phỏng vấn 
                từ các chuyên gia.
              </p>
              <Link href="/career-guidance" className="text-purple-600 font-semibold hover:text-purple-700">
                Đặt lịch tư vấn →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng bắt đầu hành trình sự nghiệp?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Đăng ký ngay hôm nay để khám phá hàng nghìn cơ hội việc làm 
            và kết nối với các nhà tuyển dụng hàng đầu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register?role=student"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Đăng ký cho sinh viên
            </Link>
            <Link 
              href="/auth/register?role=employer"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg"
            >
              Đăng ký cho nhà tuyển dụng
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
