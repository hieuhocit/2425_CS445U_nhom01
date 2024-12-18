const { body } = require('express-validator');

const validateChangePassword = [
  body('old_password').trim().notEmpty().withMessage('Vui lòng điền mật khẩu'),
  body('new_password')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền mật khẩu mới')
    .isLength({
      min: 6,
      max: 24,
    })
    .withMessage('Mật khẩu phải có từ 6 đến 24 kí tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .withMessage(
      'Mật khẩu phải bao gồm ít nhất 1 kí tự thường, 1 kí tự hoa, 1 chữ số và 1 kí tự đặc biệt'
    ),
  body('confirm_new_password')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền xác nhận mật khẩu'),
  body('confirm_new_password').custom((value, { req }) => {
    if (value !== req.body.new_password) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }
    return true;
  }),
];

module.exports = {
  validateChangePassword,
};
