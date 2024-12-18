const { Router } = require('express');

const examController = require('../controller/examController');

const router = Router();

// EXAMS
router.get('/', examController.getExams);
router.get('/:examId', examController.getExam);

module.exports = router;
