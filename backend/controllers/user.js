const jwt = require('jsonwebtoken');
const db = require('../models');
const User = require('../models/user');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Parent = require('../models/parent');

// 토큰을 이용한 사용자 정보 조회
exports.getUserByToken = async (req, res) => {
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

// 사용자 정보 조회
exports.getUserInfo = async (req, res) => {
  const userId = req.params.userId;
  const user = await db.User.findOne({ where: { userId } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
}

// 선생님 정보 조회
exports.getTeacherInfo = async (req, res) => {
  const userId = req.params.userId;
  const teacher = await db.Teacher.findOne({ where: { userId } });
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }
  return res.status(200).json({ teacher });
}

// 학부모 정보 조회
exports.getParentInfo = async (req, res) => {
  const userId = req.params.userId;
  const parent = await db.Parent.findOne({ where: { userId } });
  if (!parent) {
    return res.status(404).json({ message: 'Parent not found' });
  }
  return res.status(200).json({ parent });
}

// 학생 정보 조회
exports.getStudentInfo = async (req, res) => {
  const userId = req.params.userId;
  const student = await db.Student.findOne({ where: { userId } });
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  return res.status(200).json({ student });
}

// 공통된 사용자 목록 조회 함수
async function getUserListByType(userType, additionalAttributes = []) {
  // userType이 null이 아닐 때만 조건 추가
  const whereCondition = userType !== null ? { userType } : {};

  const users = await db.User.findAll({
    where: whereCondition,
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

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, email, phoneNumber } = req.body;
  try {
    const [updated] = await User.update({ username, email, phoneNumber }, { where: { userId } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { userId } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.updateTeacher = async (req, res, next) => {
  const userId = req.params.userId;
  const { isAdmin, isActive } = req.body;
  try {
    const [updated] = await Teacher.update(
      { isAdmin, isActive }, 
      { where: { userId } 
    });
    if (updated) {
      const updatedUser = await Teacher.findOne({ where: { userId } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: '선생님을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.updateStudent = async (req, res, next) => {
  const userId = req.params.userId;
  const { parentId, gradeLevel, schoolName, isActive } = req.body;
  try {
    const [updated] = await Student.update(
      { parentId, gradeLevel, schoolName, isActive },
      { where: { userId } }
    );

    if (updated) {
      const updatedUser = await Student.findOne({ where: { userId } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: '학생을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.updateParent = async (req, res, next) => {
  const userId = req.params.userId;
  const { isActive } = req.body;
  try {
    const [updated] = await Parent.update({ isActive }, { where: { userId } });
    if (updated) {
      const updatedUser = await Parent.findOne({ where: { userId } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: '학부모를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
