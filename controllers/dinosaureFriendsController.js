function dinosaureFriendsController(DinosaureModel) {

  function getFriends(req, res) {
    const { dinosaureId } = req.params;

    DinosaureModel
      .findOne({ _id: dinosaureId }, 'friends')
      .populate('friends', '-hash -salt ')
      .exec((err, dinoList) => {
        if (err) {
          return res.status(400);
        }

        return res.status(200).json({ status: true, listFriend: dinoList });
      });
  }

  return {
    getFriends,
  };
}
module.exports = dinosaureFriendsController;
