const { body } = require('express-validator');

const validateAddNewExam = [
  body('title').trim().notEmpty().withMessage('Vui lòng điền tên'),
  body('licenses')
    .isArray({
      min: 1,
    })
    .withMessage('Vui lòng chọn ít nhất một giấy phép'),
];

module.exports = {
  validateAddNewExam,
};
