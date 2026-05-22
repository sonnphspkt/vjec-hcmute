const express = require('express');
const router = express.Router();
const { matchJobs, analyzeSkills } = require('../controllers/ai.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post('/match-jobs', protect, authorize('student'), matchJobs);
router.post('/analyze-skills', protect, analyzeSkills);

module.exports = router;
