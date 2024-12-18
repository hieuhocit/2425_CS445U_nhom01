const { Router } = require('express');

const questionController = require('../controller/questionController');

const router = Router();

// QUESTIONS
router.get('/', questionController.getQuestions);
router.get('/:questionId', questionController.getQuestion);

module.exports = router;
