const pool = require('./pool');

const insert = async ({ sid }) => {
  try {
    const sql = 'INSERT INTO `pageview` (`sid`) VALUES (?);';
    const [result] = await pool.query(sql, [sid]);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  insert,
};
