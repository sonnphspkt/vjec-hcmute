const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  updateStudent,
  addSkills,
  getCareerDNA,
} = require('../controllers/student.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', getStudents);
router.get('/:id/career-dna', protect, getCareerDNA);
router.get('/:id', getStudent);
router.put('/:id', protect, authorize('student'), updateStudent);
router.post('/:id/skills', protect, authorize('student'), addSkills);

module.exports = router;
