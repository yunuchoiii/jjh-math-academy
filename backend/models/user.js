const { DataTypes, Sequelize } = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
      },
      userType: {
        type: DataTypes.ENUM('teacher', 'parent', 'student'),
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      sequelize,
      timestamps: true, //createdAt, updatedAt
      underscored: false, //created_at, updated_at
      modelName: 'User',
      tableName: 'users',
      paranoid: true, //deletedAt 유저 삭제일
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    });
  }

  static associate(db) {
    db.User.hasOne(db.Teacher);
    db.User.hasOne(db.Parent);
    db.User.hasOne(db.Student);
  }
}

module.exports = User;
