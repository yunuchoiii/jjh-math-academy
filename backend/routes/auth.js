const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { join, login, createToken, joinTeacher, joinStudent, joinParent, refreshToken, logout, checkEmail } = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 관련 API
 */

/**
 * @swagger
 * /auth/join:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               userType:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 이미 가입된 이메일입니다.
 */
router.post('/join', isNotLoggedIn, join); 

/**
 * @swagger
 * /auth/join/teacher:
 *   post:
 *     summary: 선생님 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 이미 가입된 이메일입니다.
 */
router.post('/join/teacher', isNotLoggedIn, joinTeacher);

/**
 * @swagger
 * /auth/join/student:
 *   post:
 *     summary: 학생 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               parentId:
 *                 type: string
 *               gradeLevel:
 *                 type: string
 *               schoolName:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 학생 회원가입이 완료되었습니다.
 *       400:
 *         description: 이미 가입된 이메일입니다.
 */
router.post('/join/student', isNotLoggedIn, joinStudent);

/**
 * @swagger
 * /auth/join/parent:
 *   post:
 *     summary: 학부모 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 이미 가입된 이메일입니다.
 */
router.post('/join/parent', isNotLoggedIn, joinParent);

/**
 * @swagger
 * /auth/check-email:
 *   post:
 *     summary: 이메일 중복 체크
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 사용 가능한 이메일입니다.
 *       400:
 *         description: 이미 가입된 이메일입니다.
 */
router.post('/check-email', isNotLoggedIn, checkEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 및 토큰이 발급되었습니다.
 *       401:
 *         description: 인증 실패
 */
router.post('/login', isNotLoggedIn, login);

/**
 * @swagger
 * /auth/create-token:
 *   post:
 *     summary: 토큰 생성 (개발 환경에서만 사용)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 토큰이 발급되었습니다.
 *       401:
 *         description: 토큰 발급 불가
 */
router.post('/create-token', apiLimiter, createToken);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: 토큰 재발급
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 새로운 Access Token이 발급되었습니다.
 *       401:
 *         description: Refresh Token이 유효하지 않거나 만료되었습니다.
 */
router.post('/refresh-token', refreshToken);

/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: 토큰 검증
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 토큰 검증 성공
 */
router.get('/verify-token', verifyToken);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: 로그아웃
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 로그아웃 되었습니다.
 *       400:
 *         description: 로그아웃 요청에 Refresh Token이 없습니다.
 */
router.get('/logout', isLoggedIn, logout);

module.exports = router;