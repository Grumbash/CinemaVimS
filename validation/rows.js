const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRowsInputs(data) {
  let errors = {};

  data.showId = !isEmpty(data.showId) ? data.showId : "";
  data.No = !isEmpty(data.No) ? data.No : "";
  data.seats = !isEmpty(data.seats) ? data.seats : "";

  if (Validator.isEmpty(data.showId)) {
    errors.showId = "showId field must not be empty";
  }

  if (!Validator.isMongoId(data.showId)) {
    errors.showId = "showId field must be mongoDB id format";
  }

  if (!Validator.isEmpty(data.seats)) {
    data.seats.forEach(seat => {
      if (!Validator.isMongoId(seat)) {
        errors.seats = "seats field must be mongoDB id format";
      }
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
