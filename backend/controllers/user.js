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

// 공통된 사용자 목록 조회 함수
async function getUserListByType(userType, additionalAttributes = []) {
  const users = await db.User.findAll({
    where: { userType },
    attributes: ['userId', 'username', 'email', ...additionalAttributes],
  });
  return users;
}

// 공통된 병합 로직 함수
function mergeUserData(users, specificData, userIdKey) {
  return specificData.map(item => {
    const user = users.find(u => u.userId === item[userIdKey]);
    return {
      ...item.get(),
      username: user ? user.username : null,
      email: user ? user.email : null,
    };
  });
}

exports.getUserList = async (req, res) => {
  try {
    const users = await getUserListByType(null, ['phoneNumber', 'userType']);
    if (users.length === 0) {
      return res.status(404).json({ message: '사용자가 없습니다.' });
    }
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error('Failed to retrieve user list:', error);
    return res.status(500).json({ message: '사용자 목록을 불러오는 중 오류가 발생했습니다.' });
  }
};

exports.getStudentList = async (req, res) => {
  try {
    const users = await getUserListByType('student');
    const students = await db.Student.findAll({
      attributes: ['studentId', 'userId', 'parentId', 'gradeLevel', 'schoolName', 'isActive'],
    });
    const mergedList = mergeUserData(users, students, 'userId');
    if (mergedList.length === 0) {
      return res.status(404).json({ message: '학생이 없습니다.' });
    }
    return res.status(200).json({ data: mergedList });
  } catch (error) {
    console.error('Failed to retrieve student list:', error);
    return res.status(500).json({ message: '학생 목록을 불러오는 중 오류가 발생했습니다.' });
  }
};

exports.getParentList = async (req, res) => {
  try {
    const users = await getUserListByType('parent');
    const parents = await db.Parent.findAll({
      attributes: ['parentId', 'userId', 'isActive'],
    });
    const mergedList = mergeUserData(users, parents, 'userId');
    if (mergedList.length === 0) {
      return res.status(404).json({ message: '학부모가 없습니다.' });
    }
    return res.status(200).json({ data: mergedList });
  } catch (error) {
    console.error('Failed to retrieve parent list:', error);
    return res.status(500).json({ message: '학부모 목록을 불러오는 중 오류가 발생했습니다.' });
  }
};

exports.getTeacherList = async (req, res) => {
  try {
    const users = await getUserListByType('teacher');
    const teachers = await db.Teacher.findAll({
      attributes: ['teacherId', 'userId', 'isAdmin', 'isActive'],
    });
    const mergedList = mergeUserData(users, teachers, 'userId');
    if (mergedList.length === 0) {
      return res.status(404).json({ message: '선생님이 없습니다.' });
    }
    return res.status(200).json({ data: mergedList });
  } catch (error) {
    console.error('Failed to retrieve teacher list:', error);
    return res.status(500).json({ message: '선생님 목록을 불러오는 중 오류가 발생했습니다.' });
  }
};