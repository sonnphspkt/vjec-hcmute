import Image from 'next/image'

export default function HeaderBanner() {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-2 md:px-6 py-3 space-y-4 md:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Image src="/logo-vjec.png" alt="VJEC Logo" width={160} height={160} className="object-contain h-20 w-auto" />
          {/* Logo HCMUTE */}
          <Image src="/hcmute-logo.png" alt="HCMUTE Logo" width={120} height={120} className="object-contain h-20 w-auto hidden md:block" />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left text-sm leading-snug flex-1">
          <p className="font-semibold text-blue-700">Trường Đại học Sư phạm Kỹ Thuật TP.HCM</p>
          <p className="font-semibold text-black">TT HƯỚNG NGHIỆP & ĐÀO TẠO VIỆT NHẬT VJEC</p>
          <p className="text-green-600 font-medium">ホーチミ市技術師範大学・越日就職トレーニングセンター</p>
          <p className="text-red-600 font-bold">0963.512.513 - 0934.181.813 - 0909.872.296</p>
          <p className="text-gray-700">Email: vjec@hcmute.edu.vn &nbsp; - &nbsp; Website: <a href="https://vjec.edu.vn" className="text-blue-600 hover:underline">vjec.edu.vn</a></p>
          <p className="text-gray-700">Fanpage: <a href="https://facebook.com/vietnhat.spkt" className="text-blue-600 hover:underline">vietnhat.spkt</a></p>
          <p className="text-gray-700">Địa chỉ: Số 1 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh</p>
        </div>
      </div>
    </div>
  )
} 