const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');
require('./passport')();

dotenv.config();
const authRouter = require('./routes/auth');

const app = express();

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
app.use(session({
  secret: process.env.COOKIE_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

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
