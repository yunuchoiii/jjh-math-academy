const express = require('express');
const router = express.Router();
const { updateViewCount, getPost, getPostList, createPost, updatePost, deletePost } = require('../controllers/post');
const { verifyToken } = require('../middlewares');

// 게시글 목록 조회
router.get('/', getPostList);

// 게시글 상세 조회
router.get('/:postId', getPost);

// 게시글 생성
router.post('/', verifyToken, createPost);

// 게시글 수정
router.put('/:postId', verifyToken, updatePost);

// 게시글 삭제
router.delete('/:postId', verifyToken, deletePost);

// 게시글 조회수 증가
router.put('/:postId/view', updateViewCount);

module.exports = router;
