const express = require('express');
const { getAttachmentsByGroupId } = require('../controllers/attachmentGroup');

const router = express.Router();

// 파일 그룹 기반 조회
router.get('/:id', getAttachmentsByGroupId);

module.exports = router;