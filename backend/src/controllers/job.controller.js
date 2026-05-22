const Job = require('../models/Job.model');
const CompanyProfile = require('../models/CompanyProfile.model');
const StudentProfile = require('../models/StudentProfile.model');
const Application = require('../models/Application.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

exports.getJobs = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
  const skip = (page - 1) * limit;

  const query = { status: req.query.status || 'published' };

  if (req.query.type) query.type = req.query.type;
  if (req.query.remote === '1' || req.query.remote === 'true') {
    query['location.isRemote'] = true;
  }
  if (req.query.category) query.category = req.query.category;
  if (req.query.level) query.level = req.query.level;
  if (req.query.city) {
    query['location.city'] = new RegExp(req.query.city, 'i');
  }
  if (req.query.skills) {
    const names = req.query.skills.split(',').map((s) => s.trim()).filter(Boolean);
    if (names.length) {
      query['requiredSkills.name'] = { $in: names.map((n) => new RegExp(n, 'i')) };
    }
  }
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  const total = await Job.countDocuments(query);
  const data = await Job.find(query)
    .populate('company', 'companyName logo description website industry size')
    .sort({ publishedAt: -1, createdAt: -1 })
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

exports.getJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate(
    'company',
    'companyName logo description website industry size address'
  );

  if (!job) {
    return next(new ErrorResponse('Job not found', 404));
  }

  if (job.status === 'published') {
    job.views = (job.views || 0) + 1;
    await job.save();
  }

  res.status(200).json({ success: true, data: job });
});

exports.createJob = asyncHandler(async (req, res, next) => {
  const company = await CompanyProfile.findOne({ user: req.user.id });
  if (!company) {
    return next(new ErrorResponse('Company profile not found', 400));
  }

  const job = await Job.create({
    company: company._id,
    ...req.body,
    status: req.body.status || 'published',
    publishedAt: req.body.status !== 'draft' ? new Date() : undefined,
  });

  company.stats = company.stats || {};
  company.stats.totalJobs = (company.stats.totalJobs || 0) + 1;
  company.stats.activeJobs = (company.stats.activeJobs || 0) + 1;
  await company.save();

  const populated = await Job.findById(job._id).populate('company', 'companyName logo');

  res.status(201).json({ success: true, data: populated });
});

exports.applyJob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorResponse('Job not found', 404));
  }
  if (job.status !== 'published') {
    return next(new ErrorResponse('Job is not accepting applications', 400));
  }

  const student = await StudentProfile.findOne({ user: req.user.id });
  if (!student) {
    return next(new ErrorResponse('Student profile not found', 400));
  }

  let application;
  try {
    application = await Application.create({
      job: job._id,
      student: student._id,
      coverLetter: req.body.coverLetter,
      resumeUrl: req.body.resumeUrl,
    });
  } catch (e) {
    if (e.code === 11000) {
      return next(new ErrorResponse('You have already applied for this job', 400));
    }
    throw e;
  }

  job.applications = (job.applications || 0) + 1;
  await job.save();

  student.stats = student.stats || {};
  student.stats.applicationsSubmitted = (student.stats.applicationsSubmitted || 0) + 1;
  await student.save();

  res.status(201).json({ success: true, data: application });
});
