const bcrypt = require('bcryptjs');
const db = require('../db/userQueries');
const { getAnswers } = require('../db/answerQueries');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const {
  validateUser,
  validateUpdateProfile,
} = require('../utils/validateUser');
const { reduceErrors } = require('../utils/reduceErrors');
const { validateChangePassword } = require('../utils/validateChangePassword');
const { sendCodeEmail, sendPasswordEmail } = require('../config/mailer');
const { generateRandomCode } = require('../utils/generateRandomCode');
const { generateRandomString } = require('../utils/generateRandomString');

const verificationCodes = new Map();

const login = [
  [
    body('account')
      .trim()
      .notEmpty()
      .withMessage('Vui lòng điền tên người dùng hoặc email'),
    body('password').trim().notEmpty().withMessage('Vui lòng điền mật khẩu'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        statusCode: 422,
        message: 'Xác thực thông tin người dùng thất bại',
        errors: reduceErrors(errors.errors),
      });
    }

    try {
      const { account, password } = req.body;

      const user = await db.find(account);

      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Tài khoản không tồn tại',
          data: null,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Mật khẩu vừa nhập không chính xác',
          data: null,
        });
      }

      const access_token = jwt.sign(
        { username: user.username, id: user.id, permission: user.permission },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );

      const refresh_token = jwt.sign(
        { username: user.username, id: user.id, permission: user.permission },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      res.cookie('accessToken', access_token, {
        httpOnly: true,
        secure: true,
      });

      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      });

      user.access_token = access_token;
      user.refresh_token = refresh_token;

      delete user.password;
      delete user.account_id;

      return res.status(200).json({
        statusCode: 200,
        message: 'Đăng nhập thành công',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
        data: null,
      });
    }
  },
];

const logout = (req, res, next) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      data: null,
    });
  }

  res.clearCookie('accessToken', { httpOnly: true, secure: true });
  res.clearCookie('refreshToken', { httpOnly: true, secure: true });

  return res.status(200).json({
    statusCode: 200,
    message: 'Đăng xuất thành công',
    data: null,
  });
};

const me = async (req, res, next) => {
  const user = await db.find(req?.user?.username);

  user.access_token = req?.user?.access_token;
  user.refresh_token = req?.user?.refresh_token;

  delete user.password;
  delete user.account_id;

  return res.status(200).json({
    statusCode: 200,
    message: 'Xác thực thành công',
    data: user,
  });
};

const register = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        statusCode: 422,
        message: 'Xác thực thông tin người dùng thất bại',
        errors: reduceErrors(errors.errors),
      });
    }

    try {
      const { first_name, last_name, email, username, password, permission } =
        req.body;

      // Check username exists or does not
      const isUsernameExists = await db.findByUsername(username);
      if (isUsernameExists) {
        return res.status(409).json({
          statusCode: 409,
          message: 'Tên đăng nhập đã tồn tại',
          data: null,
        });
      }

      // Check email exists or does not
      const isEmailExists = await db.findByEmail(email);
      if (isEmailExists) {
        return res.status(409).json({
          statusCode: 409,
          message: 'Email đã tồn tại',
          data: null,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: hashedPassword,
        permission: permission,
      });

      return res.status(200).json({
        statusCode: 200,
        message: 'Đăng ký tài khoản thành công',
        data: {
          username: username,
          permission: permission,
          first_name: first_name,
          last_name: last_name,
          email: email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
        data: null,
      });
    }
  },
];

