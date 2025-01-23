// controllers/attachmentController.js
const path = require('path');
const s3 = require('../config/s3');
const Attachment = require('../models/attachment');
const AttachmentGroup = require('../models/attachmentGroup');

exports.getAttachmentsByGroupId = async (req, res) => {
  try {
    const { id } = req.params;
    const attachmentGroup = await AttachmentGroup.findByPk(id);
    if (!attachmentGroup) {
      return res.status(404).json({ error: '파일 그룹이 존재하지 않습니다.' });
    }
    const attachments = await Attachment.findAll({ where: { attachmentGroupId: id } });
    if (!attachments) {
      return res.status(404).json({ error: '파일이 존재하지 않습니다.' });
    }
    res.status(200).json({ attachments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};