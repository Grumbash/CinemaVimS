const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {};

  data.rowId = !isEmpty(data.rowId) ? data.rowId : "";
  data.No = !isEmpty(data.No) ? data.No : "";
  data.VIP = !isEmpty(data.VIP) ? data.VIP : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.reserved = !isEmpty(data.reserved) ? data.reserved : "";

  if (!Validator.isMongoId(data.rowId)) {
    errors.rowId = "RowId field must be mongoDB id type";
  }

  if (!Validator.isInt(data.No.toString())) {
    errors.No = "No must be an intager";
  }

  if (!Validator.isBoolean(data.VIP.toString())) {
    errors.VIP = "Seats VIP field must be boolean type";
  }

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
