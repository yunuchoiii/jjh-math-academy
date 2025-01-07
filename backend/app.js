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

dotenv.config();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

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

// Swagger 옵션
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API 문서',
      version: '1.0.0',
      description: 'Node.js API 문서입니다.',
    },
  },
  apis: ['./routes/user.js', './routes/auth.js'], // API 경로
};

// Swagger 문서 생성
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Swagger UI 사용
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우터 설정
app.use('/auth', authRouter);
app.use('/user', userRouter);

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
