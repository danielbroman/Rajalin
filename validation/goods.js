const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGoodsInput(data) {
  let errors = {};

  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.weight = !isEmpty(data.weight) ? data.weight : "";
  data.volume = !isEmpty(data.volume) ? data.volume : "";

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
  if (Validator.isEmpty(data.weight)) {
    errors.weight = "Weight field is required";
  }
  if (Validator.isEmpty(data.volume)) {
    errors.volume = "Volume field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
