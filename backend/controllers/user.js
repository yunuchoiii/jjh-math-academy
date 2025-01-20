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

// 공통된 정보 조회 함수
async function getInfo(model, userId, res, notFoundMessage) {
  const data = await model.findOne({ where: { userId } });
  if (!data) {
    return res.status(404).json({ message: notFoundMessage });
  }
  return res.status(200).json({ data });
}

// 사용자 정보 조회
exports.getUserInfo = async (req, res) => {
  const userId = req.params.userId;
  return getInfo(db.User, userId, res, 'User not found');
}

// 선생님 정보 조회
exports.getTeacherInfo = async (req, res) => {
  const userId = req.params.userId;
  return getInfo(db.Teacher, userId, res, 'Teacher not found');
}

// 학부모 정보 조회
exports.getParentInfo = async (req, res) => {
  const userId = req.params.userId;
  return getInfo(db.Parent, userId, res, 'Parent not found');
}

// 학생 정보 조회
exports.getStudentInfo = async (req, res) => {
  const userId = req.params.userId;
  return getInfo(db.Student, userId, res, 'Student not found');
}

// 공통된 사용자 목록 조회 함수
async function getUserListByType(userType, additionalAttributes = [], limit = null, offset = null) {
  // userType이 null이 아닐 때만 조건 추가
  const whereCondition = userType !== null ? { userType } : {};

  const users = await db.User.findAll({
    where: whereCondition,
    attributes: ['userId', 'username', 'email', ...additionalAttributes],
    limit,
    offset
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

// 공통된 목록 조회 함수
async function getList(model, userType, attributes, limit, offset, page, res, notFoundMessage) {
  const totalDataCount = await model.count();
  const users = await getUserListByType(userType, [], limit, offset);
  const data = await model.findAll({ attributes, limit, offset });
  const mergedList = mergeUserData(users, data, 'userId');
  const totalPages = Math.ceil(totalDataCount / limit);
  const isLastPage = page >= totalPages;
  const isFirstPage = page <= 1;

  if (mergedList.length === 0) {
    return res.status(404).json({ message: notFoundMessage });
  }

  return res.status(200).json({
    data: mergedList,
    page: {
      totalDataCount,
      totalPages,
      isLastPage,
      isFirstPage,
      requestPage: parseInt(page),
      requestSize: limit
    }
  });
}

exports.getUserList = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;

  try {
    const totalDataCount = await db.User.count();
    const users = await getUserListByType(null, ['phoneNumber', 'userType'], limit, offset);
    const totalPages = Math.ceil(totalDataCount / limit);
    const isLastPage = page >= totalPages;
    const isFirstPage = page <= 1;

    if (users.length === 0) {
      return res.status(404).json({ message: '사용자가 없습니다.' });
    }

    return res.status(200).json({
      data: users,
      page: {
        totalDataCount,
        totalPages,
        isLastPage,
        isFirstPage,
        requestPage: parseInt(page),
        requestSize: limit
      }
    });
  } catch (error) {
    console.error('Failed to retrieve user list:', error);
    return res.status(500).json({ message: '사용자 목록을 불러오는 중 오류가 발생했습니다.' });
  }
};

exports.getStudentList = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;
  return getList(db.Student, 'student', ['studentId', 'userId', 'parentId', 'gradeLevel', 'schoolName', 'isActive'], limit, offset, page, res, '학생이 없습니다.');
}

exports.getParentList = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;
  return getList(db.Parent, 'parent', ['parentId', 'userId', 'isActive'], limit, offset, page, res, '학부모가 없습니다.');
}

exports.getTeacherList = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;
  return getList(db.Teacher, 'teacher', ['teacherId', 'userId', 'isAdmin', 'isActive'], limit, offset, page, res, '선생님이 없습니다.');
}

// 공통된 업데이트 함수
async function updateData(model, updateData, userId, res, notFoundMessage) {
  try {
    const [updated] = await model.update(updateData, { where: { userId } });
    if (updated) {
      const updatedEntity = await model.findOne({ where: { userId } });
      return res.status(200).json(updatedEntity);
    } else {
      return res.status(404).json({ error: notFoundMessage });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '업데이트 중 오류가 발생했습니다.' });
  }
}

// 사용자 업데이트
exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const { username, email, phoneNumber } = req.body;
  return updateData(User, { username, email, phoneNumber }, userId, res, '사용자를 찾을 수 없습니다.');
}

// 선생님 업데이트
exports.updateTeacher = (req, res) => {
  const userId = req.params.userId;
  const { isAdmin, isActive } = req.body;
  return updateData(Teacher, { isAdmin, isActive }, userId, res, '선생님을 찾을 수 없습니다.');
}

// 학생 업데이트
exports.updateStudent = (req, res) => {
  const userId = req.params.userId;
  const { parentId, gradeLevel, schoolName, isActive } = req.body;
  return updateData(Student, { parentId, gradeLevel, schoolName, isActive }, userId, res, '학생을 찾을 수 없습니다.');
}

// 학부모 업데이트
exports.updateParent = (req, res) => {
  const userId = req.params.userId;
  const { isActive } = req.body;
  return updateData(Parent, { isActive }, userId, res, '학부모를 찾을 수 없습니다.');
}
