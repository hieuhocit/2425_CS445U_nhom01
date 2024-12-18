const db = require('../db/signQueries');

async function getSignTopics(req, res, next) {
  try {
    const data = await db.getSignTopics();

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get sign topics successfully.',
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

async function getSignTopic(req, res, next) {
  const { topicId } = req.params;
  try {
    const data = await db.getSignTopic(topicId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get sign topic successfully.',
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

async function getSigns(req, res, next) {
  const query = req.query;

  const topicId = query.topicId;

  try {
    const data = await db.getSigns(topicId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get signs successfully.',
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

async function getSign(req, res, next) {
  const { signId } = req.params;
  try {
    const data = await db.getSign(signId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get sign successfully.',
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

module.exports = { getSignTopics, getSignTopic, getSigns, getSign };
