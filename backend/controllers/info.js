const db = require('../models');
const MathProgram = require('../models/math_program');

// 프로그램 정보 조회
exports.getProgramsInfo = async (req, res, next) => {
  try {
    const programs = await MathProgram.findAll();
    if (!programs) {
      return res.status(404).json({ message: '프로그램 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(programs);
  } catch (error) {
    next(error);
  }
};