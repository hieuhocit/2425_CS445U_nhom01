const { body } = require('express-validator');

const validateAddNewQuestion = [
  body('text').trim().notEmpty().withMessage('Vui lòng điền tiêu đề'),
  body('topic_id').isInt().withMessage('Vui lòng chọn chủ đề'),
  body('license_ids').custom((value) => {
    const arr = JSON.parse(value);
    if (arr.length < 1) {
      throw new Error('Vui lòng chọn ít nhất một giấy phép');
    }
    return true;
  }),
  body('exam_ids').custom((value) => {
    const arr = JSON.parse(value);
    if (arr.length < 1) {
      throw new Error('Vui lòng chọn ít nhất một đề thi');
    }
    return true;
  }),
  body('answers').custom((value) => {
    const answers = JSON.parse(value);
    let hasChosenCorrectAnswer = false;
    answers.forEach((a) => {
      if (a.text.trim() === '') {
        throw new Error('Vui điền đầy đủ thông tin câu trả lời');
      }
      if (a.correct) {
        hasChosenCorrectAnswer = true;
      }
    });
    if (!hasChosenCorrectAnswer) {
      throw new Error('Vui lòng đánh dấu câu trả lời đúng');
    }
    return true;
  }),
];

module.exports = {
  validateAddNewQuestion,
};
