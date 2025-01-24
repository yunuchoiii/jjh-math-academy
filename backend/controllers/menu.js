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

exports.getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: '메뉴 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};

exports.createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    next(error);
  }
};

exports.updateMenu = async (req, res, next) => {
  try {
    const menu = await Menu.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};

exports.deleteMenu = async (req, res, next) => {
  try {
    await Menu.destroy({ where: { id: req.params.id } });
    res.status(204).json({ message: '메뉴가 삭제되었습니다.' });
  } catch (error) {
    next(error);
  }
};