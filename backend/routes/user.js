const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { getUser, getUserList, getStudentList, getParentList, getTeacherList, updateStudent, updateTeacher, updateParent, updateUser } = require('../controllers/user');

const router = express.Router();

// GET /user/myinfo
router.get('/myinfo', verifyToken, getUser);

// GET /user/list
router.get('/list', getUserList);

// GET /user/list/student
router.get('/list/student', getStudentList);

// GET /user/list/parent
router.get('/list/parent', getParentList);

// GET /user/list/teacher
router.get('/list/teacher', getTeacherList);

// PUT /user/update/:userId
router.put('/update/:userId', updateUser);

// PUT /user/update/teacher/:userId
router.put('/update/teacher/:userId', updateTeacher);

// PUT /user/update/student/:userId
router.put('/update/student/:userId', updateStudent);

// PUT /user/update/parent/:userId
router.put('/update/parent/:userId', updateParent);

module.exports = router;
