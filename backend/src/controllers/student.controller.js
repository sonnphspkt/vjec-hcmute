const StudentProfile = require('../models/StudentProfile.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

exports.getStudents = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const query = { isPublic: true };

  if (req.query.major) {
    query['education.major'] = new RegExp(req.query.major, 'i');
  }
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }
  if (req.query.skills) {
    const names = req.query.skills.split(',').map((s) => s.trim()).filter(Boolean);
    if (names.length) {
      query['skills.name'] = { $in: names.map((n) => new RegExp(n, 'i')) };
    }
  }

  const total = await StudentProfile.countDocuments(query);
  const raw = await StudentProfile.find(query)
    .select(
      'firstName lastName avatar bio skills education completionPercentage stats location createdAt careerDNA isDemoProfile'
    )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const data = raw.map((p) => {
    const out = { ...p };
    if (out.careerDNA) {
      out.careerDNA = {
        marketValue: out.careerDNA.marketValue,
        strengths: (out.careerDNA.strengths || []).slice(0, 3),
        careerPath: out.careerDNA.careerPath,
      };
    }
    return out;
  });

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

exports.getStudent = asyncHandler(async (req, res, next) => {
  const profile = await StudentProfile.findById(req.params.id)
    .populate('user', 'email role')
    .lean();

  if (!profile) {
    return next(new ErrorResponse('Student not found', 404));
  }

  res.status(200).json({ success: true, data: profile });
});

exports.updateStudent = asyncHandler(async (req, res, next) => {
  let profile = await StudentProfile.findById(req.params.id);
  if (!profile) {
    return next(new ErrorResponse('Student not found', 404));
  }
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this profile', 403));
  }

  const allowed = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'phone',
    'bio',
    'location',
    'education',
    'skills',
    'experience',
    'certifications',
    'socialLinks',
    'preferences',
    'isPublic',
  ];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) {
      profile[key] = req.body[key];
    }
  });

  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

exports.addSkills = asyncHandler(async (req, res, next) => {
  const profile = await StudentProfile.findById(req.params.id);
  if (!profile) {
    return next(new ErrorResponse('Student not found', 404));
  }
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized', 403));
  }

  const { skills } = req.body;
  if (!Array.isArray(skills) || skills.length === 0) {
    return next(new ErrorResponse('Please provide skills array', 400));
  }

  profile.skills = [...(profile.skills || []), ...skills];
  await profile.save();

  res.status(200).json({ success: true, data: profile });
});

exports.getCareerDNA = asyncHandler(async (req, res, next) => {
  const profile = await StudentProfile.findById(req.params.id).select('careerDNA user');
  if (!profile) {
    return next(new ErrorResponse('Student not found', 404));
  }
  if (profile.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized', 403));
  }

  res.status(200).json({
    success: true,
    data: profile.careerDNA || {},
  });
});
