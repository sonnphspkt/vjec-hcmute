const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    logo: { type: String, default: 'default-company.png' },
    coverImage: String,
    description: String,
    industry: String,
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
    },
    founded: Number,
    website: String,
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      country: { type: String, default: 'Vietnam' },
      zipCode: String,
    },
    socialLinks: {
      linkedin: String,
      facebook: String,
      twitter: String,
    },
    benefits: [String],
    culture: String,
    isVerified: { type: Boolean, default: false },
    stats: {
      totalJobs: { type: Number, default: 0 },
      activeJobs: { type: Number, default: 0 },
      totalHires: { type: Number, default: 0 },
      profileViews: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

companyProfileSchema.index({ companyName: 'text', industry: 'text' });

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);
