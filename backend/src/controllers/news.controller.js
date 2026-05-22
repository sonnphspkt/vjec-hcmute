const NewsArticle = require('../models/NewsArticle.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

exports.getArticles = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(30, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const query = { isPublished: true };
  if (req.query.category) {
    query.category = req.query.category;
  }

  const total = await NewsArticle.countDocuments(query);
  const data = await NewsArticle.find(query)
    .select('-content')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    count: data.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1,
    },
    data,
  });
});

exports.getArticleBySlug = asyncHandler(async (req, res, next) => {
  const article = await NewsArticle.findOne({
    slug: req.params.slug,
    isPublished: true,
  }).lean();

  if (!article) {
    return next(new ErrorResponse('Article not found', 404));
  }

  res.status(200).json({ success: true, data: article });
});
