const Job = require('../models/Job.model');
const StudentProfile = require('../models/StudentProfile.model');
const asyncHandler = require('../middleware/async.middleware');

exports.matchJobs = asyncHandler(async (req, res) => {
  const student = await StudentProfile.findOne({ user: req.user.id });
  const skillNames = (student?.skills || []).map((s) => s.name).filter(Boolean);

  const jobs = await Job.find({ status: 'published' })
    .populate('company', 'companyName logo')
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(20)
    .lean();

  const scored = jobs.map((job) => {
    const reqSkills = (job.requiredSkills || []).map((s) => s.name.toLowerCase());
    const matched = skillNames.filter((n) =>
      reqSkills.some((r) => r.includes(n.toLowerCase()) || n.toLowerCase().includes(r))
    );
    const score = reqSkills.length ? Math.round((matched.length / reqSkills.length) * 100) : 50;
    return { job, matchScore: score, matchedSkills: matched };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);

  res.status(200).json({
    success: true,
    data: scored.slice(0, 10),
  });
});

exports.analyzeSkills = asyncHandler(async (req, res) => {
  const student = await StudentProfile.findOne({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: {
      currentSkills: student?.skills || [],
      suggestedSkills: ['TypeScript', 'Docker', 'AWS'],
      gaps: student?.careerDNA?.skillGaps || [],
      message: 'Phân tích kỹ năng (stub) — kết nối AI service sau.',
    },
  });
});
