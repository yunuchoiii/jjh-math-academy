const express = require('express');
const upload = require('../config/multer');
const { uploadFile, getAttachment, uploadMultipleFiles, deleteAttachment, downloadAttachment } = require('../controllers/attachment');

const router = express.Router();

// 단일 파일 업로드
router.post('/upload', upload.single('file'), uploadFile);

// 여러 파일 업로드
router.post('/upload-multiple', upload.array('files'), uploadMultipleFiles);

// 파일 조회
router.get('/:id', getAttachment);

// 파일 삭제
// router.delete('/:id', deleteAttachment);

// 파일 다운로드
// router.get('/download/:id', downloadAttachment);

module.exports = router;
