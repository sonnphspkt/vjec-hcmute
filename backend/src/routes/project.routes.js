const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  likeProject,
  commentProject,
} = require('../controllers/project.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, authorize('student'), createProject);
router.post('/:id/like', protect, likeProject);
router.post('/:id/comment', protect, commentProject);

module.exports = router;
