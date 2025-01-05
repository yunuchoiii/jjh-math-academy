const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { getUser, getUserList, getStudentList, getParentList, getTeacherList, updateStudent, updateTeacher, updateParent, updateUser } = require('../controllers/user');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * /user/myinfo:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 내 정보 조회 성공
 *       401:
 *         description: Authorization header is missing or token is invalid
 *       404:
 *         description: User not found
 */ 
router.get('/myinfo', verifyToken, getUser);

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: 사용자 목록 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 사용자 목록 조회 성공
 *       404:
 *         description: 사용자가 없습니다.
 *       500:
 *         description: 사용자 목록을 불러오는 중 오류가 발생했습니다.
 */
router.get('/list', getUserList);

/**
 * @swagger
 * /user/list/student:
 *   get:
 *     summary: 학생 목록 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 학생 목록 조회 성공
 *       404:
 *         description: 학생이 없습니다.
 *       500:
 *         description: 학생 목록을 불러오는 중 오류가 발생했습니다.
 */
router.get('/list/student', getStudentList);

/**
 * @swagger
 * /user/list/parent:
 *   get:
 *     summary: 학부모 목록 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 학부모 목록 조회 성공
 *       404:
 *         description: 학부모가 없습니다.
 *       500:
 *         description: 학부모 목록을 불러오는 중 오류가 발생했습니다.
 */
router.get('/list/parent', getParentList);

/**
 * @swagger
 * /user/list/teacher:
 *   get:
 *     summary: 선생님 목록 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 선생님 목록 조회 성공
 *       404:
 *         description: 선생님이 없습니다.
 *       500:
 *         description: 선생님 목록을 불러오는 중 오류가 발생했습니다.
 */
router.get('/list/teacher', getTeacherList);

/**
 * @swagger
 * /user/update/:userId:
 *   put:
 *     summary: 사용자 정보 수정
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: 사용자 정보 수정 성공
 *       404:
 *         description: 사용자를 찾을 수 없습니다.
 */
router.put('/update/:userId', updateUser);

/**
 * @swagger
 * /user/update/teacher/:userId:
 *   put:
 *     summary: 선생님 정보 수정
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isAdmin:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 선생님 정보 수정 성공
 *       404:
 *         description: 선생님을 찾을 수 없습니다.
 */
router.put('/update/teacher/:userId', updateTeacher);

/**
 * @swagger
 * /user/update/student/:userId:
 *   put:
 *     summary: 학생 정보 수정
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parentId:
 *                 type: string
 *               gradeLevel:
 *                 type: string
 *               schoolName:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 학생 정보 수정 성공
 *       404:
 *         description: 학생을 찾을 수 없습니다.
 */
router.put('/update/student/:userId', updateStudent);

/**
 * @swagger
 * /user/update/parent/:userId:
 *   put:
 *     summary: 학부모 정보 수정
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 학부모 정보 수정 성공
 *       404:
 *         description: 학부모를 찾을 수 없습니다.
 */
router.put('/update/parent/:userId', updateParent);

module.exports = router;
