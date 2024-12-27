const { DataTypes, Sequelize } = require('sequelize');

class Student extends Sequelize.Model {
  static initiate(sequelize) {
    Student.init({
      studentId: {
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
      parentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'parents',
          key: 'parentId',
        },
      },
      gradeLevel: {
        type: DataTypes.STRING(20),
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
      modelName: 'Student',
      tableName: 'students',
      paranoid: true, //deletedAt 유저 삭제일
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    });
  }

  static associate(db) {
    db.Student.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
    db.Student.belongsTo(db.Parent, { foreignKey: 'parentId', targetKey: 'parentId' });
  }
}

module.exports = Student;