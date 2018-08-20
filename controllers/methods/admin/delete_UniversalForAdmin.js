module.exports = DELETEa = (req, res, data) => {
  //Check Permission
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }

  //DONT FORGET RENAME ALL IDs IN POSTMAN
  data.Model.findById(req.params.id)
    .where({ showId: req.params.show_id })
    .then(row => {
      if (row) {
        data.Model.findByIdAndRemove(req.params.id)
          .then(() => res.json({ success: true }))
          .catch(err => res.json(err));
      }
    });
};
