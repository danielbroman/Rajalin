const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateContractInput(data) {
  let errors = {};

  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.endDate = !isEmpty(data.endDate) ? data.endDate : "";
  data.startAddress = !isEmpty(data.startAddress) ? data.startAddress : "";
  data.endAddress = !isEmpty(data.endAddress) ? data.endAddress : "";
  data.driverId = !isEmpty(data.driverId) ? data.driverId : "";
  data.additionalInfo = !isEmpty(data.additionalInfo)
    ? data.additionalInfo
    : "";

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "Start date field is required";
  }

  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = "End date field is required";
  }

  if (!Validator.isLength(data.startAddress, { min: 5, max: 100 })) {
    errors.startAddress =
      "Start address has to be between 5 and 100 characters";
  }

  if (Validator.isEmpty(data.startAddress)) {
    errors.startAddress = "Start address is required";
  }

  if (!Validator.isLength(data.endAddress, { min: 5, max: 100 })) {
    errors.endAddress = "End address has to be between 5 and 100 characters";
  }

  if (Validator.isEmpty(data.endAddress)) {
    errors.endAddress = "End address is required";
  }

  if (Validator.isEmpty(data.consignor)) {
    errors.endAddress = "Consignor is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
