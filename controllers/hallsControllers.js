// Hall Model
const Hall = require("../models/Hall");
const validateFullHall = require("../validation/fullHall");

exports.getHallsController = (req, res, next) => {
  Hall.find()
    .populate("theaterId")
    .then(elems => res.json(elems));
};

exports.postHallsController = (req, res) => {
  const { body, user } = req;

  if (!user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  const fields = Object.assign({}, body);

  const { errors, isValid } = validateFullHall(fields);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  if (fields.id || fields._id) {
    let id = fields.id || fields._id;
    Hall.findByIdAndUpdate({ _id: id }, { $set: fields }, { new: true })
      .then(hall => res.json(hall))
      .catch(err => res.json(err));
  } else {
    new Hall(fields)
      .save()
      .then(hall => res.json(hall))
      .catch(err => res.json(err));
  }
};
