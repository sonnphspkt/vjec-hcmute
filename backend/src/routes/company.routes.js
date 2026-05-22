const express = require('express');
const router = express.Router();
const { getMyCompany, updateMyCompany } = require('../controllers/company.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/me', protect, authorize('company'), getMyCompany);
router.put('/me', protect, authorize('company'), updateMyCompany);

module.exports = router;
