import { isRegexp, isString, capitalizeFirstLetter } from "../../common/utils";

function parseValidator(config) {
  const rules = [];
  if (config.required) rules.push(checkRequired);
  if (config.max) rules.push(generateCheckMax(config.max));
  if (config.min) rules.push(generateCheckMin(config.min));
  if (config.rules)
    config.rules.forEach((rule) => {
      const { validator, message } = rule;
      if (isRegexp(validator)) {
        rules.push(generateCheckRegexp, message);
      } else {
        rules.push(generateCheckFunction, message);
      }
    });

  return (value, field, values) => {
    let message = "";
    for (const rule of rules) {
      if ((message = rule(value, field, values)) !== "") {
        break;
      }
    }

    return message;
  };
}

const checkRequired = (value, field) => {
  return value !== undefined && value !== null && value !== ""
    ? ""
    : `${capitalizeFirstLetter(field)} is required!`;
};

const generateCheckMax = (limit) => (value, field) => {
  return value && value.length <= limit
    ? ""
    : `${capitalizeFirstLetter(field)}'s max length is ${limit}!`;
};

const generateCheckMin = (limit) => (value, field) => {
  return value && value.length >= limit
    ? ""
    : `${capitalizeFirstLetter(field)}'s min length is ${limit}!`;
};

const generateCheckRegexp = (regex, message) => (value, field) => {
  const bool = regex.test(value);
  if (bool) return "";

  if (isString(message)) {
    return message;
  }

  return message(value, field);
};

const generateCheckFunction =
  (func, message) => async (value, field, values) => {
    const bool = await func(value, field, values);
    if (bool) return "";

    if (isString(message)) {
      return message;
    }

    return message(value, field);
  };

export default parseValidator;
