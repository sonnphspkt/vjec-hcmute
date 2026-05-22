const asyncHandler = require('../middleware/async.middleware');

exports.studentAnalytics = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      activeStudents: 120,
      avgProfileCompletion: 62,
      topSkills: ['JavaScript', 'Python', 'React'],
      note: 'Stub analytics — thay bằng aggregation thật khi cần.',
    },
  });
});

exports.companyAnalytics = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalPostings: 45,
      applicationsThisMonth: 320,
      note: 'Stub analytics.',
    },
  });
});

exports.marketTrends = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      trendingRoles: ['Full-stack', 'Embedded', 'Data Engineer'],
      note: 'Stub market trends.',
    },
  });
});
