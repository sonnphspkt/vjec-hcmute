# UTE Job Platform

**Digital Career Ecosystem for Future Engineers**

Hệ sinh thái nghề nghiệp số cho kỹ sư tương lai - kết nối sinh viên, doanh nghiệp và nhà trường.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool (nhanh hơn CRA)
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management (nhẹ hơn Redux)
- **React Query** - Data fetching & caching
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database (NoSQL, linh hoạt)
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload
- **Socket.io** - Real-time features

### AI/ML (Python microservice)
- **Python 3.10+**
- **FastAPI** - API framework
- **scikit-learn** - ML algorithms
- **pandas** - Data processing
- **TensorFlow/PyTorch** - Deep learning (optional)

## 📁 Project Structure

```
ute-job-platform/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Zustand stores
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Images, icons
│   ├── public/
│   └── package.json
│
├── backend/               # Node.js API
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Helper functions
│   │   └── config/        # Configuration
│   ├── uploads/           # Uploaded files
│   └── package.json
│
├── ai-service/            # Python AI microservice
│   ├── app/
│   │   ├── models/        # ML models
│   │   ├── routes/        # API endpoints
│   │   └── utils/         # Helper functions
│   └── requirements.txt
│
└── docs/                  # Documentation
    ├── API.md
    ├── DATABASE.md
    └── DEPLOYMENT.md
```

## 🎯 Core Features

### 1. Career DNA (Hồ sơ năng lực số)
- ✅ Student profile với timeline
- ✅ Skills tracking & visualization
- ✅ Project portfolio
- ✅ Education & certificates
- ✅ Work experience timeline

### 2. AI Career Engine
- ✅ AI Job Matching (ML-based)
- ✅ Skill Gap Analysis
- ✅ Career Recommendation
- ✅ CV/Portfolio AI Review
- ✅ Market Trend Prediction

### 3. Job Management
- ✅ Job posting (CRUD)
- ✅ Advanced search & filters
- ✅ Application tracking
- ✅ Saved jobs & alerts
- ✅ Company profiles

### 4. Project Showcase
- ✅ Upload projects (video, images, GitHub)
- ✅ Like, comment, share
- ✅ Categories & tags
- ✅ Trending projects
- ✅ Company can save/contact

### 5. Remote Work Hub
- ✅ Freelance/Part-time jobs
- ✅ Mini projects
- ✅ Hourly rate calculator
- ✅ Payment tracking (integration ready)

### 6. Analytics Dashboard
- ✅ Student analytics
- ✅ Company analytics
- ✅ University dashboard
- ✅ Market insights
- ✅ Skill demand charts

## 🔐 User Roles

1. **Student** - Tạo profile, ứng tuyển, showcase projects
2. **Company** - Đăng tuyển, tìm ứng viên, xem analytics
3. **University Admin** - Quản lý, xem reports, phê duyệt
4. **Super Admin** - Full access

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB 6+
- Python 3.10+ (cho AI service)
- npm hoặc yarn

### 1. Clone & Install

```bash
# Clone project
git clone <your-repo>
cd ute-job-platform

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install AI service dependencies (optional)
cd ../ai-service
pip install -r requirements.txt
```

### 2. Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ute-job-platform
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
NODE_ENV=development

# Upload config
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# AI Service
AI_SERVICE_URL=http://localhost:8000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**AI Service (.env)**
```env
API_PORT=8000
MODEL_PATH=./models
```

### 3. Database Setup

```bash
# Start MongoDB
mongod

# Import sample data (optional)
cd backend
npm run seed
```

### 4. Run Development

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 3 - AI Service (optional)**
```bash
cd ai-service
uvicorn main:app --reload --port 8000
```

### 5. Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- AI Service: http://localhost:8000
- API Docs: http://localhost:5000/api-docs

## 📝 Default Accounts

**Student:**
- Email: student@ute.edu.vn
- Password: student123

**Company:**
- Email: company@example.com
- Password: company123

**Admin:**
- Email: admin@ute.edu.vn
- Password: admin123

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📦 Build & Deploy

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Deploy to production
npm run deploy
```

## 🗂️ Database Schema

### Collections:
- **users** - User accounts (students, companies, admins)
- **profiles** - Student career DNA
- **jobs** - Job postings
- **applications** - Job applications
- **projects** - Student projects showcase
- **companies** - Company profiles
- **skills** - Skills taxonomy
- **notifications** - User notifications
- **analytics** - Usage analytics

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student profile
- `PUT /api/students/:id` - Update profile
- `POST /api/students/:id/skills` - Add skills
- `GET /api/students/:id/career-dna` - Get Career DNA

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `POST /api/jobs` - Create job (company only)
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/apply` - Apply for job

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `POST /api/projects/:id/like` - Like project
- `POST /api/projects/:id/comment` - Comment

### AI
- `POST /api/ai/match-jobs` - AI job matching
- `POST /api/ai/analyze-skills` - Skill gap analysis
- `POST /api/ai/review-cv` - CV review
- `GET /api/ai/career-recommendations` - Career advice

### Analytics
- `GET /api/analytics/students` - Student analytics
- `GET /api/analytics/companies` - Company analytics
- `GET /api/analytics/market-trends` - Market trends

## 🎨 Design System

### Colors
- Primary: `#0066FF` (Blue)
- Accent: `#00D4FF` (Cyan)
- Success: `#00D68F`
- Warning: `#FFAA00`
- Error: `#FF3B30`
- Dark: `#0A0E27`

### Typography
- Headings: **Outfit** (Bold, 800)
- Body: **Outfit** (Regular, 400)
- Code: **JetBrains Mono**

### Components
- Sử dụng TailwindCSS utilities
- Custom components trong `/src/components`
- Responsive: Mobile-first approach

## 🚀 Roadmap

### Phase 1 (MVP) - 3 months ✅
- [x] User authentication
- [x] Basic profile management
- [x] Job posting & search
- [x] Application system

### Phase 2 - 6 months
- [ ] AI Job Matching v1 (rule-based)
- [ ] Project Showcase
- [ ] Remote work listings
- [ ] Basic analytics

### Phase 3 - 12 months
- [ ] AI Job Matching v2 (ML-based)
- [ ] Advanced analytics
- [ ] Research & Innovation Hub
- [ ] Payment integration
- [ ] Mobile app

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Your Name]
- **Frontend**: [Developer Name]
- **Backend**: [Developer Name]
- **AI/ML**: [Developer Name]
- **UI/UX**: [Designer Name]

## 📞 Contact

- Email: support@utejobplatform.com
- Website: https://utejobplatform.com
- Facebook: https://facebook.com/utejobplatform

---

**Made with ❤️ by UTE Students for UTE Students**
