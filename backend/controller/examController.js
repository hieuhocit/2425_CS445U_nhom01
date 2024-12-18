const db = require('../db/examQueries');

async function getExams(req, res, next) {
  const query = req.query;

  const licenseId = query.licenseId;

  try {
    const data = await db.getExams(licenseId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get exams successfully.',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

async function getExam(req, res, next) {
  const { examId } = req.params;
  try {
    const data = await db.getExam(examId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get exam successfully.',
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error.',
      data: null,
    });
  }
}

module.exports = { getExams, getExam };
