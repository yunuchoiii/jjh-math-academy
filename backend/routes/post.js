const express = require('express');
const router = express.Router();
const { updateViewCount, getPost, getPostList, createPost, updatePost, deletePost } = require('../controllers/post');

/** 
 * @swagger 
 * tags:
 *   name: Post
 *   description: 게시글 관련 API
 * */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: 페이지 번호
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         required: false
 *         description: 페이지 크기
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 목록을 반환
 *       404:
 *         description: 게시글 정보를 찾을 수 없음
 */
router.get('/', getPostList);

/**
 * @swagger
 * /post/{postId}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 게시글을 반환
 *       404:
 *         description: 게시글 정보를 찾을 수 없음
 */
router.get('/:postId', getPost);

/**
 * @swagger
 * /post:
 *   post:
 *     summary: 게시글 생성
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               authorId:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *               isNotice:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: 성공적으로 게시글 생성
 *       404:
 *         description: 게시글 생성 실패
 */
router.post('/', createPost);

/**
 * @swagger
 * /post/{postId}:
 *   put:
 *     summary: 게시글 수정
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               isNotice:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 수정
 *       404:
 *         description: 게시글 수정 실패
 */
router.put('/:postId', updatePost);

/**
 * @swagger
 * /post/{postId}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 삭제
 *       404:
 *         description: 게시글 삭제 실패
 */
router.delete('/:postId', deletePost);

/**
 * @swagger
 * /post/{postId}/view:
 *   put:
 *     summary: 게시글 조회수 증가
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 조회수 증가
 *       404:
 *         description: 게시글 조회수 증가 실패
 */
router.put('/:postId/view', updateViewCount);

module.exports = router;
