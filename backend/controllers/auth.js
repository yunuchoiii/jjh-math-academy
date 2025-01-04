const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const Parent = require("../models/parent");
const db = require("../models");

// 회원가입
exports.join = async (req, res, next) => {
  const { email, username, password, phoneNumber, userType } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hash,
      username,
      phoneNumber,
      userType,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 선생님 회원가입
exports.joinTeacher = async (req, res, next) => {
  const { userId, isAdmin } = req.body;
  try {
    const exUser = await Teacher.findOne({ where: { userId } });
    if (exUser) {
      return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
    }
    const user = await Teacher.create({
      userId,
      isAdmin,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 학생 회원가입
exports.joinStudent = async (req, res, next) => {
  const { userId, parentId, gradeLevel, schoolName, isActive } = req.body;
  try {
    const exUser = await Student.findOne({ where: { userId } });
    if (exUser) {
      return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
    }
    const user = await Student.create({
      userId,
      parentId,
      gradeLevel,
      schoolName,
      isActive,
    });
    res.status(201).json({
      message: "학생 회원가입이 완료되었습니다.",
      user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// 학부모 회원가입
exports.joinParent = async (req, res, next) => {
  const { userId, isActive } = req.body;
  try {
    const exUser = await Parent.findOne({ where: { userId } });
    if (exUser) {
      return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
    }
    const user = await Parent.create({
      userId,
      isActive,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// 이메일 중복 체크
exports.checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const exUser = await User.findOne({ where: { email } });
  if (exUser) {
    return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
  }
  res.status(200).json({ message: '사용 가능한 이메일입니다.' });
}

// 로그인 및 토큰 발급
exports.login = async (req, res, next) => {
  passport.authenticate('local', async (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }

    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      try {
        // Access Token 생성
        const accessToken = jwt.sign(
          {
            id: user.userId,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '30m',
            issuer: 'jjhmathacademy2004',
          }
        );

        // Refresh Token 생성
        const refreshToken = jwt.sign(
          {
            id: user.userId,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '28d',
            issuer: 'jjhmathacademy2004',
          }
        );

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          domain: process.env.CLIENT_DOMAIN,
        });

        // Refresh Token을 DB에 저장
        await saveRefreshTokenToDB(user.userId, refreshToken);

        return res.status(200).json({
          code: 200,
          message: '로그인 및 토큰이 발급되었습니다.',
          accessToken, // Access Token만 응답
          user: {
            userId: user.userId,
            email: user.email,
            username: user.username,
            phoneNumber: user.phoneNumber,
            userType: user.userType,
          },
        });
      } catch (tokenError) {
        console.error(tokenError);
        return res.status(500).json({
          code: 500,
          message: '토큰 발급 중 서버 에러가 발생했습니다.',
        });
      }
    });
  })(req, res, next);
};

// 로그아웃
exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        code: 400,
        message: '로그아웃 요청에 Refresh Token이 없습니다.',
      });
    }

    // Refresh Token을 DB에서 삭제
    await db.User.update({ refreshToken: null }, { where: { refreshToken } });

    // 쿠키에서 Refresh Token 제거
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      domain: process.env.CLIENT_DOMAIN,
    });

    // 세션 종료
    req.logout((err) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      return res.status(200).json({
        code: 200,
        message: '로그아웃 되었습니다.',
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '로그아웃 중 서버 에러가 발생했습니다.',
    });
  }
};

// Refresh Token 검증 및 새로운 Access Token 발급
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token이 없습니다.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await db.User.findOne({ where: { userId: decoded.id, refreshToken } });

    if (!user) {
      return res.status(401).json({ message: '유효하지 않은 Refresh Token입니다.' });
    }

    // 새로운 Access Token 및 Refresh Token 발급
    const newAccessToken = jwt.sign(
      {
        id: user.userId,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m',
        issuer: 'jjhmathacademy2004',
      }
    );

    const newRefreshToken = jwt.sign(
      {
        id: user.userId,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '28d',
        issuer: 'jjhmathacademy2004',
      }
    );

    await saveRefreshTokenToDB(user.userId, newRefreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      domain: process.env.CLIENT_DOMAIN,
    });

    return res.status(200).json({
      code: 200,
      message: '새로운 Access Token이 발급되었습니다.',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Refresh Token이 유효하지 않거나 만료되었습니다.' });
  }
};

// Refresh Token 저장 함수
async function saveRefreshTokenToDB(userId, refreshToken) {
  try {
    // 기존의 Refresh Token을 덮어씌우거나 새로 저장
    await db.User.update(
      { refreshToken }, // 저장할 Refresh Token
      { where: { userId } } // 해당 사용자
    );
  } catch (error) {
    console.error('Refresh Token 저장 실패:', error);
    throw new Error('서버 에러로 Refresh Token 저장 실패');
  }
}


// 토큰 발급 (개발 환경에서만 사용)
exports.createToken = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "production") {
      const token = jwt.sign({
        id: req.body.userId,
        email: req.body.email,
      }, process.env.JWT_SECRET, {
        expiresIn: '30m',
        issuer: 'jjhmathacademy2004',
      });
      return res.json({
        code: 200,
        message: '토큰이 발급되었습니다.',
        token,
      });
    } else {
      return res.status(401).json({
        code: 401,
        message: '토큰 발급 불가',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
}