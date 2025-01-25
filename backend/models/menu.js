const { DataTypes, Sequelize } = require('sequelize');

class Menu extends Sequelize.Model {
  static initiate(sequelize) {
    Menu.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'menus', // 참조할 테이블 이름
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isShown: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isExternal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isOpenInNewTab: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      permission: {
        type: DataTypes.ENUM('anonymous', 'admin', 'teacher', 'parent', 'student', 'user'),
        defaultValue: 'anonymous',
      },
      description: {
        type: DataTypes.TEXT,
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
      modelName: 'Menu',
      tableName: 'menus',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    });
  }

  static associate(db) {
    db.Menu.belongsTo(db.Menu, { as: 'parent', foreignKey: 'parentId' });
    db.Menu.hasMany(db.Menu, { as: 'children', foreignKey: 'parentId' });
  }
}

module.exports = Menu;