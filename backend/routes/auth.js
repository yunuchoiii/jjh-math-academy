const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { join, login, createToken, joinTeacher, joinStudent, joinParent, refreshToken, logout, checkEmail } = require('../controllers/auth');

const router = express.Router();

// 회원가입
router.post('/join', isNotLoggedIn, join); 

// 선생님 회원가입
router.post('/join/teacher', isNotLoggedIn, joinTeacher);

// 학생 회원가입
router.post('/join/student', isNotLoggedIn, joinStudent);

// 학부모 회원가입
router.post('/join/parent', isNotLoggedIn, joinParent);

// 이메일 중복 체크
router.post('/check-email', isNotLoggedIn, checkEmail);

// 로그인
router.post('/login', isNotLoggedIn, login);

// 토큰 생성
router.post('/create-token', apiLimiter, createToken);

// 토큰 갱신
router.post('/refresh-token', refreshToken);

// 토큰 검증
router.get('/verify-token', verifyToken);

// 로그아웃
router.get('/logout', isLoggedIn, logout);

module.exports = router;