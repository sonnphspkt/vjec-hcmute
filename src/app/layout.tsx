import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import HeaderBanner from "@/components/HeaderBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VJEC-HCMUTE - Cổng thông tin việc làm sinh viên",
  description: "Nền tảng kết nối sinh viên HCMUTE với các cơ hội việc làm trong nước và quốc tế",
  keywords: "việc làm, sinh viên, HCMUTE, tuyển dụng, thực tập, Nhật Bản",
};

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo-vjec.png" alt="VJEC Logo" className="h-8 w-auto" />
              <img src="/hcmute-logo.png" alt="HCMUTE Logo" className="h-8 w-auto" />
              <h3 className="text-2xl font-bold">VJEC-HCMUTE</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Nền tảng kết nối sinh viên Đại học Sư phạm Kỹ thuật TP.HCM với các cơ hội việc làm 
              chất lượng trong nước và quốc tế.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white">Zalo</a>
              <a href="#" className="text-gray-300 hover:text-white">TikTok</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white">Về chúng tôi</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Liên hệ</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-300 hover:text-white">Trung tâm trợ giúp</a></li>
              <li><a href="/guide" className="text-gray-300 hover:text-white">Hướng dẫn sử dụng</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 VJEC-HCMUTE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <HeaderBanner />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
