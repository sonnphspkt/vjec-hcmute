const express = require('express');
const router = express.Router();
const { getJobs, getJob, createJob, applyJob } = require('../controllers/job.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('company'), createJob);
router.post('/:id/apply', protect, authorize('student'), applyJob);

module.exports = router;
