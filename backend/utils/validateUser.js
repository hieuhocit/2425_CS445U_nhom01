const { body } = require('express-validator');

const validateUser = [
  body('first_name').trim().notEmpty().withMessage('Vui lòng điền tên'),
  body('last_name').trim().notEmpty().withMessage('Vui lòng điền họ'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền email')
    .isEmail()
    .withMessage('Vui lòng điền đúng định dạng email'),
  body('username').trim().notEmpty().withMessage('Vui lòng điền tên đăng nhập'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền mật khẩu')
    .isLength({
      min: 6,
      max: 24,
    })
    .withMessage('Mật khẩu phải có từ 6 đến 24 kí tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .withMessage(
      'Mật khẩu phải bao gồm ít nhất 1 kí tự thường, 1 kí tự hoa, 1 chữ số và 1 kí tự đặc biệt'
    ),
];

const validateUpdateProfile = [
  body('first_name').trim().notEmpty().withMessage('Vui lòng điền tên'),
  body('last_name').trim().notEmpty().withMessage('Vui lòng điền họ'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền email')
    .isEmail()
    .withMessage('Vui lòng điền đúng định dạng email'),
];

const validateAddNewUser = [
  body('first_name').trim().notEmpty().withMessage('Vui lòng điền tên'),
  body('last_name').trim().notEmpty().withMessage('Vui lòng điền họ'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền email')
    .isEmail()
    .withMessage('Vui lòng điền đúng định dạng email'),
  body('username').trim().notEmpty().withMessage('Vui lòng điền tên đăng nhập'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền mật khẩu')
    .isLength({
      min: 6,
      max: 24,
    })
    .withMessage('Mật khẩu phải có từ 6 đến 24 kí tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .withMessage(
      'Mật khẩu phải bao gồm ít nhất 1 kí tự thường, 1 kí tự hoa, 1 chữ số và 1 kí tự đặc biệt'
    ),
  body('permission')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng chọn vai trò')
    .custom((value) => {
      if (value !== 'ADMIN' && value !== 'MEMBER') {
        throw new Error('Vui lòng chọn đúng vai trò');
      }
      return true;
    }),
];

const validateUpdateUser = [
  body('first_name').trim().notEmpty().withMessage('Vui lòng điền tên'),
  body('last_name').trim().notEmpty().withMessage('Vui lòng điền họ'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng điền email')
    .isEmail()
    .withMessage('Vui lòng điền đúng định dạng email'),
  body('permission')
    .trim()
    .notEmpty()
    .withMessage('Vui lòng chọn vai trò')
    .custom((value) => {
      if (value !== 'ADMIN' && value !== 'MEMBER') {
        throw new Error('Vui lòng chọn đúng vai trò');
      }
      return true;
    }),
];

module.exports = {
  validateUser,
  validateUpdateProfile,
  validateAddNewUser,
  validateUpdateUser,
};
