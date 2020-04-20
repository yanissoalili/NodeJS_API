/* eslint-disable no-underscore-dangle */
const express = require('express');
const jwtHelper = require('../config/JWTHelper');

const dinosaureRouter = express.Router();
const dinosaureController = require('../controllers/dinosaureController');
const dinosaureFriendsController = require('../controllers/dinosaureFriendsController');


function routes(DinosaureModel) {

  const controller = dinosaureController(DinosaureModel);
  const FriendsController = dinosaureFriendsController(DinosaureModel);

  dinosaureRouter.route('/dinosaures')
    .post(controller.post)
    .get(controller.get);
  //
  dinosaureRouter.use('/dinosaures/:dinosaureId', (req, res, next) => {


    DinosaureModel.findById(req.params.dinosaureId, (err, dinosaure) => {
      if (err) {
        return res.send(err);
      }


      if (dinosaure) {
        req.dinosaure = dinosaure;

        return next();
      }
      return res.sendStatus(404);
    });
  });
  dinosaureRouter.route('/dinosaures/:dinosaureId')
    .put(controller.put)

    .get((req, res) => {
      const { dinosaure } = req;
      return res.json(dinosaure);
    })
    .patch(controller.patch)
    .delete(controller.deleteD);


  dinosaureRouter.route('/dinosaureFriends/:dinosaureId')

    .get(jwtHelper.verifyJwtToken, FriendsController.getFriends);


  return dinosaureRouter;
}
module.exports = routes;
