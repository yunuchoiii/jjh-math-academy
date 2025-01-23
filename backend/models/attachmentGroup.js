const { DataTypes, Sequelize } = require('sequelize');

class AttachmentGroup extends Sequelize.Model {
  static initiate(sequelize) {
    AttachmentGroup.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'AttachmentGroup',
      tableName: 'attachment_groups',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    });
  }

  static associate(db) {
    db.AttachmentGroup.hasMany(db.Attachment, { foreignKey: 'attachmentGroupId' });
  }
}

module.exports = AttachmentGroup;