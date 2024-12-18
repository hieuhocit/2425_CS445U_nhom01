const pool = require('./pool');

const { getQuestions } = require('./questionQueries');

async function getTopics(licenseId) {
  try {
    const [topics, fields] = await pool.query('SELECT * FROM `topics`;');

    if (licenseId) {
      const questions = (await getQuestions(undefined, licenseId)).questions;

      topics.map((topic) => {
        let totalQuestion = 0;

        if (topic.id === 0) {
          totalQuestion = questions.length;
        } else if (topic.id === 8) {
          totalQuestion = questions.filter((q) => q.required).length;
        } else {
          totalQuestion = questions.filter(
            (q) => q.topic_id === topic.id
          ).length;
        }

        topic.totalQuestion = totalQuestion;
        return topic;
      });
    }

    return topics;
  } catch (error) {
    console.error(error);
  }
}

async function getTopic(topicId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM `topics` WHERE id = ? ;',
      [topicId]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getTopics,
  getTopic,
};
