const Board = require("../models/board");
const Post = require("../models/post");
const { getPaginatedList } = require("./common");
const { Op } = require("sequelize");

// 게시판 목록 조회
exports.getBoardList = async (req, res, next) => {
  try {
    const boards = await Board.findAll();
    if (!boards) {
      return res.status(404).json({ message: '게시판 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(boards);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getBoardInfoBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const board = await Board.findOne({ where: { slug } });
    if (!board) {
    return res.status(404).json({ message: '게시판 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getBoardInfoById = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.findOne({ where: { id: boardId } });
    if (!board) {
    return res.status(404).json({ message: '게시판 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createBoard = async (req, res, next) => {
  try {
    const { name, slug, description, isActive } = req.body;
    const board = await Board.create({ name, slug, description, isActive });
    if (!board) {
      return res.status(404).json({ message: '게시판 생성 실패' });
    }
    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { name, slug, description, isActive } = req.body;
    const board = await Board.update({ name, slug, description, isActive }, { where: { id: boardId } });
    if (!board) {
      return res.status(404).json({ message: '게시판 수정 실패' });
    }
    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const board = await Board.destroy({ where: { id: boardId } });
    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getBoardPosts = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { page = 1, size = 10, isActive, isNotice, searchKeyword, searchType } = req.query;

    // 필터링 조건 설정
    const filter = { boardId };
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }
    if (isNotice !== undefined) {
      filter.isNotice = isNotice === 'true';
    }

    // 검색 조건 설정
    if (searchKeyword) {
      if (searchType === 'title') {
        filter.title = { [Op.like]: `%${searchKeyword}%` };
      } else if (searchType === 'content') {
        filter.content = { [Op.like]: `%${searchKeyword}%` };
      } else if (searchType === 'title+content') {
        filter[Op.or] = [
          { title: { [Op.like]: `%${searchKeyword}%` } },
          { content: { [Op.like]: `%${searchKeyword}%` } }
        ];
      }
    }

    // 정렬 조건 추가
    const order = [['createdAt', 'DESC']];

    const posts = await getPaginatedList({
      model: Post,
      attributes: ['id', 'title', 'authorId', 'isNotice', 'views', 'thumbnail', 'createdAt'],
      page,
      size,
      notFoundMessage: '게시글 정보를 찾을 수 없습니다.',
      filter,
      order // 정렬 조건 전달
    });

    if (posts.status === 404) {
      return res.status(404).json({ message: posts.message });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
