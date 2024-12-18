const db = require('../db/licenseQueries');

async function getLicenses(req, res, next) {
  try {
    const data = await db.getLicenses();

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get licenses successfully.',
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

async function getLicense(req, res, next) {
  const { licenseId } = req.params;
  try {
    const data = await db.getLicense(licenseId);

    if (!data) {
      return res.status(404).json({
        statusCode: 404,
        message: 'NOT FOUND',
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Get license successfully.',
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

module.exports = { getLicenses, getLicense };
