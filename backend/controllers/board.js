const Board = require("../models/board");
const Post = require("../models/post");
const { getPaginatedList } = require("./common");

// 게시판 목록 조회
exports.getBoardList = async (req, res, next) => {
  try {
    const boards = await Board.findAll();
    if (!boards) {
      return res.status(404).json({ message: '게시판 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
};

exports.getBoardInfoBySlug = async (req, res, next) => {
  const { slug } = req.params;
  const board = await Board.findOne({ where: { slug } });
  if (!board) {
    return res.status(404).json({ message: '게시판 정보를 찾을 수 없습니다.' });
  }
  res.status(200).json(board);
};

exports.getBoardInfoById = async (req, res, next) => {
  const { boardId } = req.params;
  const board = await Board.findOne({ where: { id: boardId } });
  if (!board) {
    return res.status(404).json({ message: '게시판 정보를 찾을 수 없습니다.' });
  }
  res.status(200).json(board);
};

exports.getBoardPosts = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { page = 1, size = 10 } = req.query;
    const posts = await getPaginatedList({
      model: Post, 
      page, 
      size, 
      notFoundMessage: '게시글 정보를 찾을 수 없습니다.', 
      filter: { boardId }
    });
    if (posts.status === 404) {
      return res.status(404).json({ message: posts.message });
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
