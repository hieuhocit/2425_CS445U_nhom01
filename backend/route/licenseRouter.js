const { Router } = require('express');

const licenseController = require('../controller/licenseController');

const router = Router();

// TOPICS
router.get('/', licenseController.getLicenses);
router.get('/:licenseId', licenseController.getLicense);

module.exports = router;
