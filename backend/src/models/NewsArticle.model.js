const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['recruitment', 'market', 'campus', 'tips', 'policy'],
      default: 'recruitment',
    },
    tags: [String],
    coverImage: String,
    readTimeMinutes: {
      type: Number,
      min: 1,
      default: 3,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

newsArticleSchema.index({ publishedAt: -1 });
newsArticleSchema.index({ category: 1, publishedAt: -1 });

module.exports = mongoose.model('NewsArticle', newsArticleSchema);
