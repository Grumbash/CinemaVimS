const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReservationInputs(data) {
  let errors = {};

  data.reserved = !isEmpty(data.reserved) ? data.reserved : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (Validator.isEmpty(data.reserved)) {
    errors.resrved = notEmpty("Resrved field");
  }

  if (!Validator.isBoolean(data.reserved.toString())) {
    errors.reserved = "Seats reserved field must be boolean type";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = notEmpty("From field");
  }

  if (!Validator.isISO8601(data.from)) {
    errors.from = 'Use the ISO8601 format "±YYYYYY-MM-DDTHH:mm:ss.sssZ"';
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = notEmpty("To field");
  }

  if (!Validator.isISO8601(data.to)) {
    errors.to = 'Use the ISO8601 format "±YYYYYY-MM-DDTHH:mm:ss.sssZ"';
  }

  return { errors, isValid: isEmpty(errors) };
};
