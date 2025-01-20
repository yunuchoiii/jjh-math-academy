const express = require('express');
const { getProgramsInfo, getTuitionInfo } = require('../controllers/info');

const router = express.Router();

// 프로그램 정보 조회
router.get('/programs', getProgramsInfo);

// 수업료 조회
router.get('/tuition', getTuitionInfo);

module.exports = router;
