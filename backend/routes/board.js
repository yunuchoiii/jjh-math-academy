const express = require('express');
const { getBoardList, getBoardPosts, getBoardInfoBySlug, getBoardInfoById, createBoard, updateBoard, deleteBoard, } = require('../controllers/board');

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
 * /board:
 *   post:
 *     summary: 게시판 생성
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 */
router.post('/', createBoard);

/**
 * @swagger
 * /board/{boardId}:
 *   put:
 *     summary: 게시판 수정
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: 게시판 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 성공적으로 게시판 수정
 *       404:
 *         description: 게시판 수정 실패
 */
router.put('/:boardId', updateBoard);

/**
 * @swagger
 * /board/{boardId}:
 *   delete:
 *     summary: 게시판 삭제
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: 게시판 ID
 *     responses:
 *       200:
 *         description: 성공적으로 게시판 삭제
 *       404:
 *         description: 게시판 삭제 실패
 */
router.delete('/:boardId', deleteBoard);

/**
 * @swagger
 * /board/{boardId}:
 *   get:
 *     summary: 특정 게시판 정보 조회
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: 게시판 ID
 *     responses:
 *       200:
 *         description: 성공적으로 게시판 정보를 반환
 *       404:
 *         description: 게시판 정보를 찾을 수 없음
 */
router.get('/:boardId', getBoardInfoById);

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
