const db = require('../db/viewQueries');

async function increaseView(req, res, next) {
  try {
    await db.insert({ sid: req.session.id });
    return res.status(200);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { increaseView };
