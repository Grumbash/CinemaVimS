const Validator = require("validator");
const isEmpty = require("./is-empty");
const validateRowsInputs = require("./rows");

module.exports = function validateFullHall(data) {
  data.No = !isEmpty(data.No) ? data.No : "";
  data.theaterId = !isEmpty(data.theaterId) ? data.theaterId : "";
  data.shows = !isEmpty(data.shows) ? data.shows : "";
  data.rows = !isEmpty(data.rows) ? data.rows : "";

  console.log(data);
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

  // const { errors, isValid } = validateRowsInputs(data.rows);

  return { errors, isValid: isEmpty(errors) };
};