const updateProfile = [
  validateUpdateProfile,
  async (req, res, next) => {
    const errors = validationResult(req);

    const file = req?.file;

    // Validate
    if (
      !errors.isEmpty() ||
      (file &&
        !['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype))
    ) {
      const errorMessages = reduceErrors(errors?.errors) || [];

      if (
        file &&
        !['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype)
      ) {
        errorMessages.push({
          field: 'image',
          message: 'Vui lòng chọn các định dạng ảnh như jpeg, png, gif',
        });
      }

      return res.status(422).json({
        statusCode: 422,
        message: 'Xác thực thông tin người dùng thất bại',
        errors: errorMessages,
      });
    }

    try {
      const avatar = file?.originalname;
      const { id, first_name, last_name, email } = req.body;

      // Check if email has used by another users
      const emailHasUsed = await db.findByEmailExceptMyself(email, id);
      console.log(emailHasUsed);
      if (emailHasUsed) {
        return res.status(409).json({
          statusCode: 409,
          message: 'Email đã được sử dụng, vui lòng sử dụng email khác',
          data: null,
        });
      }

      const user = await db.updateUser(req?.user.username, {
        firstName: first_name,
        lastName: last_name,
        email,
        avatar,
      });

      if (user) {
        user.access_token = req?.user?.access_token;
        user.refresh_token = req?.user?.refresh_token;
      }

      delete user.password;
      delete user.account_id;

      return res.status(200).json({
        statusCode: 200,
        message: 'Cập nhật thành công',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
        data: null,
      });
    }
  },
];

const changePassword = [
  validateChangePassword,
  async (req, res, next) => {
    const errors = validationResult(req);

    // Validate
    if (!errors.isEmpty()) {
      return res.status(422).json({
        statusCode: 422,
        message: 'Xác thực thông tin thất bại',
        errors: reduceErrors(errors.errors),
      });
    }

    try {
      const { old_password, new_password } = req?.body;

      const user = await db.find(req?.user?.username);

      const isPasswordValid = await bcrypt.compare(
        old_password,
        user?.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Mật khẩu vừa nhập không chính xác',
          data: null,
        });
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      await db.changePassword(user?.username, hashedPassword);

      user.access_token = req?.user?.access_token;
      user.refresh_token = req?.user?.refresh_token;

      delete user.password;
      delete user.account_id;

      return res.status(200).json({
        statusCode: 200,
        message: 'Đổi mật khẩu thành công',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
        data: null,
      });
    }
  },
];

const saveExam = async (req, res, next) => {
  try {
    const { questions, exam_id, license_id } = req?.body;

    const answerIds = questions
      ?.map((q) => q.idSelectedAnswer)
      ?.filter((id) => id !== undefined);

    const user_id = req?.user?.id;

    const examHistory = await db.getExamHistory({
      user_id: Number(user_id),
      exam_id: Number(exam_id),
      license_id: Number(license_id),
    });

    await db.deleteAnswerHistory({ exam_history_id: examHistory?.id });
    await db.deleteExamHistory({
      user_id: Number(user_id),
      exam_id: Number(exam_id),
      license_id: Number(license_id),
    });

    const exam_history_id = await db.saveExamHistory({
      user_id: Number(user_id),
      exam_id: Number(exam_id),
      license_id: Number(license_id),
    });

    for (const answer_id of answerIds) {
      await db.saveAnswerHistory({
        answer_id: Number(answer_id),
        exam_history_id: exam_history_id,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Lưu bài thi thành công',
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
};

const getExams = async (req, res, next) => {
  const { licenseId } = req.params;
  const user_id = req?.user?.id;
  try {
    const exams = await db.getExamHistories({ license_id: licenseId, user_id });

    return res.status(200).json({
      statusCode: 200,
      message: 'Lấy lịch sử bài thi thành công',
      data: exams,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
};

const getQuestions = async (req, res, next) => {
  const { examId } = req.params;
  const user_id = req?.user?.id;
  try {
    const questions = await db.getQuestions({
      exam_history_id: Number(examId),
      user_id: user_id,
    });
    const userAnswers = await db.getAnswerIds({
      exam_history_id: Number(examId),
    });

    // GET ANSWER FOR EACH QUESTION
    for (const q of questions) {
      const answers = await getAnswers(q.id);
      const u = userAnswers?.find((u) => u.question_id === q.id);
      if (u) {
        q.idSelectedAnswer = u.answer_id;
      }
      q.answers = answers;
    }

    const exam = await db.getDetailsExamHistory({
      exam_history_id: examId,
      user_id: user_id,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Lấy chi tiết lịch sử bài thi thành công',
      data: {
        exam,
        questions,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
};

const getWrongAnswer = async (req, res, next) => {
  const { licenseId } = req.params;
  const user_id = req?.user?.id;
  try {
    const questions = await db.getWrongAnswer({
      license_id: licenseId,
      user_id,
    });

    // GET ANSWER FOR EACH QUESTION
    for (const q of questions) {
      const answers = await getAnswers(q.id);
      q.answers = answers;
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Lấy câu hỏi sai thành công',
      data: questions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
};

const sendCode = [
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Vui lòng điền email')
      .isEmail()
      .withMessage('Vui lòng điền đúng định dạng email'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    // Validate
    if (!errors.isEmpty()) {
      return res.status(422).json({
        statusCode: 422,
        message: 'Xác thực thông tin thất bại',
        errors: reduceErrors(errors.errors),
      });
    }

    try {
      const { email } = req.body;

      // Check email exists or does not
      const isEmailExists = await db.findByEmail(email);
      if (!isEmailExists) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Email không tồn tại',
          data: null,
        });
      }

      const code = generateRandomCode();
      const expirationTime = Date.now() + 15 * 60 * 1000; // 15m
      verificationCodes.set(email, {
        code: code,
        expirationTime: expirationTime,
      });

      await sendCodeEmail(email, code);

      return res.status(200).json({
        statusCode: 200,
        message: 'Đã gửi mã xác nhận vui lòng kiểm tra email',
        data: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
        data: null,
      });
    }
  },
];

const verifyCode = [
  [
    body('code')
      .trim()
      .notEmpty()
      .withMessage('Vui lòng điền mã xác nhận')
      .isLength({
        min: 6,
        max: 6,
      })
      .withMessage('Mã xác nhận bao gồm 6 chữ số'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    // Validate
    if (!errors.isEmpty()) {
      return res.status(422).json({
        statusCode: 422,
        message: 'Xác thực thông tin thất bại',
        errors: reduceErrors(errors.errors),
      });
    }

    try {
      const { email, code } = req.body;

      const storedCode = verificationCodes.get(email);

      if (Date.now() > storedCode.expirationTime) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Mã xác nhận đã hết hạn',
          data: null,
        });
      }

      if (Number(code) !== Number(storedCode.code)) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Mã xác nhận không hợp lệ',
          data: null,
        });
      }

      const newPassword = generateRandomString();
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db.updatePassword({ new_password: hashedPassword, email: email });

      await sendPasswordEmail(
        email,
        newPassword,
        `${process.env.ORIGIN_URL}/login`
      );

      return res.status(200).json({
        statusCode: 200,
        message: 'Đã gửi mật khẩu mới vui lòng kiểm tra email',
        data: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
        data: null,
      });
    }
  },
];

module.exports = {
  login,
  me,
  logout,
  register,
  updateProfile,
  changePassword,
  saveExam,
  getExams,
  getQuestions,
  getWrongAnswer,
  sendCode,
  verifyCode,
};
