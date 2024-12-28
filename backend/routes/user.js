const express = require('express');

const { isLoggedIn, isNotLoggedIn, apiLimiter, verifyToken } = require('../middlewares');
const { getUser } = require('../controllers/user');

const router = express.Router();

// GET /user
router.get('/', verifyToken, getUser);

module.exports = router;