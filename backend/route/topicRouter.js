const { Router } = require('express');

const topicController = require('../controller/topicController');

const router = Router();

// ANSWERS
router.get('/', topicController.getTopics);
router.get('/:topicId', topicController.getTopic);

module.exports = router;
