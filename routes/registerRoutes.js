const express = require('express');

const authRouter = express.Router();
const jwtHelper = require('../config/JWTHelper');
const regLogController = require('../controllers/regLogController')();

function router() {
  authRouter.route('/register')
    .post(regLogController.register);
  authRouter.route('/logIn')
    .post(regLogController.logIn);
  authRouter.route('/profile')
    .get(jwtHelper.verifyJwtToken, regLogController.profileRead);

  return authRouter;
}
module.exports = router;
