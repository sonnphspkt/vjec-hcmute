const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Basic Info
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  location: {
    city: String,
    country: String
  },
  
  // Education
  education: [{
    university: {
      type: String,
      default: 'Đại học Sư phạm Kỹ thuật TP.HCM'
    },
    major: String,
    degree: {
      type: String,
      enum: ['Bachelor', 'Master', 'PhD']
    },
    startYear: Number,
    endYear: Number,
    gpa: Number,
    status: {
      type: String,
      enum: ['studying', 'graduated', 'dropped'],
      default: 'studying'
    }
  }],
  
  // Skills - Career DNA Core
  skills: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['technical', 'soft_skill', 'language', 'tool', 'framework'],
      required: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner'
    },
    yearsOfExperience: {
      type: Number,
      default: 0
    },
    endorsements: {
      type: Number,
      default: 0
    },
    addedDate: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Work Experience
  experience: [{
    company: String,
    position: String,
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'freelance', 'remote']
    },
    startDate: Date,
    endDate: Date,
    isCurrent: {
      type: Boolean,
      default: false
    },
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
  
  // Career DNA - AI Generated Insights
  careerDNA: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    careerPath: String,
    marketValue: {
      type: Number,
      min: 0,
      max: 100
    },
    skillGaps: [{
      skill: String,
      importance: {
        type: String,
        enum: ['critical', 'important', 'nice-to-have']
      },
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
    jobTypes: [{
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'freelance', 'remote']
    }],
    expectedSalary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'VND'
      }
    },
    preferredLocations: [String],
    availableFrom: Date,
    willingToRelocate: {
      type: Boolean,
      default: false
    }
  },
  
  // Stats
  stats: {
    profileViews: {
      type: Number,
      default: 0
    },
    applicationsSubmitted: {
      type: Number,
      default: 0
    },
    projectsPublished: {
      type: Number,
      default: 0
    },
    endorsementsReceived: {
      type: Number,
      default: 0
    }
  },
  
  // Profile completion percentage
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  isPublic: {
    type: Boolean,
    default: true
  },

  /** Minh họa nội dung — tài khoản seed / demo */
  isDemoProfile: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate profile completion
studentProfileSchema.methods.calculateCompletion = function() {
  let score = 0;
  const weights = {
    basicInfo: 20,
    education: 15,
    skills: 20,
    experience: 15,
    resume: 10,
    bio: 10,
    socialLinks: 10
  };
  
  // Basic info
  if (this.firstName && this.lastName && this.phone && this.avatar !== 'default-avatar.png') {
    score += weights.basicInfo;
  }
  
  // Education
  if (this.education && this.education.length > 0) {
    score += weights.education;
  }
  
  // Skills
  if (this.skills && this.skills.length >= 5) {
    score += weights.skills;
  }
  
  // Experience
  if (this.experience && this.experience.length > 0) {
    score += weights.experience;
  }
  
  // Resume
  if (this.resume && this.resume.url) {
    score += weights.resume;
  }
  
  // Bio
  if (this.bio && this.bio.length > 50) {
    score += weights.bio;
  }
  
  // Social links
  const linksCount = Object.values(this.socialLinks || {}).filter(link => link).length;
  if (linksCount >= 2) {
    score += weights.socialLinks;
  }
  
  this.completionPercentage = score;
  return score;
};

// Pre-save hook to calculate completion
studentProfileSchema.pre('save', function(next) {
  this.calculateCompletion();
  next();
});

// Virtual for full name
studentProfileSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Indexes for search
studentProfileSchema.index({ 'skills.name': 'text', firstName: 'text', lastName: 'text', bio: 'text' });
studentProfileSchema.index({ 'education.major': 1 });
studentProfileSchema.index({ 'skills.category': 1 });
studentProfileSchema.index({ createdAt: -1 });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
