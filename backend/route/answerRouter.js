const { Router } = require('express');

const answerController = require('../controller/answerController');

const router = Router();

// ANSWERS
router.get('/', answerController.getAnswers);
router.get('/:answerId', answerController.getAnswer);

module.exports = router;
