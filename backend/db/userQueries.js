const pool = require('./pool');

const create = async ({
  first_name,
  last_name,
  email,
  username,
  password,
  permission,
}) => {
  try {
    const [resultAccount, fieldsAccount] = await pool.query(
      'INSERT INTO `accounts` (`username`, `password`, `permission`) VALUES(?, ?, ?);',
      [username, password, permission]
    );

    const [resultUser, fieldsUser] = await pool.query(
      'INSERT INTO `users` (`first_name`, `last_name`, `email`, `account_id`) VALUES( ?, ?, ?, ?);',
      [first_name, last_name, email, resultAccount.insertId]
    );

    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
};

const find = async (account) => {
  try {
    const [rows, fields] = await pool.query(
      'SELECT `users`.`id`, `accounts`.`username`, `accounts`.`password`, `users`.`first_name`, `users`.`last_name`, `users`.`avatar`, `users`.`email`, `users`.`created_at`, `users`.`updated_at`, `users`.`account_id`, `accounts`.`permission` FROM `accounts`  JOIN `users` ON `users`.`account_id` = `accounts`.`id` WHERE `accounts`.`username` = ? OR `users`.`email` = ?;',
      [account, account]
    );
    return rows?.[0];
  } catch (error) {
    console.error(error);
  }
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

const updateUser = async (username, { firstName, lastName, email, avatar }) => {
  try {
    const [accounts, fields] = await pool.query(
      'SELECT * FROM `accounts` WHERE `username` = ?;',
      [username]
    );

    let sql =
      'UPDATE `users` SET `first_name` = ?, `last_name` = ?, `email` = ?';
    const values = [firstName, lastName, email];

    if (avatar) {
      sql += ' , avatar = ?';
      values.push(avatar);
    }

    values.push(accounts[0].id);

    sql += ' WHERE `users`.`account_id` = ?;';

    const [result] = await pool.query(sql, values);

    if (result.affectedRows > 0) {
      const user = await find(username);
      return user;
    }
    return null;
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

const changePassword = async (username, new_password) => {
  try {
    const sql = 'UPDATE accounts SET password = ?  WHERE username = ?;';
    const [result] = await pool.query(sql, [new_password, username]);
    return result?.affectedRows > 0;
  } catch (error) {
    console.error(error);
  }
};

const saveExamHistory = async ({ user_id, exam_id, license_id }) => {
  try {
    const sql =
      'INSERT INTO examhistories (user_id, exam_id, license_id) VALUES(?, ?, ?);';
    const [result] = await pool.query(sql, [user_id, exam_id, license_id]);
    console.log(result);
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const getExamHistory = async ({ user_id, exam_id, license_id }) => {
  try {
    const sql =
      'SELECT * FROM examhistories WHERE user_id = ? AND exam_id = ? AND license_id = ?;';
    const [exam] = await pool.query(sql, [user_id, exam_id, license_id]);
    return exam[0];
  } catch (error) {
    console.error(error);
  }
};

const deleteExamHistory = async ({ user_id, exam_id, license_id }) => {
  try {
    const sql =
      'DELETE FROM examhistories WHERE user_id = ? AND exam_id = ? AND license_id = ?;';
    const [result] = await pool.query(sql, [user_id, exam_id, license_id]);
    console.log(result);
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const saveAnswerHistory = async ({ answer_id, exam_history_id }) => {
  try {
    const sql =
      'INSERT INTO answerhistories (answer_id, exam_history_id) VALUES(?, ?);';
    const [result] = await pool.query(sql, [answer_id, exam_history_id]);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const deleteAnswerHistory = async ({ exam_history_id }) => {
  try {
    const sql = 'DELETE FROM answerhistories WHERE exam_history_id = ?;';
    const [result] = await pool.query(sql, [exam_history_id]);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getExamHistories = async ({ user_id, license_id }) => {
  try {
    const sql =
      'SELECT eh.id, e.title FROM examhistories eh JOIN exams e ON e.id = eh.exam_id  WHERE eh.user_id = ? AND eh.license_id = ?;';
    const [rows] = await pool.query(sql, [user_id, license_id]);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getDetailsExamHistory = async ({ exam_history_id, user_id }) => {
  try {
    const sql =
      'SELECT eh.id, e.title FROM examhistories eh JOIN exams e ON e.id = eh.exam_id  WHERE eh.id = ? AND eh.user_id = ? ;';
    const [rows] = await pool.query(sql, [exam_history_id, user_id]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getAnswerIds = async ({ exam_history_id }) => {
  try {
    const sql =
      'SELECT ah.answer_id, a.question_id FROM answerhistories ah JOIN answers a ON a.id = ah.answer_id WHERE exam_history_id = ?;';
    const [rows] = await pool.query(sql, [exam_history_id]);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getQuestions = async ({ exam_history_id, user_id }) => {
  try {
    const sql =
      'SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id FROM questions_exams qe JOIN examhistories eh ON qe.exam_id = eh.exam_id JOIN questions q ON q.id = qe.question_id WHERE eh.id = ? AND eh.user_id = ?';
    const [rows] = await pool.query(sql, [exam_history_id, user_id]);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getWrongAnswer = async ({ user_id, license_id }) => {
  try {
    const sql =
      'SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id, a.id AS idSelectedAnswer FROM answerhistories ah JOIN answers a ON a.id = ah.answer_id AND a.correct = 0 JOIN examhistories eh ON eh.id  = ah.exam_history_id JOIN questions q ON q.id = a.question_id WHERE eh.user_id = ? AND eh.license_id = ?;';
    const [rows] = await pool.query(sql, [user_id, license_id]);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = async ({ new_password, email }) => {
  try {
    const sql =
      'UPDATE accounts a, users u SET a.password = ? WHERE a.id = u.account_id AND u.email = ? ;';
    const [result] = await pool.query(sql, [new_password, email]);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  find,
  findByUsername,
  findByEmail,
  updateUser,
  findByEmailExceptMyself,
  changePassword,
  saveExamHistory,
  deleteExamHistory,
  saveAnswerHistory,
  deleteAnswerHistory,
  getExamHistory,
  getExamHistories,
  getAnswerIds,
  getQuestions,
  getDetailsExamHistory,
  getWrongAnswer,
  updatePassword,
};
