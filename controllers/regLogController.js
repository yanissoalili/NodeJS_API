const mongoose = require('mongoose');

const DinosaureModel = mongoose.model('Dinosaure');
const passport = require('passport');
const _ = require('lodash');

function regLoginController() {
  function register(req, res, next) {
    const dinosaure = new DinosaureModel();
    dinosaure.username = req.body.username;

    dinosaure.setPassword(req.body.password);

    dinosaure.save((err, doc) => {
      if (!err) res.send(doc);
      else if (err.code === 11000) res.status(422).send(['Duplicate username adrress found.']);
      else return next(err);
    });
  }
  function logIn(req, res) {
    passport.authenticate('local', (err, user, info) => {
      let token;

      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // If a user is found
      if (user) {
        token = user.generateJwt();
        res.status(200);
        res.json({
          token,

        });
      } else {
      // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  }


  function profileRead(req, res, next) {
    // eslint-disable-next-line no-underscore-dangle
    DinosaureModel.findOne({ _id: req._id },
      (err, user) => {
        if (!user) return res.status(404).json({ status: false, message: 'User record not found.' });
        return res.status(200).json({ status: true, user: _.pick(user, ['username', '_id', 'age', 'race', 'famille', 'nourriture']) });
      });
  }
  return {
    register,
    profileRead,
    logIn,
  }
}
module.exports = regLoginController;
