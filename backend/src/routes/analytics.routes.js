const express = require('express');
const router = express.Router();
const {
  studentAnalytics,
  companyAnalytics,
  marketTrends,
} = require('../controllers/analytics.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/students', protect, authorize('university_admin', 'super_admin'), studentAnalytics);
router.get('/companies', protect, authorize('company', 'super_admin'), companyAnalytics);
router.get('/market-trends', protect, marketTrends);

module.exports = router;
