const Menu = require('../models/menu');

// 메뉴 조회
exports.getMenuList = async (req, res, next) => {
  try {
    const menus = await Menu.findAll();
    if (!menus) {
      return res.status(404).json({ message: '메뉴 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(menus);
  } catch (error) {
    next(error);
  }
};