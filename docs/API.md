# 📡 API DOCUMENTATION

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

Tất cả các API có nhãn `🔒 Protected` yêu cầu JWT token trong header:

```
Authorization: Bearer <your-token>
```

---

## 📋 Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Student APIs](#student-apis)
3. [Company APIs](#company-apis)
4. [Job APIs](#job-apis)
5. [Application APIs](#application-apis)
6. [Project APIs](#project-apis)
7. [AI APIs](#ai-apis)
8. [Analytics APIs](#analytics-apis)

---

## 1️⃣ Authentication APIs

### Register

**POST** `/auth/register`

Đăng ký tài khoản mới.

**Request Body:**
```json
{
  "email": "student@ute.edu.vn",
  "password": "password123",
  "role": "student",
  "firstName": "Nguyen",
  "lastName": "Van A"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "student@ute.edu.vn",
    "role": "student"
  }
}
```

---

### Login

**POST** `/auth/login`

Đăng nhập.

**Request Body:**
```json
{
  "email": "student@ute.edu.vn",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "student@ute.edu.vn",
    "role": "student"
  }
}
```

---

### Get Current User

**GET** `/auth/me` 🔒 Protected

Lấy thông tin user đang đăng nhập.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "student@ute.edu.vn",
      "role": "student",
      "isVerified": true,
      "isActive": true
    },
    "profile": {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "Nguyen",
      "lastName": "Van A",
      "avatar": "avatar.jpg",
      "bio": "CS Student at UTE",
      "skills": [...],
      "completionPercentage": 75
    }
  }
}
```

---

### Logout

**POST** `/auth/logout` 🔒 Protected

Đăng xuất.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {}
}
```

---

## 2️⃣ Student APIs

### Get All Students

**GET** `/students`

Lấy danh sách sinh viên với filters.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `skills` (string, comma-separated)
- `major` (string)
- `minGpa` (number)
- `search` (string)

**Example:**
```
GET /students?page=1&limit=10&skills=React,Node.js&major=Computer Science
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "Nguyen",
      "lastName": "Van A",
      "avatar": "avatar.jpg",
      "bio": "CS Student",
      "skills": [
        {
          "name": "React",
          "level": "advanced",
          "category": "framework"
        }
      ],
      "education": [...],
      "completionPercentage": 75
    }
  ]
}
```

---

### Get Student Profile

**GET** `/students/:id`

Lấy thông tin chi tiết một sinh viên.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "firstName": "Nguyen",
    "lastName": "Van A",
    "dateOfBirth": "2002-01-15",
    "phone": "0901234567",
    "avatar": "avatar.jpg",
    "bio": "Passionate CS student...",
    "location": {
      "city": "Ho Chi Minh",
      "country": "Vietnam"
    },
    "education": [
      {
        "university": "UTE HCMC",
        "major": "Computer Science",
        "degree": "Bachelor",
        "startYear": 2020,
        "endYear": 2024,
        "gpa": 3.5,
        "status": "studying"
      }
    ],
    "skills": [
      {
        "name": "React",
        "category": "framework",
        "level": "advanced",
        "yearsOfExperience": 2,
        "endorsements": 5
      }
    ],
    "experience": [...],
    "certifications": [...],
    "careerDNA": {
      "strengths": ["Problem Solving", "Team Work"],
      "weaknesses": ["Public Speaking"],
      "marketValue": 75,
      "skillGaps": [...]
    },
    "socialLinks": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username"
    },
    "stats": {
      "profileViews": 150,
      "applicationsSubmitted": 10,
      "projectsPublished": 5
    },
    "completionPercentage": 85
  }
}
```

---

### Update Student Profile

**PUT** `/students/:id` 🔒 Protected (Own profile only)

Cập nhật profile sinh viên.

**Request Body:**
```json
{
  "bio": "Updated bio...",
  "phone": "0901234567",
  "skills": [
    {
      "name": "Python",
      "category": "language",
      "level": "intermediate"
    }
  ],
  "socialLinks": {
    "github": "https://github.com/newusername"
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    // Updated profile
  }
}
```

---

### Add Skills

**POST** `/students/:id/skills` 🔒 Protected

Thêm kỹ năng mới.

**Request Body:**
```json
{
  "skills": [
    {
      "name": "Docker",
      "category": "tool",
      "level": "intermediate",
      "yearsOfExperience": 1
    }
  ]
}
```

---

### Get Career DNA

**GET** `/students/:id/career-dna` 🔒 Protected

Lấy Career DNA analysis.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "strengths": ["Technical Skills", "Problem Solving"],
    "weaknesses": ["Communication", "Leadership"],
    "recommendations": [
      "Take public speaking course",
      "Join tech community"
    ],
    "careerPath": "Full-stack Developer",
    "marketValue": 78,
    "skillGaps": [
      {
        "skill": "TypeScript",
        "importance": "important",
        "marketDemand": 85
      }
    ],
    "lastAnalyzed": "2024-01-15T10:30:00Z"
  }
}
```

---

## 3️⃣ Job APIs

### Get All Jobs

