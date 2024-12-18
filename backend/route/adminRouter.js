const { Router } = require('express');

const adminController = require('../controller/adminController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { upload } = require('../config/multer');
const {
  validateAddNewUser,
  validateUpdateUser,
} = require('../utils/validateUser');

const { validateAddNewExam } = require('../utils/validateExam');
const { validateAddNewQuestion } = require('../utils/validateQuestion');

const router = Router();

router.get('/statistics', authMiddleware, adminController.statistics);

// USERS
router.get('/users', authMiddleware, adminController.getUsers);
router.delete('/users/:userId', authMiddleware, adminController.deleteUser);
router.post(
  '/users',
  authMiddleware,
  upload.single('image'),
  validateAddNewUser,
  adminController.addNewUser
);
router.put(
  '/users/:userId',
  authMiddleware,
  upload.single('image'),
  validateUpdateUser,
  adminController.updateUser
);

// EXAMS
router.get('/exams', authMiddleware, adminController.getExams);
router.delete('/exams/:examId', authMiddleware, adminController.deleteExam);
router.post(
  '/exams',
  authMiddleware,
  validateAddNewExam,
  adminController.addNewExam
);
router.put(
  '/exams/:examId',
  authMiddleware,
  validateAddNewExam,
  adminController.updateExam
);

// QUESTIONS
router.get('/questions', authMiddleware, adminController.getQuestions);
router.delete(
  '/questions/:questionId',
  authMiddleware,
  adminController.deleteQuestion
);
router.post(
  '/questions',
  authMiddleware,
  upload.single('image'),
  validateAddNewQuestion,
  adminController.addNewQuestion
);
router.put(
  '/questions/:questionId',
  authMiddleware,
  upload.single('image'),
  validateAddNewQuestion,
  adminController.updateQuestion
);

module.exports = router;
