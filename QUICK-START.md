# 🚀 HƯỚNG DẪN NHANH - ĐƯA VÀO CURSOR

## 📦 Bạn đã có gì?

Một codebase hoàn chỉnh React + Node.js cho UTE Job Platform bao gồm:

### ✅ Backend (Node.js + Express + MongoDB)
- ✅ Authentication (JWT) - Đăng ký, đăng nhập, phân quyền
- ✅ Models: User, StudentProfile, Job, Project (đầy đủ Career DNA)
- ✅ Routes & Controllers cho tất cả APIs
- ✅ Middleware: Auth, Error handling, Async wrapper
- ✅ Package.json với tất cả dependencies

### ✅ Frontend (React + Vite + TailwindCSS)
- ✅ App structure với React Router
- ✅ Zustand store cho authentication
- ✅ Tailwind config với design system
- ✅ Package.json với tất cả dependencies

### ✅ Documentation
- ✅ README.md - Tổng quan dự án
- ✅ SETUP.md - Hướng dẫn cài đặt chi tiết
- ✅ API.md - Tài liệu API đầy đủ
- ✅ DATABASE.md - Database schema

---

## 🎯 LÀM GÌ TIẾP THEO?

### Bước 1: Giải nén file

```bash
# Nếu tải file .tar.gz
tar -xzf ute-job-platform.tar.gz
cd ute-job-platform

# Hoặc nếu đã có folder
cd ute-job-platform
```

### Bước 2: Mở trong Cursor

```bash
# Trong terminal
cursor .

# Hoặc mở Cursor và File > Open Folder > chọn folder ute-job-platform
```

### Bước 3: Cài đặt Dependencies

