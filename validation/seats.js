const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {};

  data.showId = !isEmpty(data.showId) ? data.showId : "";
  data.rows = !isEmpty(data.rows) ? data.rows : "";
  data.rows.No = !isEmpty(data.rows.No) ? data.rows.No : "";
  data.rows.seatsQuantity = !isEmpty(data.rows.seatsQuantity)
    ? data.rows.seatsQuantity
    : "";
  data.rows.seats = !isEmpty(data.rows.seats) ? data.rows.seats : "";
  data.rows.seats.VIP = !isEmpty(data.rows.seats.VIP)
    ? data.rows.seats.VIP
    : "";
  data.rows.seats.price = !isEmpty(data.rows.seats.price)
    ? data.rows.seats.price
    : "";
  data.rows.seats.reserved = !isEmpty(data.rows.seats.reserved)
    ? data.rows.seats.reserved
    : "";

  if (!Validator.isMongoId(data.showId)) {
    errors.showId = "showId field must be mongoDB id format";
  }

  if (Validator.isEmpty(data.showId)) {
    errors.showId = "showId field must not be empty";
  }

  if (Validator.isEmpty(data.rows.No)) {
    errors.rows.No = "Rows number field must not be empty";
  }

  if (!Validator.isInt(data.rows.No)) {
    errors.rows.No = "Rows number field must be integer";
  }

  if (Validator.isEmpty(data.rows.seatsQuantity)) {
    errors.rows.seatsQuantity = "Seats quantity field must not be empty";
  }

  if (!Validator.isInt(data.rows.seatsQuantity)) {
    errors.rows.seatsQuantity = "Seats quantity field must be integer";
  }

  if (!Validator.isBoolean(data.rows.seats.VIP)) {
    errors.rows.seats.VIP = "Seats VIP field must be boolean type";
  }

  if (Validator.isEmpty(data.rows.seats.price)) {
    errors.rows.seats.price = "Seats price field must not be empty";
  }

  if (
    !Validator.isInt(data.rows.seats.price) ||
    !Validator.isFloat(data.rows.seats.price)
  ) {
    errors.rows.seats.price = "Seat price must be number";
  }

  if (!Validator.isBoolean(data.rows.seats.reserved)) {
    errors.rows.seats.reserved = "Seats reserved field must be boolean type";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
