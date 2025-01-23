// controllers/attachmentController.js
const path = require('path');
const s3 = require('../config/s3');
const Attachment = require('../models/attachment');
const AttachmentGroup = require('../models/attachmentGroup');

// fileType 결정 함수
const determineFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) {
    return 'image';
  } else if (mimetype.startsWith('application/pdf')) {
    return 'pdf';
  } else if (mimetype.startsWith('text/')) {
    return 'text';
  } else if (mimetype.startsWith('video/')) {
    return 'video';
  } else if (mimetype.startsWith('audio/')) {
    return 'audio';
  } else if (mimetype.startsWith('application/zip') || mimetype.startsWith('application/x-7z-compressed')) {
    return 'archive';
  } else {
    return 'other';
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    // 새로운 attachmentGroup 생성
    const attachmentGroup = await AttachmentGroup.create({});

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // S3에 파일 업로드
    const s3Response = await s3.upload(s3Params).promise();

    const fileType = determineFileType(file.mimetype);

    // 파일 정보 저장
    const attachment = await Attachment.create({
      fileName: file.originalname,
      filePath: s3Response.Location,
      fileSize: file.size,
      mimeType: file.mimetype,
      fileType,
      attachmentGroupId: attachmentGroup.id,
    });

    res.status(201).json(attachment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadMultipleFiles = async (req, res) => {
  try {
    const files = req.files;

    // 새로운 attachmentGroup 생성
    const attachmentGroup = await AttachmentGroup.create({});

    const attachments = await Promise.all(files.map(async (file) => {
      const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // S3에 파일 업로드
      const s3Response = await s3.upload(s3Params).promise();

      const fileType = determineFileType(file.mimetype);

      // 파일 정보 저장
      return await Attachment.create({
        fileName: file.originalname,
        filePath: s3Response.Location,
        fileSize: file.size,
        mimeType: file.mimetype,
        fileType,
        attachmentGroupId: attachmentGroup.id,
      });
    }));
    res.status(201).json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.findByPk(req.params.id);
    if (!attachment) {
      return res.status(404).json({ error: '파일이 존재하지 않습니다.' });
    }
    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TODO: 파일 삭제 - 권한 문제로 기능 오류
exports.deleteAttachment = async (req, res) => {
  const { id } = req.params;
  try {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) {
      return res.status(404).json({ error: '파일이 존재하지 않습니다.' });
    }

    // S3에서 파일 삭제
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: attachment.filePath,
    }).promise();

    // 데이터베이스에서 파일 정보 삭제
    await attachment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TODO: 파일 다운로드 - 권한 문제로 기능 오류
exports.downloadAttachment = async (req, res) => {
  const { id } = req.params;
  try {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) {
      return res.status(404).json({ error: '파일이 존재하지 않습니다.' });
    }

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: attachment.filePath,
    };

    // S3에서 파일 가져오기
    const s3Response = await s3.getObject(s3Params).promise();

    // 파일 전송
    res.setHeader('Content-Disposition', `attachment; filename=${attachment.fileName}`);
    res.setHeader('Content-Type', attachment.mimeType);
    res.send(s3Response.Body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};