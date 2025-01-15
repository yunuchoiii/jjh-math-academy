const express = require('express');
const { getMenuList } = require('../controllers/menu');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: 메뉴 관련 API
 */

/**
 * @swagger
 * /menu/list:
 *   get:
 *     summary: 메뉴 조회
 *     tags: [Menu]
 *     responses:
 *      200:
 *        description: 메뉴 조회 성공
 */
router.get('/list', getMenuList);

module.exports = router;
