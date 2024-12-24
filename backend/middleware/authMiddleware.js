const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthenticated.',
      user: null,
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    req.user.access_token = accessToken;
    req.user.refresh_token = refreshToken;
    return next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError' && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
          {
            username: decodedRefresh.username,
            id: decodedRefresh.id,
            permission: decodedRefresh.permission,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30m' }
        );

        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        req.user = decodedRefresh;
        req.user.access_token = newAccessToken;
        req.user.refresh_token = refreshToken;
        return next();
      } catch (err) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Unauthenticated.',
          user: null,
        });
      }
    } else {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthenticated.',
        user: null,
      });
    }
  }
};
