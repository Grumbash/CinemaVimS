const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateShowInputs(data) {
  let errors = {};

  data.seats = !isEmpty(data.seats) ? data.seats : "";

  if (Validator.isEmpty(data.seats)) {
    errors.seats = "Seats field is required";
  }

  if (!Array.isArray(data.seats)) {
    errors.seats = "Seats type have to be Array";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
