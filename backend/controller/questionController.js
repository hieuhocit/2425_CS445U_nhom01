const db = require('../db/questionQueries');

async function getQuestions(req, res, next) {
  const query = req.query;

  const topicId = query.topicId;
  const licenseId = query.licenseId;
  const examId = query.examId;

  try {
    const data = await db.getQuestions(topicId, licenseId, examId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get questions successfully.',
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

async function getQuestion(req, res, next) {
  const { questionId } = req.params;
  try {
    const data = await db.getQuestion(questionId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get question successfully.',
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

module.exports = { getQuestions, getQuestion };
