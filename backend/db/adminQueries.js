const pool = require('./pool');

// statistics
const totalUsers = async () => {
  try {
    const [result] = await pool.query('SELECT COUNT(*) AS count FROM users;');
    console.log(result);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const getUserPercentChange = async () => {
  try {
    const sql =
      'SELECT IFNULL(ROUND( (tuan_nay - tuan_truoc) / tuan_truoc * 100, 2 ), 0) AS percent FROM ( SELECT (SELECT COUNT(*) FROM users WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)) AS tuan_nay, (SELECT COUNT(*) FROM users WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1)) AS tuan_truoc ) AS counts;';
    const [result] = await pool.query(sql);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const totalExams = async () => {
  try {
    const [result] = await pool.query('SELECT COUNT(*) AS count FROM exams;');
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const getExamsPercentChange = async () => {
  try {
    const sql =
      'SELECT IFNULL(ROUND( (tuan_nay - tuan_truoc) / tuan_truoc * 100, 2 ), 0) AS percent FROM ( SELECT (SELECT COUNT(*) FROM exams WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)) AS tuan_nay, (SELECT COUNT(*) FROM exams WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1)) AS tuan_truoc ) AS counts;';
    const [result] = await pool.query(sql);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const totalQuestions = async () => {
  try {
    const [result] = await pool.query(
      'SELECT COUNT(*) AS count FROM questions;'
    );
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const getQuestionsPercentChange = async () => {
  try {
    const sql =
      'SELECT IFNULL(ROUND( (tuan_nay - tuan_truoc) / tuan_truoc * 100, 2 ), 0) AS percent FROM ( SELECT (SELECT COUNT(*) FROM questions WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)) AS tuan_nay, (SELECT COUNT(*) FROM questions WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1)) AS tuan_truoc ) AS counts;';
    const [result] = await pool.query(sql);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const totalVisitors = async () => {
  try {
    const [result] = await pool.query(
      'SELECT COUNT(*) AS count FROM pageview;'
    );
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const getVisitorsPercentChange = async () => {
  try {
    const sql =
      'SELECT IFNULL(ROUND( (tuan_nay - tuan_truoc) / tuan_truoc * 100, 2 ), 0) AS percent FROM ( SELECT (SELECT COUNT(*) FROM pageview WHERE YEARWEEK(access, 1) = YEARWEEK(CURDATE(), 1)) AS tuan_nay, (SELECT COUNT(*) FROM pageview WHERE YEARWEEK(access, 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1)) AS tuan_truoc ) AS counts;';
    const [result] = await pool.query(sql);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const getUsersRegisterByMonth = async () => {
  try {
    const sql =
      "WITH months AS ( SELECT 'Jan' AS month, 1 AS month_num UNION ALL SELECT 'Feb', 2 UNION ALL SELECT 'Mar', 3 UNION ALL SELECT 'Apr', 4 UNION ALL SELECT 'May', 5 UNION ALL SELECT 'Jun', 6 UNION ALL SELECT 'Jul', 7 UNION ALL SELECT 'Aug', 8 UNION ALL SELECT 'Sep', 9 UNION ALL SELECT 'Oct', 10 UNION ALL SELECT 'Nov', 11 UNION ALL SELECT 'Dec', 12 ) SELECT m.month, COALESCE(COUNT(u.id), 0) AS users FROM months m LEFT JOIN users u ON MONTH(u.created_at) = m.month_num GROUP BY m.month, m.month_num ORDER BY m.month_num;";
    const [rows] = await pool.query(sql);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

// users
const getUsers = async ({ page, limit }) => {
  try {
    let sql =
      'SELECT u.id, a.username ,u.first_name, u.last_name, u.avatar, u.email, a.permission, u.created_at, u.updated_at FROM users u JOIN accounts a ON u.account_id = a.id ORDER BY u.created_at DESC';
    const values = [];

    if (page && limit) {
      sql += ' LIMIT ?, ? ;';
      values.push((page - 1) * limit, limit);
    } else if (limit) {
      sql += ' LIMIT ? ;';
      values.push(limit);
    }

    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async ({ user_id }) => {
  try {
    const [rows] = await pool.query(
      'SELECT u.id, a.username ,u.first_name, u.last_name, u.avatar, u.email, a.permission, u.account_id , u.created_at, u.updated_at FROM users u JOIN accounts a ON u.account_id = a.id WHERE u.id = ?',
      [user_id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async ({ user_id, account_id }) => {
  try {
    await pool.query('DELETE FROM users WHERE id = ? ;', [user_id]);
    await pool.query('DELETE FROM accounts WHERE id = ? ;', [account_id]);

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

const addNewUser = async ({
  first_name,
  last_name,
  email,
  username,
  password,
  permission,
  avatar,
}) => {
  try {
    const [resultAccount, fieldsAccount] = await pool.query(
      'INSERT INTO `accounts` (`username`, `password`, `permission`) VALUES(?, ?, ?);',
      [username, password, permission]
    );

    const [resultUser, fieldsUser] = await pool.query(
      'INSERT INTO `users` (`first_name`, `last_name`, `email`, `avatar` , `account_id`) VALUES( ?, ?, ?, ?, ?);',
      [first_name, last_name, email, avatar, resultAccount.insertId]
    );

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

const findByUsername = async (username) => {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM accounts WHERE username = ? ;',
      [username]
    );
    return rows?.[0];
  } catch (error) {
    console.error(error);
  }
};

const findByEmail = async (email) => {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM users WHERE email = ? ;',
      [email]
    );
    return rows?.[0];
  } catch (error) {
    console.error(error);
  }
};

const findByEmailExceptMyself = async (email, id) => {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND id != ?;',
      [email, id]
    );
    return rows?.[0];
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async ({
  user_id,
  account_id,
  permission,
  first_name,
  last_name,
  email,
  avatar,
}) => {
  try {
    await pool.query('UPDATE `accounts` SET `permission` = ? WHERE `id` = ?;', [
      permission,
      account_id,
    ]);

    let sql =
      'UPDATE `users` SET `first_name` = ?, `last_name` = ?, `email` = ?';
    const values = [first_name, last_name, email];

    if (avatar) {
      sql += ' , avatar = ?';
      values.push(avatar);
    }

    values.push(user_id);

    sql += ' WHERE `users`.`id` = ?;';

    const [result] = await pool.query(sql, values);

    if (result.affectedRows > 0) {
      const user = await getUser({ user_id: user_id });
      return user;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

// EXAMS
const getExams = async ({ page, limit }) => {
  try {
    let sql =
      'SELECT e.id, e.title, JSON_ARRAYAGG(el.license_id) AS license_ids FROM exams e LEFT JOIN exams_licenses el ON e.id = el.exam_id GROUP BY e.id, e.title ORDER BY e.created_at DESC';
    const values = [];

    if (page && limit) {
      sql += ' LIMIT ?, ? ;';
      values.push((page - 1) * limit, limit);
    } else if (limit) {
      sql += ' LIMIT ? ;';
      values.push(limit);
    }

    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getExam = async ({ exam_id }) => {
  try {
    let sql =
      'SELECT e.id, e.title, JSON_ARRAYAGG(el.license_id) AS license_ids FROM exams e LEFT JOIN exams_licenses el ON e.id = el.exam_id where e.id = ? GROUP BY e.id, e.title;';
    const [rows] = await pool.query(sql, exam_id);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getExamByTitleAndLicenses = async ({ title, licenses }) => {
  try {
    const placeholders = licenses.map((_) => '?').join(',');

    const sql =
      'SELECT * FROM exams e WHERE e.title = ? AND EXISTS ( SELECT 1 FROM exams_licenses el WHERE el.exam_id = e.id AND el.license_id IN (' +
      placeholders +
      ') );';

    const [rows] = await pool.query(sql, [title, ...licenses]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getExamByTitleAndLicensesExpectMyself = async ({
  exam_id,
  title,
  licenses,
}) => {
  try {
    const placeholders = licenses.map((_) => '?').join(',');

    const sql =
      'SELECT * FROM exams e WHERE e.title = ? AND e.id != ? AND EXISTS ( SELECT 1 FROM exams_licenses el WHERE el.exam_id = e.id AND el.license_id IN (' +
      placeholders +
      ') );';

    const [rows] = await pool.query(sql, [title, exam_id, ...licenses]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const addNewExam = async ({ title, licenses }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO `exams` (`title`) VALUES(?);',
      [title]
    );

    const examId = result.insertId;

    let sql =
      'INSERT INTO `exams_licenses` (`exam_id`,`license_id`) VALUES (?,?)';

    for (const l of licenses) {
      await pool.query(sql, [examId, l]);
    }

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

const deleteExam = async ({ exam_id }) => {
  try {
    await pool.query('DELETE FROM exams_licenses WHERE exam_id = ? ;', exam_id);
    await pool.query('DELETE FROM exams WHERE id = ? ;', exam_id);
    return true;
  } catch (error) {
    console.error(error);
  }
};

const updateExam = async ({ exam_id, title, new_licenses, old_licenses }) => {
  try {
    await pool.query('UPDATE `exams` SET `title` = ? WHERE id = ?', [
      title,
      exam_id,
    ]);

    let sql =
      'INSERT INTO `exams_licenses` (`exam_id`,`license_id`) VALUES (?,?)';

    for (const l of new_licenses) {
      await pool.query(sql, [exam_id, l]);
    }

    const placeholders = old_licenses.map((_) => '?').join(',');

    await pool.query(
      'DELETE FROM `exams_licenses` WHERE exam_id = ? AND license_id IN (' +
        placeholders +
        ')',
      [exam_id, ...old_licenses]
    );

    return await getExam({ exam_id: exam_id });
  } catch (error) {
    console.error(error);
  }
  return false;
};

// QUESTIONS
const getQuestions = async ({ page, limit }) => {
  try {
    let sql =
      "WITH QuestionLicenses AS ( SELECT ql.question_id, JSON_ARRAYAGG(ql.license_id) AS license_ids FROM questions_licenses ql GROUP BY ql.question_id ), QuestionAnswers AS ( SELECT a.question_id, JSON_ARRAYAGG( JSON_OBJECT( 'id', a.id, 'text', a.text, 'correct', a.correct, 'question_id', a.question_id ) ) AS answers FROM answers a GROUP BY a.question_id ), QuestionExams AS ( SELECT qe.question_id, JSON_ARRAYAGG(qe.exam_id) AS exam_ids FROM questions_exams qe GROUP BY qe.question_id ) SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id, ql.license_ids, qe.exam_ids, qa.answers, q.created_at, q.updated_at FROM questions q LEFT JOIN QuestionLicenses ql ON q.id = ql.question_id LEFT JOIN QuestionAnswers qa ON q.id = qa.question_id LEFT JOIN QuestionExams qe ON q.id = qe.question_id ORDER BY q.created_at DESC";

    const values = [];

    if (page && limit) {
      sql += ' LIMIT ?, ? ;';
      values.push((page - 1) * limit, limit);
    } else if (limit) {
      sql += ' LIMIT ? ;';
      values.push(limit);
    }

    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getQuestion = async ({ id }) => {
  try {
    let sql =
      "WITH QuestionLicenses AS ( SELECT ql.question_id, JSON_ARRAYAGG(ql.license_id) AS license_ids FROM questions_licenses ql GROUP BY ql.question_id ), QuestionAnswers AS ( SELECT a.question_id, JSON_ARRAYAGG( JSON_OBJECT( 'id', a.id, 'text', a.text, 'correct', a.correct, 'question_id', a.question_id ) ) AS answers FROM answers a GROUP BY a.question_id ), QuestionExams AS ( SELECT qe.question_id, JSON_ARRAYAGG(qe.exam_id) AS exam_ids FROM questions_exams qe GROUP BY qe.question_id ) SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id, ql.license_ids, qe.exam_ids, qa.answers, q.created_at, q.updated_at FROM questions q LEFT JOIN QuestionLicenses ql ON q.id = ql.question_id LEFT JOIN QuestionAnswers qa ON q.id = qa.question_id LEFT JOIN QuestionExams qe ON q.id = qe.question_id WHERE q.id = ?";

    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getQuestionsByText = async ({ text }) => {
  try {
    const [rows] = await pool.query('SELECT * FROM questions WHERE text = ?', [
      text,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getQuestionsByTextExceptMyself = async ({ text, id }) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM questions WHERE text = ? AND id != ?',
      [text, id]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const addNewQuestion = async ({
  image,
  text,
  tip,
  required,
  topic_id,
  answers,
  exam_ids,
  license_ids,
}) => {
  try {
    const [question] = await pool.query(
      'INSERT INTO questions (image, `text`, tip, required, topic_id) VALUES(?, ?, ?, ?, ?);',
      [image, text, tip, required, topic_id]
    );

    const question_id = question.insertId;

    for (const answer of answers) {
      await pool.query(
        'INSERT INTO answers (`text`, correct, question_id) VALUES(?, ?, ?);',
        [answer.text, answer.correct ? 1 : 0, question_id]
      );
    }

    for (const exam_id of exam_ids) {
      await pool.query(
        'INSERT INTO questions_exams (question_id, exam_id) VALUES(?, ?);',
        [question_id, exam_id]
      );
    }

    for (const license_id of license_ids) {
      await pool.query(
        'INSERT INTO questions_licenses (license_id, question_id) VALUES(?, ?);',
        [license_id, question_id]
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const updateQuestion = async ({
  question_id,
  image,
  text,
  tip,
  required,
  topic_id,
  old_answers,
  new_answers,
  old_exam_ids,
  new_exam_ids,
  old_license_ids,
  new_license_ids,
}) => {
  try {
    if (image) {
      await pool.query(
        'UPDATE questions SET image=?, `text`=?, tip=?, required=?, topic_id=? WHERE id=?;',
        [image, text, tip, required, topic_id, question_id]
      );
    } else {
      await pool.query(
        'UPDATE questions SET `text`=?, tip=?, required=?, topic_id=? WHERE id=?;',
        [text, tip, required, topic_id, question_id]
      );
    }

    for (const answer of old_answers) {
      await pool.query('DELETE FROM answers WHERE id = ?', [answer.id]);
    }

    for (const answer of new_answers) {
      await pool.query(
        'INSERT INTO answers (`text`, correct, question_id) VALUES(?, ?, ?);',
        [answer.text, answer.correct ? 1 : 0, question_id]
      );
    }

    for (const exam_id of old_exam_ids) {
      await pool.query(
        'DELETE FROM questions_exams WHERE question_id = ? AND exam_id = ?;',
        [question_id, exam_id]
      );
    }

    for (const exam_id of new_exam_ids) {
      await pool.query(
        'INSERT INTO questions_exams (question_id, exam_id) VALUES(?, ?);',
        [question_id, exam_id]
      );
    }

    for (const license_id of old_license_ids) {
      await pool.query(
        'DELETE FROM questions_licenses WHERE license_id = ? AND question_id = ?;',
        [license_id, question_id]
      );
    }

    for (const license_id of new_license_ids) {
      await pool.query(
        'INSERT INTO questions_licenses (license_id, question_id) VALUES(?, ?);',
        [license_id, question_id]
      );
    }

    return await getQuestion({ id: question_id });
  } catch (error) {
    console.error(error);
  }
};

const deleteQuestion = async ({ id }) => {
  try {
    await pool.query('DELETE FROM answers WHERE question_id = ?', [id]);
    await pool.query('DELETE FROM questions_exams WHERE question_id = ?', [id]);
    await pool.query('DELETE FROM questions_licenses WHERE question_id = ?', [
      id,
    ]);
    await pool.query('DELETE FROM questions WHERE id = ?', [id]);

    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  deleteQuestion,
  updateQuestion,
  getQuestion,
  getQuestionsByTextExceptMyself,
  addNewQuestion,
  getQuestionsByText,
  getQuestions,
  totalUsers,
  totalExams,
  totalQuestions,
  totalVisitors,
  getUserPercentChange,
  getExamsPercentChange,
  getQuestionsPercentChange,
  getVisitorsPercentChange,
  getUsersRegisterByMonth,
  getUsers,
  deleteUser,
  getUser,
  addNewUser,
  findByUsername,
  findByEmail,
  findByEmailExceptMyself,
  updateUser,
  getExams,
  getExamByTitleAndLicenses,
  addNewExam,
  getExam,
  deleteExam,
  getExamByTitleAndLicensesExpectMyself,
  updateExam,
};
