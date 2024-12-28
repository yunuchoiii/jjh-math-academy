const jwt = require('jsonwebtoken');
const db = require('../models');

exports.getUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Access Token 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 유저 데이터 조회
    const user = await db.User.findOne({
      where: { userId: decoded.id },
      attributes: ['userId', 'username', 'email', 'phoneNumber', 'userType'], // 필요한 데이터만 반환
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};