const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ 
      where: { userId: id }, 
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
