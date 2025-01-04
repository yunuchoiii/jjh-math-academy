const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { getUser, getUserList, getStudentList, getParentList, getTeacherList } = require('../controllers/user');

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

module.exports = router;
