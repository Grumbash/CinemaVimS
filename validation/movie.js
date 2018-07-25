const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMovieInputs(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";

  if (!Validator.isLength(data.title, { min: 2 })) {
    errors.title = "Title needs to be 2 or more characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Film title is required";
  }

  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is required";
  }

  if (!Validator.isInt(data.duration, { min: 60 })) {
    errors.duration = "Duration have to be 1 minute or more";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
