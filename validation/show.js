const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateShowInputs(data) {
  let errors = {};

  data.hallId = !isEmpty(data.hallId) ? data.hallId : "";
  data.movieId = !isEmpty(data.movieId) ? data.movieId : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  if (!Validator.isMongoId(data.hallId)) {
    errors.hallId = "Hall ID must be mongoDB ID format";
  }

  if (!Validator.isMongoId(data.movieId)) {
    errors.movieId = "Movie ID must be mongoDB ID format";
  }

  if (!Validator.isISO8601(data.date)) {
    errors.date = 'Use the ISO8601 format "±YYYYYY-MM-DDTHH:mm:ss.sssZ"';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
