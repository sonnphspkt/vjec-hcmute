# 🗄️ DATABASE SCHEMA

Database: **MongoDB** (NoSQL)
Database Name: `ute-job-platform`

---

## 📊 Collections Overview

| Collection | Purpose | Relationships |
|------------|---------|---------------|
| users | User accounts & authentication | → student_profiles, company_profiles |
| student_profiles | Student career DNA | ← users, → projects |
| company_profiles | Company information | ← users, → jobs |
| jobs | Job postings | ← company_profiles, → applications |
| applications | Job applications | ← student_profiles, ← jobs |
| projects | Student project showcase | ← student_profiles |
| skills | Skills taxonomy (master data) | Referenced by profiles |
| notifications | User notifications | → users |
| analytics | Usage analytics & metrics | References various collections |

---

## 1️⃣ Users Collection

**Purpose:** Authentication & user accounts

```javascript
{
  _id: ObjectId,
  email: String,              // unique, required
  password: String,           // hashed, select: false
  role: String,               // enum: ['student', 'company', 'university_admin', 'super_admin']
  isVerified: Boolean,        // email verification status
  isActive: Boolean,          // account active/deactivated
  lastLogin: Date,
  refreshToken: String,       // JWT refresh token
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)
- `role`
- `isActive`

---

## 2️⃣ Student Profiles Collection

**Purpose:** Student career DNA & portfolio

```javascript
{
  _id: ObjectId,
  user: ObjectId,             // ref: 'User', unique
  
  // Basic Info
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phone: String,
  avatar: String,
  bio: String,
  location: {
    city: String,
    country: String
  },
  
  // Education
  education: [{
    university: String,
    major: String,
    degree: String,           // enum: ['Bachelor', 'Master', 'PhD']
    startYear: Number,
    endYear: Number,
    gpa: Number,
    status: String            // enum: ['studying', 'graduated', 'dropped']
  }],
  
  // Skills - Career DNA Core
  skills: [{
    name: String,
    category: String,         // enum: ['technical', 'soft_skill', 'language', 'tool', 'framework']
    level: String,            // enum: ['beginner', 'intermediate', 'advanced', 'expert']
    yearsOfExperience: Number,
    endorsements: Number,
    addedDate: Date
  }],
  
  // Work Experience
  experience: [{
    company: String,
    position: String,
    type: String,             // enum: ['full-time', 'part-time', 'internship', 'freelance', 'remote']
    startDate: Date,
    endDate: Date,
    isCurrent: Boolean,
    description: String,
    achievements: [String],
    technologies: [String]
  }],
  
  // Certifications
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    credentialId: String,
    credentialUrl: String
  }],
  
  // Career DNA - AI Generated
  careerDNA: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    careerPath: String,
    marketValue: Number,      // 0-100
    skillGaps: [{
      skill: String,
      importance: String,     // enum: ['critical', 'important', 'nice-to-have']
      marketDemand: Number
    }],
    lastAnalyzed: Date
  },
  
  // Social Links
  socialLinks: {
    github: String,
    linkedin: String,
    portfolio: String,
    facebook: String,
    twitter: String
  },
  
  // Resume/CV
  resume: {
    url: String,
    uploadDate: Date,
    fileName: String
  },
  
  // Preferences
  preferences: {
    jobTypes: [String],
    expectedSalary: {
      min: Number,
      max: Number,
      currency: String
    },
    preferredLocations: [String],
    availableFrom: Date,
    willingToRelocate: Boolean
  },
  
  // Stats
  stats: {
    profileViews: Number,
    applicationsSubmitted: Number,
    projectsPublished: Number,
    endorsementsReceived: Number
  },
  
  completionPercentage: Number,  // 0-100
  isPublic: Boolean,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `user` (unique)
- `skills.name` (text)
- `firstName, lastName` (text)
- `education.major`
- `completionPercentage`

**Virtual Fields:**
- `fullName` = `firstName + lastName`

---

