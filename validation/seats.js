const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {};

  data.No = !isEmpty(data.No) ? data.No : "";
  data.VIP = !isEmpty(data.VIP) ? data.VIP : "";

  if (data instanceof Array) {
    data.forEach(elem => {
      if (!Validator.isInt(elem.No.toString())) {
        errors.No = "No must be an intager";
      }

      if (!Validator.isBoolean(elem.VIP.toString())) {
        errors.VIP = "Seats VIP field must be boolean type";
      }
    });
  } else {
    if (!Validator.isInt(data.No.toString())) {
      errors.No = "No must be an intager";
    }

    if (!Validator.isBoolean(data.VIP.toString())) {
      errors.VIP = "Seats VIP field must be boolean type";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
