const { DataTypes, Sequelize } = require('sequelize');

class MathProgram extends Sequelize.Model {
  static initiate(sequelize) {
    MathProgram.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '고유 ID'
      },
      category: {
        type: DataTypes.ENUM('common_math', 'advanced_math'),
        allowNull: false,
        comment: '카테고리'
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '프로그램 이름'
      },
      subtitle: {
        type: DataTypes.STRING(100),
        comment: '부제'
      },
      target_age: {
        type: DataTypes.STRING(50),
        comment: '대상 연령/학년'
      },
      description: {
        type: DataTypes.JSON,
        comment: '프로그램 설명 (JSON 배열 형태)'
      },
      books: {
        type: DataTypes.TEXT,
        comment: '사용하는 교재'
      },
      schedule: {
        type: DataTypes.STRING(100),
        comment: '수업 횟수 및 시간'
      }
    }, {
      sequelize,
      modelName: 'MathProgram',
      tableName: 'math_programs',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    });
  }
}

module.exports = MathProgram;