const CompanyProfile = require('../models/CompanyProfile.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

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
