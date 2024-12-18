const pool = require('./pool');

async function getSignTopics() {
  try {
    const [rows, fields] = await pool.query('SELECT *  FROM `signtopics`;');
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getSignTopic(topicId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT *  FROM `signtopics` WHERE id = ?;',
      [topicId]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getSigns(topicId) {
  try {
    let sql = '';
    const values = [];

    if (topicId) {
      sql = 'SELECT *  FROM `signs` WHERE sign_topic_id = ?;';
      values.push(topicId);
    } else {
      sql = 'SELECT *  FROM `signs`';
    }

    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getSign(signId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT *  FROM `signs` WHERE id = ?;',
      [signId]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getSignTopics,
  getSignTopic,
  getSigns,
  getSign,
};
