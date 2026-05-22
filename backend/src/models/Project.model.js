const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: 2000
  },
  
  // Project Details
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'ai-ml', 'iot', 'embedded', 'game', 'data-science', 'blockchain', 'other'],
    required: true
  },
  type: {
    type: String,
    enum: ['personal', 'academic', 'hackathon', 'freelance', 'company', 'research'],
    default: 'personal'
  },
  
  // Media
  thumbnail: {
    type: String,
    default: 'default-project.png'
  },
  images: [{
    url: String,
    caption: String
  }],
  videos: [{
    url: String,
    type: {
      type: String,
      enum: ['youtube', 'vimeo', 'direct']
    },
    thumbnail: String
  }],
  
  // Links
  demoUrl: String,
  sourceCodeUrl: String,
  documentUrl: String,
  
  // Technologies
  technologies: [{
    name: String,
    category: {
      type: String,
      enum: ['language', 'framework', 'library', 'database', 'tool', 'platform']
    }
  }],
  
  // Team (if collaborative)
  team: [{
    name: String,
    role: String,
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile'
    }
  }],
  
  // Timeline
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold', 'abandoned'],
    default: 'completed'
  },
  
  // Academic Info (if applicable)
  isAcademic: {
    type: Boolean,
    default: false
  },
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  saves: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Stats
  views: {
    type: Number,
    default: 0
  },
  
  // Visibility
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // SEO
  tags: [String],
  
  // Company Interest
  companyInterests: [{
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyProfile'
    },
    message: String,
    status: {
      type: String,
      enum: ['pending', 'contacted', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Virtual for like count
projectSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for comment count
projectSchema.virtual('commentCount').get(function() {
  return this.comments ? this.comments.length : 0;
});

// Create slug from title
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '-' + Date.now();
  }
  next();
});

// Indexes
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });
projectSchema.index({ student: 1 });
projectSchema.index({ category: 1, type: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ 'technologies.name': 1 });
projectSchema.index({ isFeatured: 1 });

// Configure virtuals
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