**GET** `/jobs`

Lấy danh sách công việc.

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `type` (full-time|part-time|internship|freelance|remote)
- `category` (software|hardware|ai-ml|...)
- `level` (intern|fresher|junior|mid-level|senior)
- `city` (string)
- `skills` (comma-separated)
- `minSalary` (number)
- `maxSalary` (number)
- `search` (string)
- `status` (published|closed)

**Example:**
```
GET /jobs?type=full-time&category=software&city=Ho Chi Minh&skills=React,Node.js
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 50,
  "pagination": {...},
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "company": {
        "_id": "507f1f77bcf86cd799439015",
        "companyName": "Tech Company",
        "logo": "logo.png"
      },
      "title": "Frontend Developer",
      "slug": "frontend-developer-1234567",
      "description": "We are looking for...",
      "type": "full-time",
      "category": "software",
      "level": "junior",
      "location": {
        "city": "Ho Chi Minh",
        "country": "Vietnam",
        "isRemote": false
      },
      "salary": {
        "min": 15000000,
        "max": 25000000,
        "currency": "VND",
        "isNegotiable": true,
        "isPublic": true
      },
      "requiredSkills": [
        {
          "name": "React",
          "level": "intermediate",
          "importance": "required"
        }
      ],
      "benefits": ["Health Insurance", "13th month salary"],
      "applicationDeadline": "2024-02-28",
      "numberOfOpenings": 2,
      "status": "published",
      "views": 1250,
      "applications": 45,
      "isFeatured": true,
      "publishedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get Job Detail

**GET** `/jobs/:id`

Lấy chi tiết công việc.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "company": {
      "_id": "507f1f77bcf86cd799439015",
      "companyName": "Tech Company",
      "logo": "logo.png",
      "description": "Leading tech company...",
      "website": "https://example.com",
      "size": "100-500",
      "industry": "Software Development"
    },
    "title": "Frontend Developer",
    "description": "Full job description...",
    "responsibilities": [
      "Develop user interfaces",
      "Write clean code",
      "Collaborate with team"
    ],
    "requirements": [
      "2+ years experience with React",
      "Strong CSS skills",
      "Good communication"
    ],
    "type": "full-time",
    "category": "software",
    "level": "junior",
    "location": {...},
    "salary": {...},
    "requiredSkills": [...],
    "benefits": [...],
    "applicationMethod": {
      "type": "platform",
      "email": null,
      "externalUrl": null
    },
    "applicationDeadline": "2024-02-28",
    "numberOfOpenings": 2,
    "tags": ["react", "frontend", "javascript"],
    "views": 1250,
    "applications": 45,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### Create Job

**POST** `/jobs` 🔒 Protected (Company only)

Tạo việc làm mới.

**Request Body:**
```json
{
  "title": "Backend Developer",
  "description": "We are looking for...",
  "responsibilities": [
    "Design APIs",
    "Write tests"
  ],
  "requirements": [
    "3+ years Node.js",
    "Database experience"
  ],
  "type": "full-time",
  "category": "software",
  "level": "mid-level",
  "location": {
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "address": "123 Street",
    "isRemote": false
  },
  "salary": {
    "min": 20000000,
    "max": 35000000,
    "currency": "VND",
    "isNegotiable": true,
    "isPublic": true
  },
  "requiredSkills": [
    {
      "name": "Node.js",
      "level": "advanced",
      "importance": "required"
    }
  ],
  "benefits": ["Health Insurance", "Flexible hours"],
  "applicationDeadline": "2024-03-31",
  "numberOfOpenings": 1,
  "tags": ["nodejs", "backend", "api"]
}
```

**Response:** `201 Created`

---

### Apply for Job

**POST** `/jobs/:id/apply` 🔒 Protected (Student only)

Ứng tuyển công việc.

**Request Body:**
```json
{
  "coverLetter": "Dear Hiring Manager...",
  "resumeUrl": "https://...",
  "answers": [
    {
      "question": "Why do you want this job?",
      "answer": "Because..."
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "job": "507f1f77bcf86cd799439020",
    "student": "507f1f77bcf86cd799439012",
    "status": "pending",
    "appliedAt": "2024-01-20T14:30:00Z"
  }
}
```

---

## 4️⃣ Project APIs

### Get All Projects

**GET** `/projects`

Lấy danh sách dự án.

**Query Parameters:**
- `page`, `limit`
- `category` (web|mobile|ai-ml|...)
- `type` (personal|academic|hackathon|...)
- `technologies` (comma-separated)
- `search`
- `student` (student ID)
- `featured` (true|false)

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "student": {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "Nguyen",
        "lastName": "Van A",
        "avatar": "avatar.jpg"
      },
      "title": "E-commerce Platform",
      "slug": "e-commerce-platform-1234",
      "description": "Full-stack e-commerce...",
      "category": "web",
      "type": "personal",
      "thumbnail": "thumbnail.jpg",
      "images": [...],
      "videos": [...],
      "demoUrl": "https://demo.example.com",
      "sourceCodeUrl": "https://github.com/...",
      "technologies": [
        {
          "name": "React",
          "category": "framework"
        },
        {
          "name": "Node.js",
          "category": "platform"
        }
      ],
      "status": "completed",
      "likeCount": 45,
      "commentCount": 12,
      "views": 500,
      "isFeatured": true,
      "createdAt": "2024-01-10T00:00:00Z"
    }
  ]
}
```

---

### Get Project Detail

**GET** `/projects/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439040",
    "student": {...},
    "title": "E-commerce Platform",
    "description": "Detailed description...",
    "category": "web",
    "type": "personal",
    "thumbnail": "thumbnail.jpg",
    "images": [
      {
        "url": "image1.jpg",
        "caption": "Homepage"
      }
    ],
    "videos": [...],
    "demoUrl": "https://demo.example.com",
    "sourceCodeUrl": "https://github.com/...",
    "documentUrl": "https://docs.example.com",
    "technologies": [...],
    "team": [
      {
        "name": "Nguyen Van B",
        "role": "Backend Developer",
        "profile": "507f1f77bcf86cd799439013"
      }
    ],
    "startDate": "2023-09-01",
    "endDate": "2023-12-15",
    "status": "completed",
    "achievements": [
      {
        "title": "Won Hackathon",
        "description": "1st place at...",
        "date": "2023-12-20"
      }
    ],
    "likes": [...],
    "comments": [
      {
        "user": {...},
        "text": "Great project!",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "likeCount": 45,
    "commentCount": 12,
    "views": 500,
    "tags": ["react", "nodejs", "mongodb"]
  }
}
```

---

### Create Project

**POST** `/projects` 🔒 Protected (Student only)

Tạo dự án mới.

**Request Body:**
```json
{
  "title": "My Awesome Project",
  "description": "Description...",
  "category": "web",
  "type": "personal",
  "thumbnail": "thumbnail.jpg",
  "demoUrl": "https://demo.com",
  "sourceCodeUrl": "https://github.com/...",
  "technologies": [
    {"name": "React", "category": "framework"},
    {"name": "Node.js", "category": "platform"}
  ],
  "startDate": "2024-01-01",
  "endDate": "2024-01-30",
  "status": "completed",
  "tags": ["react", "fullstack"]
}
```

**Response:** `201 Created`

---

### Like Project

**POST** `/projects/:id/like` 🔒 Protected

Like/Unlike dự án.

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Project liked",
  "likeCount": 46
}
```

---

### Comment on Project

**POST** `/projects/:id/comment` 🔒 Protected

Comment vào dự án.

**Request Body:**
```json
{
  "text": "Great work!"
}
```

**Response:** `201 Created`

---

## 5️⃣ AI APIs

### AI Job Matching

**POST** `/ai/match-jobs` 🔒 Protected (Student only)

AI tìm việc phù hợp với profile.

**Request Body:**
```json
{
  "limit": 10,
  "preferences": {
    "jobTypes": ["full-time", "remote"],
    "locations": ["Ho Chi Minh"],
    "minSalary": 15000000
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "job": {...},
        "matchScore": 92,
        "reasons": [
          "Skills match: React (90%)",
          "Experience level matches",
          "Location preference matched"
        ],
        "skillGaps": [
          {
            "skill": "TypeScript",
            "importance": "important"
          }
        ]
      }
    ]
  }
}
```

---

### Skill Gap Analysis

**POST** `/ai/analyze-skills` 🔒 Protected

Phân tích khoảng cách kỹ năng.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "currentSkills": [...],
    "marketDemand": {
      "topSkills": ["React", "Python", "Docker"],
      "emergingSkills": ["Next.js", "GraphQL"]
    },
    "recommendations": [
      {
        "skill": "TypeScript",
        "reason": "85% of jobs require this",
        "priority": "high",
        "learningResources": [...]
      }
    ],
    "careerPaths": [
      {
        "title": "Full-stack Developer",
        "matchScore": 78,
        "requiredSkills": [...],
        "averageSalary": 25000000
      }
    ]
  }
}
```

---

## 6️⃣ Analytics APIs

### Student Analytics

**GET** `/analytics/students` 🔒 Protected (University Admin)

Thống kê sinh viên.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalStudents": 5000,
    "activeProfiles": 4200,
    "averageCompletionRate": 68,
    "topSkills": [
      {"skill": "Python", "count": 2500},
      {"skill": "Java", "count": 2200}
    ],
    "employmentRate": 75,
    "averageSalary": 18000000,
    "topCompanies": [...],
    "trends": {
      "monthlyRegistrations": [...]
    }
  }
}
```

---

## 📊 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "User role student is not authorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Server Error"
}
```

---

## 🔧 Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Header:** `X-RateLimit-Remaining`

---

## 📝 Notes

- Tất cả timestamps ở format ISO 8601: `2024-01-15T10:30:00Z`
- Pagination mặc định: `page=1`, `limit=10`
- File upload max size: 10MB
- Supported image formats: JPG, PNG, WebP
- Supported video: MP4 (hoặc YouTube/Vimeo links)
