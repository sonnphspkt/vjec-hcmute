# 🚀 HƯỚNG DẪN DEPLOY LÊNVERCEL

## 📋 Yêu cầu trước khi deploy:

### 1. Cài đặt Vercel CLI:
```bash
npm install -g vercel
```

### 2. Tạo tài khoản Cloudinary (Miễn phí):
- Truy cập: https://cloudinary.com/
- Đăng ký tài khoản miễn phí
- Lấy thông tin: Cloud Name, API Key, API Secret

### 3. Chuẩn bị Database:
- Vercel hỗ trợ PostgreSQL (khuyến nghị) hoặc PlanetScale MySQL
- Hoặc dùng Vercel Postgres (miễn phí)

## 🔧 CÁC BƯỚC DEPLOY:

### Bước 1: Chuẩn bị project
```bash
cd jvec-hcmute
npm run build  # Test build trước
```

### Bước 2: Deploy với Vercel CLI
```bash
vercel
# Hoặc
vercel --prod
```

### Bước 3: Cấu hình Environment Variables
Trên Vercel Dashboard, thêm các biến:

```
DATABASE_URL=your_database_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
```

### Bước 4: Chạy Database Migration
```bash
# Trên máy local với DATABASE_URL production
npx prisma migrate deploy
npx prisma db seed
```

## 📱 TÍNH NĂNG ĐÃ HOÀN THÀNH:

✅ **Authentication & Authorization:**
- Đăng nhập/đăng ký với roles (Admin, Employer, Student)
- Session management
- Route protection

✅ **Admin Panel:**
- Dashboard với statistics
- Quản lý job posts (approve/reject)
- Quản lý bài viết tin tức
- Upload ảnh với Cloudinary

✅ **Public Pages:**
- Trang tin tức với ảnh thật
- Trang việc làm (tổng hợp + trong nước)
- Responsive design

✅ **Student Dashboard:**
- Chỉ hiển thị khi đăng nhập
- CV form và recommended jobs

## 🔒 BẢO MẬT:
- Admin routes được bảo vệ
- Image upload validation
- SQL injection protection với Prisma
- XSS protection

## 📊 DATABASE SCHEMA:
- Users với roles
- Job Posts với approval system
- Articles cho tin tức
- Student/Employer profiles

## 🎯 TEST ACCOUNTS:
```
👑 Admin: admin@vjec.edu.vn / admin123
🏢 Employer: employer@company.com / employer123  
🎓 Student: student@student.com / student123
```

## 🚀 PRODUCTION CHECKLIST:

- [ ] Cấu hình HTTPS
- [ ] Setup production database
- [ ] Configure Cloudinary
- [ ] Test all authentication flows
- [ ] Test image upload
- [ ] Verify admin functions
- [ ] Check mobile responsive

## 📞 SUPPORT:
Nếu có lỗi trong quá trình deploy, check:
1. Environment variables
2. Database connection
3. Cloudinary configuration
4. Build logs trên Vercel 