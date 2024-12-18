const pool = require('./pool');

async function getExams(licenseId) {
  try {
    if (licenseId) {
      const [rows, fields] = await pool.query(
        'SELECT e.id, e.title FROM exams_licenses el JOIN exams e ON e.id = el.exam_id WHERE el.license_id = ?;',
        [licenseId]
      );
      return rows;
    }
    const [rows, fields] = await pool.query('SELECT * FROM `exams`;');
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getExam(examId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM `exams` WHERE id = ? ;',
      [examId]
    );
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getExams,
  getExam,
};
