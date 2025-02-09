const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { getUserList, getStudentList, getParentList, getTeacherList, updateStudent, updateTeacher, updateParent, updateUser, getUserByToken, getUserInfo, getTeacherInfo, getParentInfo, getStudentInfo } = require('../controllers/user');

const router = express.Router();

// 내 정보 조회
router.get('/myinfo', verifyToken, getUserByToken);

// 사용자 정보 조회
router.get('/info/:userId', verifyToken, getUserInfo);

// 선생님 정보 조회
router.get('/info/teacher/:userId', verifyToken, getTeacherInfo);

// 학부모 정보 조회
router.get('/info/parent/:userId', verifyToken, getParentInfo);

// 학생 정보 조회
router.get('/info/student/:userId', verifyToken, getStudentInfo);

// 사용자 목록 조회
router.get('/list', verifyToken, getUserList);

// 학생 목록 조회
router.get('/list/student', verifyToken, getStudentList);

// 학부모 목록 조회
router.get('/list/parent', verifyToken, getParentList);

// 선생님 목록 조회
router.get('/list/teacher', verifyToken, getTeacherList);

// 사용자 정보 수정
router.put('/update/:userId', verifyToken, updateUser);

// 선생님 정보 수정
router.put('/update/teacher/:userId', verifyToken, updateTeacher);

// 학생 정보 수정
router.put('/update/student/:userId', verifyToken, updateStudent);

// 학부모 정보 수정
router.put('/update/parent/:userId', verifyToken, updateParent);

module.exports = router;
