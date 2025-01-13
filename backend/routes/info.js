const express = require('express');
const { getProgramsInfo } = require('../controllers/info');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Info
 *   description: 정보 관련 API
 */

/**
 * @swagger
 * /info/programs:
 *   get:
 *     summary: 프로그램 정보 조회
 *     tags: [Info]
 *     responses:
 *      200:
 *        description: 프로그램 정보 조회 성공
 */
router.get('/programs', getProgramsInfo);

module.exports = router;
