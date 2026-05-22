const CompanyProfile = require('../models/CompanyProfile.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

exports.getCompanies = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
  const skip = (page - 1) * limit;
  const query = {};

  if (req.query.industry) query.industry = new RegExp(req.query.industry, 'i');
  if (req.query.search) {
    query.$or = [
      { companyName: new RegExp(req.query.search, 'i') },
      { description: new RegExp(req.query.search, 'i') },
      { industry: new RegExp(req.query.search, 'i') },
    ];
  }

  const total = await CompanyProfile.countDocuments(query);
  const data = await CompanyProfile.find(query)
    .select('companyName logo description industry size website email address benefits culture isVerified stats')
    .sort({ isVerified: -1, 'stats.activeJobs': -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json({
    success: true,
    count: data.length,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
    data,
  });
});

exports.getMyCompany = asyncHandler(async (req, res, next) => {
  const profile = await CompanyProfile.findOne({ user: req.user.id });
  if (!profile) {
    return next(new ErrorResponse('Company profile not found', 404));
  }
  res.status(200).json({ success: true, data: profile });
});

exports.updateMyCompany = asyncHandler(async (req, res, next) => {
  let profile = await CompanyProfile.findOne({ user: req.user.id });
  if (!profile) {
    return next(new ErrorResponse('Company profile not found', 404));
  }

  const allowed = [
    'companyName',
    'logo',
    'coverImage',
    'description',
    'industry',
    'size',
    'founded',
    'website',
    'email',
    'phone',
    'address',
    'socialLinks',
    'benefits',
    'culture',
  ];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) {
      profile[key] = req.body[key];
    }
  });

  await profile.save();
  res.status(200).json({ success: true, data: profile });
});
