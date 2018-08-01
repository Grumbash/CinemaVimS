const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {};

  data.No = !isEmpty(data.No) ? data.No : "";
  data.VIP = !isEmpty(data.VIP) ? data.VIP : "";

  if (!Validator.isInt(data.No.toString())) {
    errors.No = "No must be an intager";
  }

  if (!Validator.isBoolean(data.VIP.toString())) {
    errors.VIP = "Seats VIP field must be boolean type";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
