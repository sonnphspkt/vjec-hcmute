import { FileText, Users, Shield, AlertCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Điều khoản sử dụng
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ VJEC-HCMUTE
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">1. Chấp nhận điều khoản</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>
              Bằng việc truy cập và sử dụng website VJEC-HCMUTE, bạn đồng ý tuân thủ và bị ràng buộc 
              bởi các điều khoản và điều kiện được nêu ra trong tài liệu này.
            </p>
            <p>
              Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, 
              vui lòng không sử dụng dịch vụ của chúng tôi.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">2. Tài khoản người dùng</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Khi tạo tài khoản, bạn cam kết:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
              <li>Bảo mật thông tin đăng nhập của mình</li>
              <li>Chịu trách nhiệm cho mọi hoạt động dưới tài khoản của bạn</li>
              <li>Thông báo ngay lập tức nếu phát hiện việc sử dụng trái phép</li>
              <li>Không chia sẻ tài khoản với người khác</li>
            </ul>
            <p className="font-medium text-gray-800">
              Chúng tôi có quyền đình chỉ hoặc xóa tài khoản vi phạm điều khoản sử dụng.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">3. Quy định sử dụng</h2>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Người dùng cam kết không sử dụng dịch vụ để:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Đăng tải nội dung sai sự thật, bôi nhọ hoặc xúc phạm</li>
              <li>Vi phạm quyền sở hữu trí tuệ của bên thứ ba</li>
              <li>Gửi spam hoặc nội dung quảng cáo không mong muốn</li>
              <li>Tấn công, xâm nhập hoặc làm hại hệ thống</li>
              <li>Thu thập thông tin người dùng khác một cách bất hợp pháp</li>
              <li>Sử dụng vào mục đích thương mại không được phép</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">4. Quyền và trách nhiệm</h2>
          </div>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quyền của VJEC-HCMUTE:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Thay đổi, tạm ngừng hoặc chấm dứt dịch vụ</li>
                <li>Xóa nội dung vi phạm quy định</li>
                <li>Cập nhật điều khoản sử dụng</li>
                <li>Thu thập và sử dụng dữ liệu theo chính sách bảo mật</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Trách nhiệm của người dùng:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Tuân thủ các quy định và điều khoản</li>
                <li>Chịu trách nhiệm về nội dung mình đăng tải</li>
                <li>Bảo vệ thông tin đăng nhập</li>
                <li>Báo cáo các vi phạm hoặc lỗi hệ thống</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Sở hữu trí tuệ</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Tất cả nội dung trên website bao gồm văn bản, hình ảnh, logo, thiết kế 
              đều thuộc quyền sở hữu của VJEC-HCMUTE hoặc được sử dụng với sự cho phép.
            </p>
            <p>
              Người dùng không được sao chép, phân phối hoặc sử dụng nội dung 
              vào mục đích thương mại mà không có sự đồng ý bằng văn bản.
            </p>
            <p>
              Khi đăng tải nội dung, bạn cấp cho chúng tôi quyền sử dụng, hiển thị 
              và chia sẻ nội dung đó trong phạm vi cung cấp dịch vụ.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Giới hạn trách nhiệm</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              VJEC-HCMUTE cung cấp dịch vụ trên cơ sở "như hiện có" và không đảm bảo 
              rằng dịch vụ sẽ luôn hoạt động liên tục, không có lỗi.
            </p>
            <p>
              Chúng tôi không chịu trách nhiệm về:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Thiệt hại gián tiếp hoặc hậu quả từ việc sử dụng dịch vụ</li>
              <li>Mất mát dữ liệu do lỗi kỹ thuật</li>
              <li>Nội dung hoặc hành vi của người dùng khác</li>
              <li>Việc làm hoặc cơ hội được giới thiệu qua nền tảng</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Chấm dứt dịch vụ</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Chúng tôi có quyền chấm dứt hoặc đình chỉ quyền truy cập của bạn 
              vào dịch vụ nếu vi phạm điều khoản sử dụng.
            </p>
            <p>
              Khi tài khoản bị chấm dứt, bạn sẽ mất quyền truy cập vào tất cả 
              dữ liệu và nội dung đã lưu trữ.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Liên hệ hỗ trợ</h3>
          <p className="text-blue-700 mb-2">
            Nếu bạn có thắc mắc về điều khoản sử dụng, vui lòng liên hệ:
          </p>
          <p className="text-blue-700">
            <strong>Email:</strong> support@vjec.edu.vn<br />
            <strong>Điện thoại:</strong> 0963.512.513
          </p>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Điều khoản này có hiệu lực từ ngày 01/01/2024 và được cập nhật lần cuối vào 20/01/2024</p>
        </div>
      </div>
    </div>
  )
} 