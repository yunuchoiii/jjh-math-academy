const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

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

exports.login = async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};