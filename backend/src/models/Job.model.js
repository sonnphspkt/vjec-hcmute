const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  responsibilities: [String],
  requirements: [String],
  
  // Job Details
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'freelance', 'remote', 'contract'],
    required: true
  },
  category: {
    type: String,
    enum: ['software', 'hardware', 'embedded', 'network', 'ai-ml', 'data', 'design', 'management', 'other'],
    required: true
  },
  level: {
    type: String,
    enum: ['intern', 'fresher', 'junior', 'mid-level', 'senior', 'lead', 'manager'],
    default: 'fresher'
  },
  
  // Location
  location: {
    city: String,
    country: {
      type: String,
      default: 'Vietnam'
    },
    address: String,
    isRemote: {
      type: Boolean,
      default: false
    }
  },
  
  // Salary
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'VND'
    },
    isNegotiable: {
      type: Boolean,
      default: true
    },
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  
  // Skills Required
  requiredSkills: [{
    name: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    importance: {
      type: String,
      enum: ['required', 'preferred', 'nice-to-have'],
      default: 'required'
    }
  }],
  
  // Benefits
  benefits: [String],
  
  // Application
  applicationDeadline: {
    type: Date
  },
  numberOfOpenings: {
    type: Number,
    default: 1,
    min: 1
  },
  applicationMethod: {
    type: {
      type: String,
      enum: ['platform', 'email', 'external'],
      default: 'platform'
    },
    email: String,
    externalUrl: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'filled'],
    default: 'draft'
  },
  
  // Stats
  views: {
    type: Number,
    default: 0
  },
  applications: {
    type: Number,
    default: 0
  },
  
  // Featured
  isFeatured: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  
  // SEO
  tags: [String],
  
  // Timestamps
  publishedAt: Date,
  closedAt: Date
}, {
  timestamps: true
});

// Create slug from title before save
jobSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + '-' + Date.now();
  }
  next();
});

// Indexes
jobSchema.index({ title: 'text', description: 'text', tags: 'text' });
jobSchema.index({ company: 1 });
jobSchema.index({ type: 1, category: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ 'location.city': 1 });
jobSchema.index({ 'requiredSkills.name': 1 });

module.exports = mongoose.model('Job', jobSchema);
