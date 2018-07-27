const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSeatsInputs(data) {
  let errors = {};

  data.showId = !isEmpty(data.showId) ? data.showId : "";
  data.rows = !isEmpty(data.rows) ? data.rows : "";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
