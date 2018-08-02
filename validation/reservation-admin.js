const Validator = require("validator");
const isEmpty = require("./is-empty");
const notEmpty = require("./mustnt-empty");

module.exports = function validateReservationInputsAdmin(data) {
  let errors = {};

  data.price = !isEmpty(data.price) ? data.price : "";
  data.reserved = !isEmpty(data.reserved) ? data.reserved : "";
  data.show = !isEmpty(data.show) ? data.show : "";

  if (Validator.isEmpty(data.price)) {
    errors.price = notEmpty("Price field");
  }

  if (!Validator.isInt(data.price.toString())) {
    if (!Validator.isFloat(data.price.toString())) {
      errors.price = "Seat price must be a number";
    }
  }

  if (Validator.isEmpty(data.reserved)) {
    errors.reserved = notEmpty("Reserved field");
  }

  if (!Validator.isBoolean(data.reserved.toString())) {
    errors.reserved = "Seats reserved field must be boolean type";
  }

  if (Validator.isEmpty(data.show)) {
    errors.show = notEmpty("Show field");
  }

  if (!Validator.isMongoId(data.show.toString())) {
    errors.show = "Show field must be mongoDB ID type";
  }

  return { errors, isValid: isEmpty(errors) };
};
