const express = require('express');
const { getMenuList } = require('../controllers/menu');

const router = express.Router();

// 메뉴 목록 조회
router.get('/list', getMenuList);

module.exports = router;
