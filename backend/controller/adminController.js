const db = require('../db/adminQueries');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { reduceErrors } = require('../utils/reduceErrors');

async function statistics(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  try {
    const [totalUser, totalExams, totalQuestions, totalVisitors] =
      await Promise.all([
        db.totalUsers(),
        db.totalExams(),
        db.totalQuestions(),
        db.totalVisitors(),
      ]);

    const [
      userPercentChange,
      examsPercentChange,
      questionsPercentChange,
      visitorsPercentChange,
    ] = await Promise.all([
      db.getUserPercentChange(),
      db.getExamsPercentChange(),
      db.getQuestionsPercentChange(),
      db.getVisitorsPercentChange(),
    ]);

    const userRegisters = await db.getUsersRegisterByMonth();

    return res.status(200).json({
      statusCode: 200,
      message: 'Get statistics successfully.',
      data: {
        user: {
          total: totalUser.count,
          percent: userPercentChange.percent,
        },
        exam: {
          total: totalExams.count,
          percent: examsPercentChange.percent,
        },
        question: {
          total: totalQuestions.count,
          percent: questionsPercentChange.percent,
        },
        visitor: {
          total: totalVisitors.count,
          percent: visitorsPercentChange.percent,
        },
        userRegisters: userRegisters,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

// USERS
async function getUsers(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const { page, limit } = req.query;

  try {
    const users = await db.getUsers({
      page: Number(page),
      limit: Number(limit),
    });
    const totalUsers = (await db.totalUsers())?.count;
    const totalPages = Math.ceil(totalUsers / limit) || 0;

    return res.status(200).json({
      statusCode: 200,
      message: 'Get users successfully.',
      data: {
        users,
        totalPages,
        totalUsers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

async function deleteUser(req, res, next) {
  const permission = req?.user?.permission;
  const user_id = req?.user?.id;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const { userId } = req.params;

  try {
    // Nếu đang xoá chính tài khoản đang sử dụng thì không cho xoá
    if (+user_id === +userId) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Không thể xoá vì hiện bạn đang sử dụng tài khoản này.',
        user: null,
      });
    }

    const deletedUser = await db.getUser({ user_id: +userId });

    await db.deleteUser({
      user_id: deletedUser.id,
      account_id: deletedUser.account_id,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Xoá người dùng thành công',
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

async function addNewUser(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const errors = validationResult(req);
  const file = req?.file;

  // Validate
  if (
    !errors.isEmpty() ||
    (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype))
  ) {
    const errorMessages = reduceErrors(errors?.errors) || [];

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype)) {
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

    await db.addNewUser({
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username,
      password: hashedPassword,
      permission: permission,
      avatar: avatar,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm người dùng thành công',
      data: {
        username: username,
        permission: permission,
        first_name: first_name,
        last_name: last_name,
        email: email,
        avatar: avatar,
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
}

async function updateUser(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const errors = validationResult(req);
  const file = req?.file;

  // Validate
  if (
    !errors.isEmpty() ||
    (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype))
  ) {
    const errorMessages = reduceErrors(errors?.errors) || [];

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype)) {
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
    const { userId } = req.params;
    const { first_name, last_name, email, permission } = req.body;

    // Check if email has used by another users
    const emailHasUsed = await db.findByEmailExceptMyself(email, +userId);
    if (emailHasUsed) {
      return res.status(409).json({
        statusCode: 409,
        message: 'Email đã được sử dụng, vui lòng sử dụng email khác',
        data: null,
      });
    }

    const updatedUser = await db.getUser({ user_id: +userId });

    const user = await db.updateUser({
      account_id: updatedUser.account_id,
      user_id: updatedUser.id,
      first_name,
      last_name,
      email,
      avatar,
      permission,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật người dùng thành công',
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
}

// EXAMS
async function getExams(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const { page, limit } = req.query;

  try {
    const exams = await db.getExams({
      page: Number(page),
      limit: Number(limit),
    });
    const totalExams = (await db.totalExams())?.count;
    const totalPages = Math.ceil(totalExams / limit) || 0;

    return res.status(200).json({
      statusCode: 200,
      message: 'Get exams successfully.',
      data: {
        exams,
        totalPages,
        totalExams,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

async function addNewExam(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const errors = validationResult(req);

  // Validate
  if (!errors.isEmpty()) {
    const errorMessages = reduceErrors(errors?.errors) || [];

    return res.status(422).json({
      statusCode: 422,
      message: 'Xác thực thông tin người dùng thất bại',
      errors: errorMessages,
    });
  }

  try {
    const { title, licenses } = req.body;
    // Check username exists or does not
    const isExamTitleExists =
      (
        await db.getExamByTitleAndLicenses({
          title,
          licenses,
        })
      )?.length > 0;

    if (isExamTitleExists) {
      return res.status(409).json({
        statusCode: 409,
        message: 'Tiêu đề đã tồn tại một trong những giấy phép bạn chọn',
        data: null,
      });
    }

    await db.addNewExam({
      title,
      licenses,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm đề thi thành công',
      data: {
        title: title,
        license_ids: licenses,
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
}

async function deleteExam(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const { examId } = req.params;

  try {
    const deletedExam = await db.getExam({ exam_id: +examId });

    await db.deleteExam({ exam_id: +examId });

    return res.status(200).json({
      statusCode: 200,
      message: 'Xoá đề thi thành công',
      data: deletedExam,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

async function updateExam(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const errors = validationResult(req);

  // Validate
  if (!errors.isEmpty()) {
    const errorMessages = reduceErrors(errors?.errors) || [];
    return res.status(422).json({
      statusCode: 422,
      message: 'Xác thực thông tin người dùng thất bại',
      errors: errorMessages,
    });
  }

  try {
    const { examId } = req.params;
    const { title, licenses } = req.body;

    // Check if title has used by others
    const titleHasUsed =
      (
        await db.getExamByTitleAndLicensesExpectMyself({
          exam_id: +examId,
          title: title,
          licenses: licenses,
        })
      )?.length > 0;

    if (titleHasUsed) {
      return res.status(409).json({
        statusCode: 409,
        message:
          'Tiêu đề đã được sử dụng ở trong một những giấy phép bạn chọn, vui lòng chọn tiêu đề khác',
        data: null,
      });
    }

    const updatedExam = await db.getExam({ exam_id: +examId });

    const newLicenses = licenses.filter(
      (l) => !updatedExam.license_ids.includes(l)
    );
    const oldLicenses = updatedExam.license_ids.filter(
      (l) => !licenses.includes(l)
    );

    const exam = await db.updateExam({
      exam_id: +examId,
      title: title,
      new_licenses: newLicenses,
      old_licenses: oldLicenses,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật đề thi thành công',
      data: exam,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

// Questions
async function getQuestions(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const { page, limit } = req.query;

  try {
    const questions = await db.getQuestions({
      page: Number(page),
      limit: Number(limit),
    });

    const totalQuestions = (await db.totalQuestions())?.count;
    const totalPages = Math.ceil(totalQuestions / limit) || 0;

    return res.status(200).json({
      statusCode: 200,
      message: 'Get questions successfully.',
      data: {
        questions,
        totalPages,
        totalQuestions,
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
}

async function addNewQuestion(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const errors = validationResult(req);
  const file = req?.file;

  // Validate
  if (
    !errors.isEmpty() ||
    (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype))
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
    const image = file?.originalname;
    const { text, tip, required, topic_id, answers, exam_ids, license_ids } =
      req.body;

    // Check title question exists or does not
    const isTitleQuestionExists = await db.getQuestionsByText({ text });
    if (isTitleQuestionExists) {
      return res.status(409).json({
        statusCode: 409,
        message: 'Tiêu đề đã tồn tại',
        data: null,
      });
    }

    await db.addNewQuestion({
      image: image,
      text: text,
      tip: tip,
      required: +required,
      topic_id: +topic_id,
      license_ids: JSON.parse(license_ids),
      exam_ids: JSON.parse(exam_ids),
      answers: JSON.parse(answers),
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm câu hỏi thành công',
      data: {
        image: image,
        text: text,
        tip: tip,
        required: +required,
        topic_id: +topic_id,
        license_ids: JSON.parse(license_ids),
        exam_ids: JSON.parse(exam_ids),
        answers: JSON.parse(answers),
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
}

async function updateQuestion(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const errors = validationResult(req);
  const file = req?.file;

  // Validate
  if (
    !errors.isEmpty() ||
    (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file?.mimetype))
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
    const image = file?.originalname;
    const { questionId } = req.params;
    let { text, tip, required, topic_id, answers, exam_ids, license_ids } =
      req.body;

    answers = JSON.parse(answers);
    exam_ids = JSON.parse(exam_ids);
    license_ids = JSON.parse(license_ids);

    // Check title question exists or does not
    const isTitleQuestionExists = await db.getQuestionsByTextExceptMyself({
      text,
      id: +questionId,
    });
    if (isTitleQuestionExists) {
      return res.status(409).json({
        statusCode: 409,
        message: 'Tiêu đề đã tồn tại',
        data: null,
      });
    }

    const updatedQuestion = await db.getQuestion({ id: +questionId });

    const oldAnswers = updatedQuestion.answers;
    const newAnswers = answers;

    const oldExamIds = updatedQuestion.exam_ids.filter(
      (id) => !exam_ids.includes(id)
    );
    const newExamIds = exam_ids.filter(
      (id) => !updatedQuestion.exam_ids.includes(id)
    );

    const oldLicenseIds = updatedQuestion.license_ids.filter(
      (id) => !license_ids.includes(id)
    );
    const newLicenseIds = license_ids.filter(
      (id) => !updatedQuestion.license_ids.includes(id)
    );

    const question = await db.updateQuestion({
      question_id: +questionId,
      image: image,
      required: +required,
      text: text,
      tip: tip,
      topic_id: topic_id,
      old_answers: oldAnswers,
      new_answers: newAnswers,
      old_exam_ids: oldExamIds,
      new_exam_ids: newExamIds,
      old_license_ids: oldLicenseIds,
      new_license_ids: newLicenseIds,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật câu hỏi thành công',
      data: question,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

async function deleteQuestion(req, res, next) {
  const permission = req?.user?.permission;

  if (permission !== 'ADMIN') {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  const { questionId } = req.params;

  try {
    const deletedQuestion = await db.getQuestion({ id: +questionId });

    await db.deleteQuestion({ id: +questionId });

    return res.status(200).json({
      statusCode: 200,
      message: 'Xoá câu hỏi thành công',
      data: deletedQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

module.exports = {
  deleteQuestion,
  statistics,
  getUsers,
  deleteUser,
  addNewUser,
  updateUser,
  getExams,
  addNewExam,
  deleteExam,
  updateExam,
  getQuestions,
  addNewQuestion,
  updateQuestion,
};
