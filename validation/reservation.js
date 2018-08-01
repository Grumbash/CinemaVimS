const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {};

  data.price = !isEmpty(data.price) ? data.price : "";
  data.reserved = !isEmpty(data.reserved) ? data.reserved : "";
  data.show = !isEmpty(data.show) ? data.show : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.user = !isEmpty(data.user) ? data.user : "";

  if (Validator.isEmpty(data.price.toString())) {
    errors.price = "Seats price field must not be empty";
  }

  if (
    !Validator.isInt(data.price.toString()) ||
    !Validator.isFloat(data.price.toString())
  ) {
    errors.price = "Seat price must be number";
  }

  if (!Validator.isBoolean(data.reserved.toString())) {
    errors.reserved = "Seats reserved field must be boolean type";
  }

  if (Validator.isEmpty(data.show)) {
    errors.show = "Show field must not be empty";
  }

  if (!Validator.isMongoId(data.show)) {
    errors.show = "Show field must be mongoDB ID type";
  }

  if (Validator.isEmpty(data.user)) {
    errors.user = "User field must not be empty";
  }

  if (!Validator.isMongoId(data.user)) {
    errors.user = "User field must be mongoDB ID type";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field must not be empty";
  }

  if (!Validator.isISO8601(data.from)) {
    errors.from = 'Use the ISO8601 format "±YYYYYY-MM-DDTHH:mm:ss.sssZ"';
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = "To field must not be empty";
  }

  if (!Validator.isISO8601(data.to)) {
    errors.to = 'Use the ISO8601 format "±YYYYYY-MM-DDTHH:mm:ss.sssZ"';
  }
};
