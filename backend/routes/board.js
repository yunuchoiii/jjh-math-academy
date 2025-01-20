const express = require('express');
const { getBoardList, getBoardPosts, getBoardInfoBySlug, getBoardInfoById, createBoard, updateBoard, deleteBoard, } = require('../controllers/board');

const router = express.Router();

// 게시판 목록 조회
router.get('/', getBoardList);

// 게시판 생성
router.post('/', createBoard);

// 게시판 수정
router.put('/:boardId', updateBoard);

// 게시판 삭제
router.delete('/:boardId', deleteBoard);

// 특정 게시판 정보 조회
router.get('/:boardId', getBoardInfoById);

// 특정 게시판 정보 조회 (slug)
router.get('/slug/:slug', getBoardInfoBySlug);

// 특정 게시판의 게시글 목록 조회
router.get('/:boardId/posts', getBoardPosts);

module.exports = router;
