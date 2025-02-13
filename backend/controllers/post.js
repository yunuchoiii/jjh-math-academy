const Board = require("../models/board");
const Post = require("../models/post");
const { getPaginatedList } = require("./common");

// 게시글 목록 조회
exports.getPostList = async (req, res, next) => {
  try {
    const { page = 1, size = 10, isActive, isNotice, searchKeyword, searchType } = req.query;

    // 필터링 조건 설정
    const filter = {};
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
      order,
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

// 게시글 상세 조회
exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: '게시글 정보를 찾을 수 없습니다.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 생성
exports.createPost = async (req, res, next) => {
  try {
    const { boardId, title, content, authorId, isActive, isNotice, attachmentGroupId, thumbnail } = req.body;
    const post = await Post.create({ boardId, title, content, authorId, isActive, isNotice, attachmentGroupId, thumbnail });
    if (!post) {
      return res.status(404).json({ message: '게시글 생성 실패' });
    }
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 수정
exports.updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { boardId, title, content, isActive, isNotice, attachmentGroupId, thumbnail } = req.body;
    const post = await Post.update({ boardId, title, content, isActive, isNotice, attachmentGroupId, thumbnail }, { where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: '게시글 수정 실패' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 삭제
exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.destroy({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: '게시글 삭제 실패' });
    }
    res.status(200).json({ message: '게시글 삭제 성공' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 조회수 증가
exports.updateViewCount = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: '게시글 조회 실패' });
    }
    const updatedPost = await Post.update(
      { views: post.views + 1 },
      { where: { id: postId } }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: '게시글 조회수 증가 실패' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};