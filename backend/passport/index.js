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
      include: [
        { 
          model: User, 
          attributes: ['userId', 'username'],
          as: 'Followers',
        }, 
        {
          model: User,
          attributes: ['userId', 'username'],
          as: 'Followings',
        },
      ],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
