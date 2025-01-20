const express = require('express');
const { getBoardList, getBoardPosts, getBoardInfoBySlug, getBoardInfoById, } = require('../controllers/board');

const router = express.Router();

/** 
 * @swagger 
 * tags:
 *   name: Board
 *   description: 게시판 관련 API
 * */

/**
 * @swagger
 * /board:
 *   get:
 *     summary: 게시판 목록 조회
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: 성공적으로 게시판 목록을 반환
 *       404:
 *         description: 게시판 정보를 찾을 수 없음
 */
router.get('/', getBoardList);

/**
 * @swagger
 * /board/id/{boardId}:
 *   get:
 *     summary: 특정 게시판 정보 조회
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시판 ID
 *     responses:
 *       200:
 *         description: 성공적으로 게시판 정보를 반환
 *       404:
 *         description: 게시판 정보를 찾을 수 없음
 */
router.get('/id/:boardId', getBoardInfoById);

/**
 * @swagger
 * /board/slug/{slug}:
 *   get:
 *     summary: 특정 게시판 정보 조회 (slug)
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시판 슬러그
 *     responses:
 *       200:
 *         description: 성공적으로 게시판 정보를 반환
 *       404:
 *         description: 게시판 정보를 찾을 수 없음
 */
router.get('/slug/:slug', getBoardInfoBySlug);

/**
 * @swagger
 * /board/{boardId}/posts:
 *   get:
 *     summary: 특정 게시판의 게시글 목록 조회
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시판 ID
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 게시글 수
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 목록을 반환
 *       404:
 *         description: 게시글 정보를 찾을 수 없음
 */
router.get('/:boardId/posts', getBoardPosts);

module.exports = router;
