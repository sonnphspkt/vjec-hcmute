# 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

## 📋 Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **MongoDB** >= 6.0 ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/))
- **npm** hoặc **yarn** (đi kèm với Node.js)
- **Python 3.10+** (optional, cho AI service)

## 📁 Cấu Trúc Dự Án

```
ute-job-platform/
├── frontend/          # React app (Vite)
├── backend/           # Node.js API (Express)
├── ai-service/        # Python AI microservice (optional)
├── docs/              # Documentation
└── README.md
```

---

## ⚡ SETUP NHANH (Quick Start)

### Bước 1: Clone Project

```bash
# Nếu đã có trên GitHub
git clone https://github.com/your-org/ute-job-platform.git
cd ute-job-platform

# Hoặc nếu chưa có git repo, chỉ cần giải nén folder này
```

### Bước 2: Cài Đặt MongoDB

**Windows:**
1. Download MongoDB Community Server
2. Install với default settings
3. MongoDB sẽ tự chạy như một service

**Mac (với Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Kiểm tra MongoDB đã chạy:**
```bash
mongosh
# Nếu kết nối được thì OK
```

### Bước 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Tạo file .env
cp .env.example .env

# Hoặc tạo file .env mới với nội dung sau:
```

**File `backend/.env`:**
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ute-job-platform

# JWT
JWT_SECRET=ute-job-platform-super-secret-key-change-this-in-production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=30

# Frontend URL
FRONTEND_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# AI Service (optional)
AI_SERVICE_URL=http://localhost:8000
```

**Chạy Backend:**
```bash
# Development mode (auto-reload)
npm run dev

# Hoặc production mode
npm start
```

Backend sẽ chạy tại: **http://localhost:5000**

### Bước 4: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Tạo file .env
```

**File `frontend/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**Chạy Frontend:**
```bash
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

---

## 🎯 TESTING

### Test Backend

```bash
cd backend

# Kiểm tra server có chạy không
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","timestamp":"...","uptime":...}
```

### Test Frontend

Mở browser và truy cập:
- **http://localhost:5173** - Trang chủ
- **http://localhost:5173/login** - Trang login
- **http://localhost:5173/register** - Trang đăng ký

---

## 📊 SEED DATABASE (Tạo Dữ Liệu Mẫu)

```bash
cd backend

# Chạy seed script để tạo dữ liệu mẫu
npm run seed
```

Seed script sẽ tạo:
- 3 tài khoản test (student, company, admin)
- 10 student profiles mẫu
- 5 companies mẫu
- 20 jobs mẫu
- 15 projects mẫu

**Tài khoản test:**
- Student: `student@ute.edu.vn` / `student123`
- Company: `company@example.com` / `company123`
- Admin: `admin@ute.edu.vn` / `admin123`

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: MongoDB Connection Failed

**Nguyên nhân:** MongoDB chưa chạy

**Giải pháp:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Lỗi 2: Port 5000 đã được sử dụng

**Nguyên nhân:** Port 5000 bị chiếm bởi process khác

**Giải pháp:**
```bash
# Tìm process đang dùng port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Hoặc đổi port trong backend/.env
PORT=5001
```

### Lỗi 3: Module not found

**Nguyên nhân:** Dependencies chưa cài đặt

**Giải pháp:**
```bash
# Xóa node_modules và reinstall
cd backend  # hoặc cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Lỗi 4: CORS Error

**Nguyên nhân:** Frontend URL chưa được whitelist

**Giải pháp:**
- Check file `backend/.env` có `FRONTEND_URL=http://localhost:5173`
- Restart backend server

---

## 📱 CHẠY TRÊN CURSOR

### 1. Mở Project trong Cursor

```bash
# Mở Cursor
cursor .

# Hoặc
code .  # nếu dùng VS Code
```

### 2. Install Extensions (Recommended)

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **MongoDB for VS Code** - Xem database
- **Thunder Client** hoặc **REST Client** - Test API

### 3. Workspace Settings

Tạo file `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 4. Debug Configuration

Tạo file `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Backend",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/backend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    },
    {
      "name": "Frontend",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/frontend"
    }
  ]
}
```

---

## 🔧 DEVELOPMENT WORKFLOW

### Terminal Setup (Multi-terminal)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - MongoDB (nếu cần):**
```bash
mongosh
```

### Git Workflow

```bash
# Tạo branch mới cho feature
git checkout -b feature/ten-tinh-nang

# Commit changes
git add .
git commit -m "feat: thêm tính năng X"

# Push lên remote
git push origin feature/ten-tinh-nang

# Tạo Pull Request trên GitHub
```

---

## 📦 BUILD & DEPLOY

### Build Production

**Frontend:**
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

**Backend:**
```bash
cd backend
# Backend không cần build, nhưng cần set NODE_ENV
NODE_ENV=production npm start
```

### Deploy Options

1. **Vercel** (Frontend)
   - Connect GitHub repo
   - Auto deploy on push
   - Free tier available

2. **Railway** (Backend + MongoDB)
   - Deploy backend API
   - Managed MongoDB
   - Free tier: $5 credit/month

3. **Render** (Full-stack)
   - Free tier available
   - Auto deploy from GitHub

4. **VPS (DigitalOcean, AWS, etc.)**
   - Full control
   - Requires manual setup

---

## 📚 API DOCUMENTATION

Sau khi chạy backend, truy cập:
- **API Docs:** http://localhost:5000/api-docs (nếu đã setup Swagger)
- **Health Check:** http://localhost:5000/health

### Các API Endpoint Chính:

**Auth:**
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user

**Students:**
- `GET /api/students` - Danh sách sinh viên
- `GET /api/students/:id` - Chi tiết sinh viên
- `PUT /api/students/:id` - Cập nhật profile

**Jobs:**
- `GET /api/jobs` - Danh sách việc làm
- `POST /api/jobs` - Tạo việc làm (company)
- `POST /api/jobs/:id/apply` - Ứng tuyển

**Projects:**
- `GET /api/projects` - Danh sách dự án
- `POST /api/projects` - Tạo dự án
- `POST /api/projects/:id/like` - Like dự án

---

## 🤝 CONTRIBUTING

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### Commit Message Convention

- `feat:` - Tính năng mới
- `fix:` - Sửa bug
- `docs:` - Cập nhật documentation
- `style:` - Format code, không thay đổi logic
- `refactor:` - Refactor code
- `test:` - Thêm tests
- `chore:` - Update dependencies, configs

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:

1. Check console logs (Browser & Terminal)
2. Check MongoDB đã chạy chưa
3. Check `.env` files
4. Clear `node_modules` và reinstall
5. Tạo issue trên GitHub repo

**Contact:**
- Email: support@utejobplatform.com
- Slack: #ute-job-platform

---

## ✅ CHECKLIST LẦN ĐẦU SETUP

- [ ] Node.js đã cài (check: `node -v`)
- [ ] MongoDB đã cài và đang chạy (check: `mongosh`)
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend `.env` đã tạo với đúng config
- [ ] Frontend `.env` đã tạo
- [ ] Backend chạy OK tại http://localhost:5000
- [ ] Frontend chạy OK tại http://localhost:5173
- [ ] Test đăng ký tài khoản thành công
- [ ] Test login thành công

---

**Chúc bạn code vui vẻ! 🚀**
