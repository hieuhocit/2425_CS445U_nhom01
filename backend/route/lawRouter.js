const { Router } = require('express');

const lawController = require('../controller/lawController');

const router = Router();

// TOPICS
router.get('/topics', lawController.getLawTopics);
router.get('/topics/:topicId', lawController.getLawTopic);

// VIOLATIONS
router.get('/violations', lawController.getViolations);
router.get('/violations/:violationId', lawController.getViolation);

module.exports = router;
