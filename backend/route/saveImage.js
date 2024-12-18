const { Router } = require('express');

const { uploadImage } = require('../config/multer');

const router = Router();

// SAVE IMAGES
router.post('/', uploadImage);

module.exports = router;
