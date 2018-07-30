const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {
    rows: {
      seats: {}
    }
  };
  // console.log(data.rows[0].seats[0]);

  data.showId = !isEmpty(data.showId) ? data.showId : "";
  data.rows = !isEmpty(data.rows) ? data.rows : "";

  if (Validator.isEmpty(data.showId)) {
    errors.showId = "showId field must not be empty";
  }

  if (!Validator.isMongoId(data.showId)) {
    errors.showId = "showId field must be mongoDB id format";
  }

  data.rows.forEach(row => {
    row.No = !isEmpty(row.No) ? row.No.toString() : "";
    row.seatsQuantity = !isEmpty(row.seatsQuantity)
      ? row.seatsQuantity.toString()
      : "";

    if (Validator.isEmpty(row.No)) {
      errors.row.No = "Rows number field must not be empty";
    }

    if (!Validator.isInt(row.No)) {
      errors.row.No = "Rows number field must be integer";
    }

    if (Validator.isEmpty(row.seatsQuantity)) {
      errors.row.seatsQuantity = "Seats quantity field must not be empty";
    }

    if (!Validator.isInt(row.seatsQuantity)) {
      errors.row.seatsQuantity = "Seats quantity field must be integer";
    }

    row.seats.forEach(seat => {
      seat = !isEmpty(seat) ? seat : "";
      seat.VIP = !isEmpty(seat.VIP) ? seat.VIP.toString() : "";
      seat.price = !isEmpty(seat.price) ? seat.price.toString() : "";
      seat.reserved = !isEmpty(seat.reserved) ? seat.reserved.toString() : "";

      if (!Validator.isBoolean(seat.VIP)) {
        errors.rows.seats.VIP = "Seats VIP field must be boolean type";
      }

      if (Validator.isEmpty(seat.price)) {
        errors.rows.seats.price = "Seats price field must not be empty";
      }

      if (!Validator.isInt(seat.price) || !Validator.isFloat(seat.price)) {
        errors.rows.seats.price = "Seat price must be number";
      }

      if (!Validator.isBoolean(seat.reserved)) {
        errors.rows.seats.reserved =
          "Seats reserved field must be boolean type";
      }
    });
  });

  // Fix the crooked nail with not empty object errors
  return {
    errors,
    isValid: isEmpty(errors.rows.seats)
  };
};
