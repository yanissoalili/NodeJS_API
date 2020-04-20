/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */

function dinosaurecontroller(DinosaureModel) {
  function post(req, res) {

    if (!req.body.username || !req.body.password) {
      
      res.status(400);
      return res.send('username or password is required');
    }
    const dinosaure = new DinosaureModel();
    dinosaure.username = req.body.username;
    dinosaure.famille = req.body.famille;
    dinosaure.age = req.body.age;
    dinosaure.race = req.body.race;
    dinosaure.nourriture = req.body.nourriture;
    dinosaure.friends = [];
    dinosaure.setPassword(req.body.password);
    dinosaure.save();
    res.status(201);
    return res.json(dinosaure);
  }
  function get(req, res) {
    console.log('helooooo');
    const query = {};
    if (req.query.username) {
      query.username = req.query.username;
    }
    DinosaureModel.find(query, (err, dinosaure) => {
      if (err) {
        return res.send(err);
      }
      return res.json(dinosaure);
    });
  }
  function deleteD(req, res) {
    req.dinosaure.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }
  function patch(req, res) {
    const { dinosaure } = req;
    if (req.body._id) {
      delete req.dinosaure._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      dinosaure[key] = value;
      req.dinosaure.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(dinosaure);
      });
    });
  }
  function put(req, res) {
    const { dinosaure } = req;
    dinosaure.username = req.body.username;
    dinosaure.password = req.body.password;
    dinosaure.age = req.body.age;
    dinosaure.famille = req.body.famille;
    dinosaure.nourriture = req.body.nourriture;
    req.dinosaure.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(dinosaure);
    });
  }
  return {
    post,
    get,
    deleteD,
    patch,
    put
  };
}
module.exports = dinosaurecontroller;