**Trong Cursor, mở Terminal (Ctrl + `):**

```bash
# Terminal 1 - Backend
cd backend
npm install

# Terminal 2 - Frontend (mở terminal mới)
cd frontend
npm install
```

### Bước 4: Setup MongoDB

**Cài MongoDB nếu chưa có:**
- Windows: https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

**Start MongoDB:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Bước 5: Tạo file .env

**Backend - tạo file `backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ute-job-platform
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend - tạo file `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### Bước 6: Chạy ứng dụng

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend chạy tại: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend chạy tại: http://localhost:5173

---

## 🧪 TEST THỬ

### 1. Kiểm tra Backend
Mở browser: http://localhost:5000/health

Kết quả mong đợi:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123
}
```

### 2. Kiểm tra Frontend
Mở browser: http://localhost:5173

Bạn sẽ thấy landing page UTE Job Platform!

### 3. Test đăng ký tài khoản
1. Vào http://localhost:5173/register
2. Điền thông tin và đăng ký
3. Nếu thành công → chuyển đến dashboard

---

## 💡 LÀM GÌ TIẾP TRONG CURSOR?

### 1. Hoàn thiện các trang còn thiếu

**Đã có (starter code):**
- ✅ Server setup
- ✅ Models
- ✅ Auth routes & controller
- ✅ Middleware
- ✅ Basic React structure

**Cần làm tiếp:**
- [ ] Hoàn thiện các controller còn lại (student, job, project, AI)
- [ ] Tạo các trang React (Dashboard, Profile, Jobs, Projects)
- [ ] Tạo components (JobCard, ProjectCard, Navbar, etc.)
- [ ] Implement file upload (Multer backend + Dropzone frontend)
- [ ] Tạo AI matching service (Python FastAPI)
- [ ] Thêm analytics dashboard
- [ ] Responsive design cho mobile

### 2. Dùng Cursor AI để code nhanh

**Ví dụ prompts:**

```
"Tạo component JobCard để hiển thị thông tin job với title, company logo, 
salary, location, và nút Apply. Sử dụng Tailwind CSS theo design system 
trong tailwind.config.js"
```

```
"Viết controller cho student routes để lấy danh sách students với 
pagination, filter theo skills và major. Sử dụng model StudentProfile đã có"
```

```
"Tạo trang Dashboard cho sinh viên hiển thị: profile completion %, 
recent applications, recommended jobs. Dùng React Query để fetch data"
```

### 3. Cấu trúc đề xuất tiếp theo

**Backend - cần tạo thêm:**
```
backend/src/
├── controllers/
│   ├── student.controller.js    ← CẦN LÀM
│   ├── job.controller.js        ← CẦN LÀM
│   ├── project.controller.js    ← CẦN LÀM
│   └── ai.controller.js         ← CẦN LÀM
├── routes/
│   ├── student.routes.js        ← CẦN LÀM
│   ├── job.routes.js            ← CẦN LÀM
│   ├── project.routes.js        ← CẦN LÀM
│   └── ai.routes.js             ← CẦN LÀM
├── models/
│   ├── CompanyProfile.model.js  ← CẦN LÀM
│   └── Application.model.js     ← CẦN LÀM
└── services/
    └── ai.service.js            ← CẦN LÀM (call Python API)
```

**Frontend - cần tạo thêm:**
```
frontend/src/
├── pages/
│   ├── HomePage.jsx             ← CẦN LÀM
│   ├── auth/
│   │   ├── LoginPage.jsx        ← CẦN LÀM
│   │   └── RegisterPage.jsx     ← CẦN LÀM
│   ├── student/
│   │   ├── Dashboard.jsx        ← CẦN LÀM
│   │   ├── Profile.jsx          ← CẦN LÀM
│   │   └── Projects.jsx         ← CẦN LÀM
│   ├── jobs/
│   │   ├── JobsPage.jsx         ← CẦN LÀM
│   │   └── JobDetailPage.jsx    ← CẦN LÀM
│   └── projects/
│       ├── ProjectsShowcase.jsx ← CẦN LÀM
│       └── ProjectDetailPage.jsx← CẦN LÀM
├── components/
│   ├── Navbar.jsx               ← CẦN LÀM
│   ├── Footer.jsx               ← CẦN LÀM
│   ├── JobCard.jsx              ← CẦN LÀM
│   ├── ProjectCard.jsx          ← CẦN LÀM
│   └── ProtectedRoute.jsx       ← CẦN LÀM
├── layouts/
│   ├── MainLayout.jsx           ← CẦN LÀM
│   └── DashboardLayout.jsx      ← CẦN LÀM
└── services/
    └── api.js                   ← CẦN LÀM (axios instance)
```

---

## 🎨 DESIGN SYSTEM ĐÃ CÓ

Trong `tailwind.config.js`:

**Colors:**
```javascript
primary-500  // #0066FF - Blue chủ đạo
accent-500   // #00D4FF - Cyan accent
dark-500     // #0A0E27 - Background tối
```

**Fonts:**
```javascript
font-sans    // 'Outfit' - Headings & body
font-mono    // 'JetBrains Mono' - Code
```

**Animations:**
```javascript
animate-float     // Float effect
animate-slide-up  // Slide up
animate-fade-in   // Fade in
```

---

## 📚 TÀI LIỆU THAM KHẢO

Tất cả trong folder `docs/`:
- **SETUP.md** - Chi tiết cài đặt, xử lý lỗi
- **API.md** - Tất cả API endpoints với examples
- **DATABASE.md** - Database schema chi tiết

---

## 🆘 GẶP LỖI?

### Lỗi thường gặp:

**1. Cannot find module**
```bash
cd backend  # hoặc frontend
rm -rf node_modules package-lock.json
npm install
```

**2. MongoDB connection failed**
```bash
# Kiểm tra MongoDB có chạy không
mongosh

# Nếu không, start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
```

**3. Port already in use**
```bash
# Đổi port trong .env
# Backend: PORT=5001
# Frontend: Vite sẽ tự suggest port khác
```

---

## 🎯 KẾ HOẠCH PHÁT TRIỂN ĐỀ XUẤT

### Tuần 1-2: Core Features
- [ ] Hoàn thiện authentication UI
- [ ] Student profile CRUD
- [ ] Job listing & search
- [ ] Basic application flow

### Tuần 3-4: Advanced Features
- [ ] Project showcase
- [ ] File upload (CV, images)
- [ ] Notifications
- [ ] Dashboard analytics

### Tuần 5-6: AI & Polish
- [ ] AI job matching (basic)
- [ ] Skill recommendations
- [ ] UI/UX refinement
- [ ] Testing & bug fixes

### Tuần 7-8: Deploy
- [ ] Production build
- [ ] Deploy frontend (Vercel)
- [ ] Deploy backend (Railway/Render)
- [ ] Setup domain & SSL

---

## ✅ CHECKLIST TRƯỚC KHI BẮT ĐẦU

- [ ] Node.js installed (`node -v`)
- [ ] MongoDB installed & running
- [ ] Cursor/VS Code opened
- [ ] Backend `npm install` done
- [ ] Frontend `npm install` done
- [ ] `.env` files created
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] Can access http://localhost:5173

**Nếu tất cả ✅ → BẮT ĐẦU CODE! 🚀**

---

## 🤖 SỬ DỤNG CURSOR AI HIỆU QUẢ

### Prompt Templates:

**Tạo component:**
```
Tạo React component [TÊN] để [MỤC ĐÍCH]. 
Sử dụng Tailwind classes theo design system trong tailwind.config.js.
Props cần có: [DANH SÁCH PROPS]
```

**Tạo API endpoint:**
```
Viết controller [TÊN] với endpoint [METHOD] /api/[PATH].
Sử dụng model [MODEL_NAME] đã có.
Logic: [MÔ TẢ LOGIC]
```

**Debug:**
```
Tôi gặp lỗi [LỖI]. Đây là code hiện tại: [CODE].
Giúp tôi sửa và giải thích tại sao.
```

---

**CHÚC BẠN CODE VUI VẺ! 💪**

Nếu cần hỗ trợ, xem docs/ hoặc tạo issue trên GitHub.
