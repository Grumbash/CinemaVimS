const Validator = require("validator");
const isEmpty = require("./is-empty");
const notEmpty = require("./mustnt-empty");
const mustBe = require("./must-be");

module.exports = function validateRowsInputs(data) {
  let errors = {};

  data.No = !isEmpty(data.No) ? data.No : "";
  data.hall = !isEmpty(data.hall) ? data.hall : "";

  // if (data.seats) {
  //   data.seats.forEach(seat => {
  //     if (!Validator.isMongoId(seat)) {
  //       errors.seats = mustBe("Seats field", "mongoDB ID format");
  //     }
  //   });
  // }
  if (data instanceof Array) {
    data.forEach(row => {
      if (Validator.isEmpty(row.No.toString())) {
        errors.No = notEmpty("No");
      }

      if (row.No) {
        if (!Validator.isInt(row.No.toString())) {
          errors.No = mustBe("No", "integer");
        }
      }
      if (Validator.isEmpty(row.hall)) {
        errors.hall = notEmpty("Hall field");
      }

      if (!Validator.isMongoId(row.hall)) {
        errors.hall = mustBe("Hall field", "mongoDB ID format");
      }
    });
  } else {
    if (Validator.isEmpty(data.No.toString())) {
      errors.No = notEmpty("No");
    }

    if (data.No) {
      if (!Validator.isInt(data.No.toString())) {
        errors.No = mustBe("No", "integer");
      }
    }
    if (Validator.isEmpty(data.hall)) {
      errors.hall = notEmpty("Hall field");
    }

    if (!Validator.isMongoId(data.hall)) {
      errors.hall = mustBe("Hall field", "mongoDB ID format");
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
