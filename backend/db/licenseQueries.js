const pool = require('./pool');

async function getLicenses(topicId) {
  try {
    const [rows, fields] = await pool.query('SELECT *  FROM `licenses`;');
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getLicense(licenseId) {
  try {
    const [rows, fields] = await pool.query(
      'SELECT *  FROM `licenses` WHERE id = ?;',
      [licenseId]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getLicenses,
  getLicense,
};
