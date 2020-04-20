/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;
const dinosaureModel = new Schema({
  username: { type: String },
  hash: { type: String },
  salt: { type: String },
  age: { type: Number },
  famille: { type: String },
  race: { type: String },
  nourriture: { type: String },
  friends: [
    { type: Schema.Types.ObjectId, ref: 'Dinosaure' },
  ]
},

{ collection: 'dinosaure' });

dinosaureModel.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

dinosaureModel.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};
dinosaureModel.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'MY_SECRET'); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
module.exports = mongoose.model('Dinosaure', dinosaureModel);
