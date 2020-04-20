const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const DinoUser = mongoose.model('Dinosaure');

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
      DinoUser.findOne({ username },
        (err, user) => {
          if (err) return done(err);
          if (!user) {
            return done(null, false, { message: 'Username is not registered' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Wrong Password.' });
          }
          return done(null, user);
        });
    },
  ),
)
