const express = require('express');
const upload = require('../config/multer');
const { uploadFile, getAttachment, uploadMultipleFiles, deleteAttachment, downloadAttachment, uploadFileCKEditor } = require('../controllers/attachment');
const { verifyToken } = require('../middlewares');

const router = express.Router();

// 단일 파일 업로드
router.post('/upload', verifyToken, upload.single('file'), uploadFile);

// 단일 파일 업로드(ckeditor용)
router.post('/upload-ckeditor', verifyToken, upload.single('upload'), uploadFileCKEditor);

// 여러 파일 업로드
router.post('/upload-multiple', verifyToken, upload.array('files'), uploadMultipleFiles);

// 파일 조회
router.get('/:id', getAttachment);

// 파일 삭제
router.delete('/:id', verifyToken, deleteAttachment);

// 파일 다운로드
// router.get('/download/:id', downloadAttachment);

module.exports = router;
