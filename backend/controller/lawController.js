const db = require('../db/lawQueries');

async function getLawTopics(req, res, next) {
  try {
    const data = await db.getLawTopics();

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get law topics successfully.',
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

async function getLawTopic(req, res, next) {
  const { topicId } = req.params;
  try {
    const data = await db.getLawTopic(topicId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get law topic successfully.',
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

async function getViolations(req, res, next) {
  const query = req.query;

  const topicId = query.topicId;
  const violationType = query.violationType;

  try {
    const data = await db.getViolations(topicId, violationType);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get violations successfully.',
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

async function getViolation(req, res, next) {
  const { violationId } = req.params;
  try {
    const data = await db.getViolation(violationId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get violation successfully.',
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

module.exports = { getLawTopics, getLawTopic, getViolations, getViolation };
