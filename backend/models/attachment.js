const { DataTypes, Sequelize } = require('sequelize');

class Attachment extends Sequelize.Model {
  static initiate(sequelize) {
    Attachment.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      attachmentGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.ENUM('image', 'pdf', 'text', 'video', 'audio', 'archive', 'other'),
        defaultValue: 'other',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      sequelize,
      modelName: 'Attachment',
      tableName: 'attachments',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    });
  }

  static associate(db) {
    db.Attachment.belongsTo(db.AttachmentGroup, { foreignKey: 'attachmentGroupId' });
  }
}

module.exports = Attachment;