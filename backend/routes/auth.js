const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { join, login, createToken, joinTeacher, joinStudent, joinParent, refreshToken, logout, checkEmail } = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join); 

// POST /auth/join/teacher
router.post('/join/teacher', isNotLoggedIn, joinTeacher);

// POST /auth/join/student
router.post('/join/student', isNotLoggedIn, joinStudent);

// POST /auth/join/parent
router.post('/join/parent', isNotLoggedIn, joinParent);

// POST /auth/check-email
router.post('/check-email', isNotLoggedIn, checkEmail);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// POST /auth/token/create
router.post('/create-token', apiLimiter, createToken);

// POST /auth/token/refresh
router.post('/refresh-token', refreshToken);

// GET /auth/token/verify
router.get('/verify-token', verifyToken);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

module.exports = router;