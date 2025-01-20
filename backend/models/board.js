const { DataTypes, Sequelize } = require('sequelize');

class Board extends Sequelize.Model {
  static initiate(sequelize) {
    Board.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      modelName: 'Board',
      tableName: 'boards',
      timestamps: true,
    });
  }

  static associate(db) {
    db.Board.hasMany(db.Post, { foreignKey: 'boardId', onDelete: 'CASCADE' });
  }
}

module.exports = Board;