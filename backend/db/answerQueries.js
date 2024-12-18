const pool = require('./pool');

async function getAnswers(questionId) {
  try {
    if (questionId) {
      const [rows, fields] = await pool.query(
        'SELECT * FROM `answers` WHERE question_id = ?;',
        [questionId]
      );
      return rows;
    }

    const [rows, fields] = await pool.query('SELECT * FROM `answers`;');
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getAnswer(answerId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM `answers` WHERE id = ? ;',
      [answerId]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAnswers,
  getAnswer,
};
