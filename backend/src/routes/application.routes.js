const express = require('express');
const router = express.Router();
const { getMyApplications } = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/me', protect, authorize('student'), getMyApplications);

module.exports = router;
