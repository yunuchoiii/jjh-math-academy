const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  } catch (error) {
    next();
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    });
  }
};

exports.apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 1, // 1분
  max: 10,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: `1분에 ${user.type === "premium" ? 1000 : 10}번만 요청할 수 있습니다.`,
    });
  }
});

// exports.corsWhenDomainMatches = async (req, res, next) => {
//   const domain = await Domain.findOne({
//     where: { host: new URL(req.get('origin')).host },
//   });
//   if (domain) {
//     cors({ 
//       origin: req.get('origin'),
//       credentials: true,
//     })(req, res, next);
//   } else {
//     next();
//   }
// };