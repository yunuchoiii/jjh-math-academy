const { DataTypes, Sequelize } = require('sequelize');

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'boards',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
      },
      isNotice: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      attachmentGroupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'attachment_groups',
          key: 'id',
        },
      },
      thumbnail: {
        type: DataTypes.STRING(255),
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
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true,
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.Board, { foreignKey: 'boardId', onDelete: 'CASCADE' });
    db.Post.belongsTo(db.User, { foreignKey: 'authorId', onDelete: 'CASCADE' });
  }
}

module.exports = Post;