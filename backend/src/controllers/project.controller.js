const Project = require('../models/Project.model');
const StudentProfile = require('../models/StudentProfile.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

exports.getProjects = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
  const skip = (page - 1) * limit;

  const query = { isPublic: true };
  if (req.query.category) query.category = req.query.category;
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  const total = await Project.countDocuments(query);
  const data = await Project.find(query)
    .populate('student', 'firstName lastName avatar')
    .sort({ createdAt: -1 })
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

exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id)
    .populate('student', 'firstName lastName avatar bio socialLinks education')
    .populate('likes.user', 'email')
    .populate('comments.user', 'email');

  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  project.views = (project.views || 0) + 1;
  await project.save();

  res.status(200).json({ success: true, data: project });
});

exports.createProject = asyncHandler(async (req, res, next) => {
  const student = await StudentProfile.findOne({ user: req.user.id });
  if (!student) {
    return next(new ErrorResponse('Student profile not found', 400));
  }

  const project = await Project.create({
    student: student._id,
    ...req.body,
  });

  student.stats = student.stats || {};
  student.stats.projectsPublished = (student.stats.projectsPublished || 0) + 1;
  await student.save();

  const populated = await Project.findById(project._id).populate(
    'student',
    'firstName lastName avatar'
  );

  res.status(201).json({ success: true, data: populated });
});

exports.likeProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  const uid = req.user.id;
  const already = (project.likes || []).some((l) => l.user && l.user.toString() === uid);
  if (!already) {
    project.likes = project.likes || [];
    project.likes.push({ user: uid });
    await project.save();
  }

  res.status(200).json({ success: true, data: { likeCount: project.likes.length } });
});

exports.commentProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorResponse('Project not found', 404));
  }

  const text = (req.body.text || '').trim();
  if (!text) {
    return next(new ErrorResponse('Comment text is required', 400));
  }

  project.comments = project.comments || [];
  project.comments.push({ user: req.user.id, text });
  await project.save();

  res.status(201).json({ success: true, data: project.comments[project.comments.length - 1] });
});
