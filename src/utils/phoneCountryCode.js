let countryCode = "+20";

export default countryCode;

const validatePhoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export function isValidPhoneNumber(str) {
  return validatePhoneNumberRegex.test(str);
}
