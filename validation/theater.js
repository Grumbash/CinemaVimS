const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTheaterInputs(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.id = !isEmpty(data.id) ? data.id : "";

  if (!Validator.isLength(data.name, { min: 2 })) {
    errors.name = "Name needs to be 2 or more characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Theater name is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (!Validator.isMongoId(data.id)) {
    errors.id = "Use the mongoDB id format";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
