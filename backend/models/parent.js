const { DataTypes, Sequelize } = require('sequelize');

class Parent extends Sequelize.Model {
  static initiate(sequelize) {
    Parent.init({
      parentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId',
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, //createdAt, updatedAt
      underscored: false, //created_at, updated_at
      modelName: 'Parent',
      tableName: 'parents',
      paranoid: true, //deletedAt 유저 삭제일
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    });
  }

  static associate(db) {
    db.Parent.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
  }
}

module.exports = Parent;