const pool = require('./pool');

async function getLawTopics() {
  try {
    const [rows, fields] = await pool.query('SELECT *  FROM `lawtopics`;');
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getLawTopic(topicId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT *  FROM `lawtopics` WHERE id = ?;',
      [topicId]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getViolations(topicId, violationType) {
  try {
    let sql = '';
    const values = [];

    if (topicId && violationType) {
      sql =
        'SELECT *  FROM `violations` WHERE law_topic_id = ? AND violation_type = ?;';
      values.push(topicId, violationType);
    } else if (topicId) {
      sql = 'SELECT *  FROM `violations` WHERE law_topic_id = ?';
      values.push(topicId);
    } else if (violationType) {
      sql = 'SELECT *  FROM `violations` WHERE violation_type = ?';
      values.push(violationType);
    } else {
      sql = 'SELECT *  FROM `violations`';
    }

    const [rows, fields] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getViolation(violationId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT *  FROM `violations` WHERE id = ?;',
      [violationId]
    );

    const placeholders = rows[0].relations.map((_) => '?').join(',');

    if (placeholders.length > 0) {
      const [relations] = await pool.query(
        'SELECT *  FROM `violations` WHERE `no` IN (' + placeholders + ');',
        rows[0].relations
      );
      rows[0].relations = relations;
    }

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getLawTopics,
  getLawTopic,
  getViolations,
  getViolation,
};
