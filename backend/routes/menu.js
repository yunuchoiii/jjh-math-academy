const express = require('express');
const { getMenuList, createMenu, updateMenu, deleteMenu, getMenu } = require('../controllers/menu');

const router = express.Router();

// 메뉴 목록 조회
router.get('/list', getMenuList);

// 메뉴 조회
router.get('/:id', getMenu);

// 메뉴 생성
router.post('/', createMenu);

// 메뉴 수정
router.put('/:id', updateMenu);

// 메뉴 삭제
router.delete('/:id', deleteMenu);

module.exports = router;
