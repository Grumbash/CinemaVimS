// Hall Model
const Hall = require("../models/Hall");

exports.getHallsController = (req, res, next) => {
  Hall.find()
    .populate("theaterId")
    .then(elems => res.json(elems));
};
