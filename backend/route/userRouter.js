const { Router } = require('express');
const { upload } = require('../config/multer');
const userController = require('../controller/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post('/register', userController.register); // OK
router.post('/login', userController.login); // OK
router.post('/logout', userController.logout); // OK
router.get('/me', authMiddleware, userController.me); // OK

router.put(
  '/profile',
  upload.single('image'),
  authMiddleware,
  userController.updateProfile
); // OK

router.post('/password', authMiddleware, userController.changePassword); // OK

router.post('/exam', authMiddleware, userController.saveExam); // OK
router.get('/exam/:licenseId', authMiddleware, userController.getExams); // OK
router.get('/question/:examId', authMiddleware, userController.getQuestions); // OK
router.get('/answer/:licenseId', authMiddleware, userController.getWrongAnswer); // OK

router.post('/send-code', userController.sendCode); // OK
router.post('/verify-code', userController.verifyCode); // OK

module.exports = router;
