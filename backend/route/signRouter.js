const { Router } = require('express');

const signController = require('../controller/signController');

const router = Router();

// TOPICS
router.get('/topics', signController.getSignTopics);
router.get('/topics/:topicId', signController.getSignTopic);

// SIGNS
router.get('/signs', signController.getSigns);
router.get('/signs/:signId', signController.getSign);

module.exports = router;
