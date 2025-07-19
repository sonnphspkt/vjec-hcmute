# JVEC-HCMUTE - Nền tảng Việc làm Sinh viên

> Nền tảng kết nối sinh viên Đại học Sư phạm Kỹ thuật TP.HCM với các cơ hội việc làm trong nước và quốc tế

## 🌟 Tính năng chính

### Cho Sinh viên
- ✅ Tìm kiếm việc làm với bộ lọc thông minh
- ✅ Xem chi tiết công việc và yêu cầu
- ✅ Quản lý hồ sơ cá nhân và CV
- ✅ Theo dõi đơn ứng tuyển

### Cho Nhà tuyển dụng
- ✅ Đăng tin tuyển dụng với thanh toán
- ✅ Quản lý danh sách ứng viên
- ✅ Theo dõi hiệu quả tin đăng
- ✅ Dashboard thống kê chi tiết

### Cho Admin
- ✅ Duyệt bài đăng tuyển dụng
- ✅ Quản lý tài khoản người dùng
- ✅ Thống kê và báo cáo hệ thống

## 🚀 Công nghệ sử dụng

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (dev), PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Icons**: Lucide React
- **Payment**: Mock system (có thể tích hợp VNPay/Momo)

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js 18.0 trở lên
- npm hoặc yarn

### 1. Clone repository
\`\`\`bash
git clone https://github.com/your-username/jvec-hcmute.git
cd jvec-hcmute
\`\`\`

### 2. Cài đặt dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup database
\`\`\`bash
# Generate Prisma client
npx prisma generate

# Chạy migration
npx prisma migrate dev

# (Tùy chọn) Seed dữ liệu mẫu
npx prisma db seed
\`\`\`

### 4. Cấu hình môi trường
Tạo file \`.env.local\`:
\`\`\`env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 5. Chạy development server
\`\`\`bash
npm run dev
\`\`\`

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🗄️ Database Schema

### Bảng Users
- Lưu trữ thông tin tài khoản (email, mật khẩu, vai trò)
- Hỗ trợ 3 loại tài khoản: STUDENT, EMPLOYER, ADMIN

### Bảng Student Profiles
- Thông tin sinh viên (chuyên ngành, kỹ năng, CV)
- Liên kết với bảng Users

### Bảng Employer Profiles  
- Thông tin nhà tuyển dụng (công ty, trạng thái xác minh)
- Liên kết với bảng Users

### Bảng Job Posts
- Tin đăng tuyển dụng (tiêu đề, mô tả, yêu cầu)
- Trạng thái duyệt bài

### Bảng Payments
- Lịch sử thanh toán cho tin đăng
- Mock payment system

## 🎨 Giao diện

### Landing Page
- Hero banner với search bar
- Thống kê nổi bật
- Các sections: Việc làm mới, Học bổng, Hướng nghiệp

### Trang Jobs
- Danh sách việc làm với JobCard component
- Bộ lọc theo địa điểm, loại hình, lĩnh vực
- Pagination

### Authentication
- Đăng nhập/Đăng ký với validation
- Lựa chọn vai trò (Sinh viên/Nhà tuyển dụng)
- Form UX/UI thân thiện

### Employer Dashboard
- Thống kê tin đăng
- Form tạo bài tuyển dụng
- Quản lý tin đăng hiện có

## 🔧 Scripts

\`\`\`bash
# Development
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Database
npx prisma studio          # Mở Prisma Studio
npx prisma migrate reset   # Reset database
npx prisma db push         # Push schema changes
\`\`\`

## 📱 Responsive Design

Website được thiết kế responsive hoàn toàn:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation collapse trên mobile
- Grid layout tự động điều chỉnh

## 🚦 Workflow

### Quy trình tạo tin tuyển dụng
1. Employer đăng ký tài khoản
2. Tạo bài đăng với EmployerForm
3. Thanh toán phí đăng tin (Mock: 1,000,000 VND)
4. Admin duyệt bài đăng
5. Tin đăng được hiển thị public

### Quy trình tìm việc
1. Student đăng ký tài khoản  
2. Tạo profile và upload CV
3. Tìm kiếm việc làm phù hợp
4. Xem chi tiết và ứng tuyển

## 🔮 Tính năng tiếp theo

- [ ] Hệ thống chat realtime
- [ ] Notifications push
- [ ] API integration với VNPay/Momo
- [ ] Advanced search với Elasticsearch
- [ ] Email templates cho notifications
- [ ] Mobile app với React Native
- [ ] AI matching algorithm
- [ ] Video interview integration

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See \`LICENSE\` for more information.

## 👥 Team

- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Your Name]  
- **UI/UX Designer**: [Your Name]

## 📞 Liên hệ

- Website: [https://jvec-hcmute.vercel.app](https://jvec-hcmute.vercel.app)
- Email: contact@jvec-hcmute.edu.vn
- Facebook: [JVEC HCMUTE](https://facebook.com/jvec.hcmute)

---

**Được phát triển với ❤️ tại Đại học Sư phạm Kỹ thuật TP.HCM**
