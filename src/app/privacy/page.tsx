import { Shield, Eye, Lock, AlertTriangle } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Chính sách bảo mật
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và tuân thủ các quy định về bảo mật dữ liệu
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">1. Thu thập thông tin</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Chúng tôi thu thập thông tin khi bạn:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Đăng ký tài khoản trên hệ thống</li>
              <li>Tạo hồ sơ cá nhân hoặc CV</li>
              <li>Ứng tuyển vào các vị trí việc làm</li>
              <li>Sử dụng các tính năng của website</li>
              <li>Liên hệ với chúng tôi qua email hoặc form liên hệ</li>
            </ul>
            <p>
              Các thông tin được thu thập bao gồm: họ tên, địa chỉ email, số điện thoại, 
              thông tin học vấn, kinh nghiệm làm việc và các thông tin liên quan đến hồ sơ nghề nghiệp.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Eye className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">2. Sử dụng thông tin</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Thông tin của bạn được sử dụng để:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cung cấp và cải thiện dịch vụ của chúng tôi</li>
              <li>Kết nối bạn với các cơ hội việc làm phù hợp</li>
              <li>Gửi thông báo về các cơ hội việc làm mới</li>
              <li>Hỗ trợ kỹ thuật và giải đáp thắc mắc</li>
              <li>Thống kê và phân tích để cải thiện trải nghiệm người dùng</li>
              <li>Tuân thủ các yêu cầu pháp lý</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lock className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">3. Bảo vệ thông tin</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin của bạn:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mã hóa dữ liệu khi truyền tải (SSL/TLS)</li>
              <li>Hệ thống xác thực và phân quyền truy cập</li>
              <li>Backup định kỳ và lưu trữ an toàn</li>
              <li>Giám sát và phát hiện các hoạt động bất thường</li>
              <li>Đào tạo nhân viên về bảo mật thông tin</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">4. Chia sẻ thông tin</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Chúng tôi chỉ chia sẻ thông tin của bạn trong các trường hợp:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Khi bạn đồng ý chia sẻ CV với nhà tuyển dụng</li>
              <li>Với các đối tác cung cấp dịch vụ (sau khi ký thỏa thuận bảo mật)</li>
              <li>Khi được yêu cầu bởi cơ quan có thẩm quyền</li>
              <li>Để bảo vệ quyền lợi hợp pháp của chúng tôi</li>
            </ul>
            <p className="font-medium text-gray-800">
              Chúng tôi cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của bạn 
              với bên thứ ba vì mục đích thương mại.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Quyền của người dùng</h2>
          <div className="space-y-4 text-gray-600">
            <p>Bạn có quyền:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Truy cập và cập nhật thông tin cá nhân</li>
              <li>Yêu cầu xóa tài khoản và dữ liệu</li>
              <li>Rút lại sự đồng ý xử lý dữ liệu</li>
              <li>Khiếu nại về việc xử lý dữ liệu không đúng</li>
              <li>Yêu cầu sao chép dữ liệu cá nhân</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Liên hệ về bảo mật</h3>
          <p className="text-blue-700 mb-2">
            Nếu bạn có thắc mắc về chính sách bảo mật, vui lòng liên hệ:
          </p>
          <p className="text-blue-700">
            <strong>Email:</strong> privacy@vjec.edu.vn<br />
            <strong>Điện thoại:</strong> 0963.512.513
          </p>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Chính sách này có hiệu lực từ ngày 01/01/2024 và được cập nhật lần cuối vào 20/01/2024</p>
        </div>
      </div>
    </div>
  )
} 