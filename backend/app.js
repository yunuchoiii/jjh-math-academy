const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');
require('./passport')();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

dotenv.config();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const infoRouter = require('./routes/info');
const menuRouter = require('./routes/menu');
const boardRouter = require('./routes/board');
const postRouter = require('./routes/post');
const app = express();

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(session({
  secret: process.env.COOKIE_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 30 * 60 * 1000, // 30분
  },
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 여러 YAML 파일을 로드하여 하나의 문서로 통합
const authDoc = YAML.load(path.join(__dirname, 'swagger/auth.yaml'));
const boardDoc = YAML.load(path.join(__dirname, 'swagger/board.yaml'));
const infoDoc = YAML.load(path.join(__dirname, 'swagger/info.yaml'));
const menuDoc = YAML.load(path.join(__dirname, 'swagger/menu.yaml'));
const postDoc = YAML.load(path.join(__dirname, 'swagger/post.yaml'));
const userDoc = YAML.load(path.join(__dirname, 'swagger/user.yaml'));

// 모든 문서를 하나로 병합
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: '전체 API 문서',
    description: '여러 API 문서를 통합한 문서',
    version: '1.0.0',
  },
  paths: {
    ...authDoc.paths,
    ...boardDoc.paths,
    ...infoDoc.paths,
    ...menuDoc.paths,
    ...postDoc.paths,
    ...userDoc.paths,
  },
};

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 라우터 설정
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/info', infoRouter);
app.use('/menu', menuRouter);
app.use('/board', boardRouter);
app.use('/post', postRouter);

// 데이터베이스 연결
sequelize.sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err);
  });

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello, JJH Math Academy!');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
