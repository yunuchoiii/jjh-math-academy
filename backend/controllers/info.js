const MathProgram = require('../models/mathProgram');
const Tuition = require('../models/tuition');

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

exports.getTuitionInfo = async (req, res, next) => {
  try {
    const tuitions = await Tuition.findAll();
    if (!tuitions) {
      return res.status(404).json({ message: '수업료 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(tuitions);
  } catch (error) {
    next(error);
  }
}