const Application = require('../models/Application.model');
const StudentProfile = require('../models/StudentProfile.model');
const Job = require('../models/Job.model');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

exports.getMyApplications = asyncHandler(async (req, res, next) => {
  const student = await StudentProfile.findOne({ user: req.user.id });
  if (!student) {
    return next(new ErrorResponse('Student profile not found', 404));
  }

  const data = await Application.find({ student: student._id })
    .populate({
      path: 'job',
      select: 'title type category location salary status company',
      populate: { path: 'company', select: 'companyName logo' },
    })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({ success: true, count: data.length, data });
});