## 3️⃣ Company Profiles Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId,             // ref: 'User', unique
  
  // Company Info
  companyName: String,
  logo: String,
  coverImage: String,
  description: String,
  industry: String,
  size: String,               // enum: ['1-10', '11-50', '51-200', '201-500', '500+']
  founded: Number,
  website: String,
  
  // Contact
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    country: String,
    zipCode: String
  },
  
  // Social
  socialLinks: {
    linkedin: String,
    facebook: String,
    twitter: String
  },
  
  // Benefits
  benefits: [String],
  culture: String,
  
  // Verification
  isVerified: Boolean,
  verificationDocuments: [String],
  
  // Stats
  stats: {
    totalJobs: Number,
    activeJobs: Number,
    totalHires: Number,
    profileViews: Number
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `user` (unique)
- `companyName` (text)
- `industry`
- `isVerified`

---

## 4️⃣ Jobs Collection

```javascript
{
  _id: ObjectId,
  company: ObjectId,          // ref: 'CompanyProfile'
  
  title: String,
  slug: String,               // unique, auto-generated
  description: String,
  responsibilities: [String],
  requirements: [String],
  
  // Job Details
  type: String,               // enum: ['full-time', 'part-time', 'internship', 'freelance', 'remote', 'contract']
  category: String,           // enum: ['software', 'hardware', 'embedded', 'network', 'ai-ml', 'data', 'design', 'management', 'other']
  level: String,              // enum: ['intern', 'fresher', 'junior', 'mid-level', 'senior', 'lead', 'manager']
  
  // Location
  location: {
    city: String,
    country: String,
    address: String,
    isRemote: Boolean
  },
  
  // Salary
  salary: {
    min: Number,
    max: Number,
    currency: String,
    isNegotiable: Boolean,
    isPublic: Boolean
  },
  
  // Skills
  requiredSkills: [{
    name: String,
    level: String,            // enum: ['beginner', 'intermediate', 'advanced', 'expert']
    importance: String        // enum: ['required', 'preferred', 'nice-to-have']
  }],
  
  benefits: [String],
  
  // Application
  applicationDeadline: Date,
  numberOfOpenings: Number,
  applicationMethod: {
    type: String,             // enum: ['platform', 'email', 'external']
    email: String,
    externalUrl: String
  },
  
  // Status
  status: String,             // enum: ['draft', 'published', 'closed', 'filled']
  
  // Stats
  views: Number,
  applications: Number,
  
  // Features
  isFeatured: Boolean,
  isUrgent: Boolean,
  
  tags: [String],
  
  publishedAt: Date,
  closedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `company`
- `slug` (unique)
- `title, description` (text)
- `type, category, level`
- `status`
- `location.city`
- `requiredSkills.name`
- `publishedAt`

---

## 5️⃣ Applications Collection

```javascript
{
  _id: ObjectId,
  job: ObjectId,              // ref: 'Job'
  student: ObjectId,          // ref: 'StudentProfile'
  
  coverLetter: String,
  resumeUrl: String,
  
  // Custom questions answers
  answers: [{
    question: String,
    answer: String
  }],
  
  // Status
  status: String,             // enum: ['pending', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected', 'withdrawn', 'accepted']
  
  // Timeline
  statusHistory: [{
    status: String,
    changedAt: Date,
    changedBy: ObjectId,      // ref: 'User'
    note: String
  }],
  
  // Interview
  interviews: [{
    type: String,             // enum: ['phone', 'video', 'onsite', 'technical']
    scheduledAt: Date,
    completedAt: Date,
    feedback: String,
    rating: Number
  }],
  
  // Company notes
  companyNotes: String,
  rating: Number,             // 1-5 stars
  
  appliedAt: Date,
  withdrawnAt: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `job, student` (compound, unique)
- `student`
- `job`
- `status`
- `appliedAt`

---

## 6️⃣ Projects Collection

```javascript
{
  _id: ObjectId,
  student: ObjectId,          // ref: 'StudentProfile'
  
  title: String,
  slug: String,               // unique
  description: String,
  
  category: String,           // enum: ['web', 'mobile', 'desktop', 'ai-ml', 'iot', 'embedded', 'game', 'data-science', 'blockchain', 'other']
  type: String,               // enum: ['personal', 'academic', 'hackathon', 'freelance', 'company', 'research']
  
  // Media
  thumbnail: String,
  images: [{
    url: String,
    caption: String
  }],
  videos: [{
    url: String,
    type: String,             // enum: ['youtube', 'vimeo', 'direct']
    thumbnail: String
  }],
  
  // Links
  demoUrl: String,
  sourceCodeUrl: String,
  documentUrl: String,
  
  // Technologies
  technologies: [{
    name: String,
    category: String          // enum: ['language', 'framework', 'library', 'database', 'tool', 'platform']
  }],
  
  // Team
  team: [{
    name: String,
    role: String,
    profile: ObjectId         // ref: 'StudentProfile'
  }],
  
  // Timeline
  startDate: Date,
  endDate: Date,
  status: String,             // enum: ['planning', 'in-progress', 'completed', 'on-hold', 'abandoned']
  
  // Academic
  isAcademic: Boolean,
  course: String,
  semester: String,
  grade: String,
  
  // Achievements
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  awards: [String],
  
  // Engagement
  likes: [{
    user: ObjectId,           // ref: 'User'
    likedAt: Date
  }],
  comments: [{
    user: ObjectId,
    text: String,
    createdAt: Date
  }],
  saves: [{
    user: ObjectId,
    savedAt: Date
  }],
  
  views: Number,
  
  isPublic: Boolean,
  isFeatured: Boolean,
  
  tags: [String],
  
  // Company Interest
  companyInterests: [{
    company: ObjectId,
    message: String,
    status: String,           // enum: ['pending', 'contacted', 'rejected']
    createdAt: Date
  }],
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `student`
- `slug` (unique)
- `title, description` (text)
- `category, type`
- `technologies.name`
- `isFeatured`
- `createdAt`

**Virtual Fields:**
- `likeCount` = `likes.length`
- `commentCount` = `comments.length`

---

## 7️⃣ Skills Collection (Master Data)

```javascript
{
  _id: ObjectId,
  name: String,               // unique
  category: String,
  aliases: [String],          // alternative names
  relatedSkills: [String],
  
  // Market Data
  marketDemand: Number,       // 0-100
  averageSalary: Number,
  trendScore: Number,         // trending score
  
  // Learning Resources
  learningPaths: [{
    title: String,
    url: String,
    provider: String
  }],
  
  lastUpdated: Date
}
```

---

## 8️⃣ Notifications Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId,             // ref: 'User'
  
  type: String,               // enum: ['job_match', 'application_update', 'project_like', 'project_comment', 'message', 'system']
  title: String,
  message: String,
  
  // Related entities
  relatedJob: ObjectId,
  relatedProject: ObjectId,
  relatedApplication: ObjectId,
  
  isRead: Boolean,
  readAt: Date,
  
  createdAt: Date
}
```

**Indexes:**
- `user, isRead`
- `createdAt`

---

## 9️⃣ Analytics Collection

```javascript
{
  _id: ObjectId,
  
  type: String,               // enum: ['page_view', 'job_view', 'profile_view', 'project_view', 'search', 'application']
  
  // User info
  user: ObjectId,
  userRole: String,
  isAnonymous: Boolean,
  
  // Event data
  entity: String,             // 'job', 'profile', 'project'
  entityId: ObjectId,
  
  // Metadata
  metadata: {
    page: String,
    referrer: String,
    device: String,
    browser: String,
    location: String
  },
  
  timestamp: Date,
  createdAt: Date
}
```

**Indexes:**
- `type, timestamp`
- `user`
- `entityId`

---

## 🔗 Relationships Diagram

```
users (1) ──────┬──────> (1) student_profiles
                │
                └──────> (1) company_profiles
                             │
                             └──────> (N) jobs
                                      │
                                      └──────> (N) applications
                                               │
student_profiles (1) ────────────────────────┘
                │
                └──────> (N) projects
```

---

## 📏 Data Sizing Estimates

**Small Scale (MVP):**
- Users: 1,000
- Student Profiles: 800
- Companies: 50
- Jobs: 200
- Applications: 2,000
- Projects: 500

**Medium Scale (1 year):**
- Users: 10,000
- Student Profiles: 8,000
- Companies: 500
- Jobs: 2,000
- Applications: 50,000
- Projects: 5,000

**Large Scale (3+ years):**
- Users: 100,000+
- Student Profiles: 80,000+
- Companies: 2,000+
- Jobs: 10,000+
- Applications: 500,000+
- Projects: 50,000+

---

## 🔧 Database Maintenance

### Backup Strategy
```bash
# Daily backup
mongodump --db ute-job-platform --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db ute-job-platform /backup/20240115
```

### Indexes Monitoring
```javascript
// Check index usage
db.student_profiles.aggregate([{ $indexStats: {} }])

// Rebuild indexes if needed
db.student_profiles.reIndex()
```

### Data Cleanup
```javascript
// Remove old analytics (older than 6 months)
db.analytics.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) }
})
```

---

## 🚀 Performance Optimization

1. **Use projection** to fetch only needed fields
2. **Implement pagination** for large result sets
3. **Create appropriate indexes** based on query patterns
4. **Use aggregation pipeline** for complex queries
5. **Implement caching** (Redis) for frequently accessed data
6. **Monitor slow queries** with MongoDB profiler
