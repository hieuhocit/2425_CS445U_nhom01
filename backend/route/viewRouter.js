const { Router } = require('express');

const viewController = require('../controller/viewController');

const router = Router();

router.post('/', viewController.increaseView);

module.exports = router;
