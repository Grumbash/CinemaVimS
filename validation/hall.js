const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateHallInputs(data) {
  let errors = {};

  data.No = !isEmpty(data.No) ? data.No : "";
  data.theaterId = !isEmpty(data.theaterId) ? data.theaterId : "";
  data.showId = !isEmpty(data.showId) ? data.showId : "";

  if (Validator.isEmpty(data.No)) {
    errors.No = "Seats field is required";
  }

  if (!Validator.isInt(data.No)) {
    errors.No = "Seats type have to be a integer";
  }

  if (!Validator.isMongoId(data.theaterId)) {
    errors.theaterId = "Use the mongogoDB id format";
  }

  if (!Validator.isMongoId(data.showId) && !isEmpty(data.showId)) {
    errors.showId = "Use the mongogoDB id format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
