const { DataTypes, Sequelize } = require('sequelize');

class Tuition extends Sequelize.Model {
  static initiate(sequelize) {
    Tuition.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '고유 ID'
      },
      level: {
        type: DataTypes.ENUM('elementary', 'middle'),
        allowNull: false,
        comment: '초등 또는 중등'
      },
      classLevel: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '교습 과정'
      },
      subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '과목'
      },
      monthlyHours: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '월 교습 시간'
      },
      monthlyFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '월 교습비'
      }
    }, {
      sequelize,
      modelName: 'Tuition',
      tableName: 'tuitions',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    });
  }
}

module.exports = Tuition;