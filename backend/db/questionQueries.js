const pool = require('./pool');

const { getAnswers } = require('./answerQueries');

async function getQuestions(topicId, licenseId, examId) {
  try {
    let sql = '';
    const values = [];

    if (examId) {
      sql =
        'SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id FROM questions_exams qe JOIN questions q ON q.id = qe.question_id WHERE qe.exam_id = ?;';
      values.push(examId);
    } else if (topicId !== undefined && licenseId !== undefined) {
      const sqlTopic =
        topicId == 8
          ? 'AND q.required = 1;'
          : topicId == 0
          ? ''
          : 'AND q.topic_id = ?;';

      sql =
        'SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id FROM questions_licenses ql  JOIN questions q ON q.id =  ql.question_id WHERE ql.license_id = ?  ' +
        sqlTopic;

      values.push(licenseId, Number(topicId) === 0 ? 1 : topicId);
    } else if (topicId !== undefined) {
      const sqlTopic =
        topicId == 8
          ? 'WHERE required = 1;'
          : topicId == 0
          ? ''
          : 'WHERE topic_id = ?;';

      sql = 'SELECT * FROM `questions` ' + sqlTopic;
      values.push(Number(topicId) === 0 ? 1 : topicId);
    } else if (licenseId !== undefined) {
      sql =
        'SELECT q.id, q.image, q.text, q.tip, q.required, q.topic_id FROM questions_licenses ql  JOIN questions q ON q.id =  ql.question_id WHERE ql.license_id = ?;';
      values.push(licenseId);
    } else {
      sql = 'SELECT * FROM `questions`;';
    }

    const [rows, fields] = await pool.query(sql, values);

    // GET ANSWER FOR EACH QUESTION
    for (const q of rows) {
      const answers = await getAnswers(q.id);
      q.answers = answers;
    }

    if (topicId) {
      const [topics, fields] = await pool.query(
        'SELECT * FROM `topics` WHERE id = ? ;',
        [topicId]
      );

      return {
        topic: topics[0],
        questions: rows,
      };
    }

    return { questions: rows };
  } catch (error) {
    console.error(error);
  }
}

async function getQuestion(examId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM `questions` WHERE id = ?;',
      [examId]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getQuestions,
  getQuestion,
};
