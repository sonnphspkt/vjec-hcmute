import { Users, Target, Award, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Về VJEC-HCMUTE
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nền tảng kết nối sinh viên Đại học Sư phạm Kỹ thuật TP.HCM với các cơ hội việc làm 
              chất lượng trong nước và quốc tế
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Sứ mệnh</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Tạo cầu nối giữa sinh viên HCMUTE với các cơ hội việc làm tốt nhất, 
              giúp sinh viên phát triển sự nghiệp và đạt được thành công trong lĩnh vực 
              kỹ thuật và công nghệ.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Tầm nhìn</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Trở thành nền tảng tuyển dụng hàng đầu cho sinh viên kỹ thuật tại Việt Nam, 
              mở rộng cơ hội nghề nghiệp ra toàn cầu và nâng cao chất lượng nguồn nhân lực 
              kỹ thuật Việt Nam.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-gray-600">Những giá trị định hướng mọi hoạt động của chúng tôi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tận tâm</h3>
              <p className="text-gray-600">
                Luôn đặt lợi ích của sinh viên và nhà tuyển dụng lên hàng đầu
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chính trực</h3>
              <p className="text-gray-600">
                Minh bạch, trung thực trong mọi giao dịch và thông tin
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chất lượng</h3>
              <p className="text-gray-600">
                Cam kết cung cấp dịch vụ và cơ hội việc làm chất lượng cao
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Thành tựu của chúng tôi</h2>
            <p className="text-blue-100">Những con số ấn tượng sau 2 năm hoạt động</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Cơ hội việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Sinh viên có việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Doanh nghiệp đối tác</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-100">Quốc gia</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ của chúng tôi</h2>
          <p className="text-gray-600 mb-8">
            Được dẫn dắt bởi đội ngũ giàu kinh nghiệm trong lĩnh vực giáo dục và tuyển dụng
          </p>
          
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
            <p className="text-lg text-gray-700 leading-relaxed">
              VJEC-HCMUTE được phát triển và vận hành bởi Trung tâm Hợp tác Doanh nghiệp - 
              Đại học Sư phạm Kỹ thuật TP.HCM, với sự hỗ trợ của các chuyên gia trong lĩnh vực 
              công nghệ thông tin và tuyển dụng nhân sự.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 