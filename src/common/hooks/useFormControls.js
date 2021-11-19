import { useState } from "react";
import { isRegexp, isString } from "../utils";

const useFormControls = ({ defaultValues, triggers, validators, others }) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  // this function will check if the form values are valid
  const validate = async (values, fieldValues = values) => {
    const results = {};
    const funcs = Object.keys(fieldValues).map((field) =>
      (async () => {
        results[field] = await validators[field](
          fieldValues[field],
          field,
          values
        );
      })()
    );

    await Promise.all(funcs);

    const newErrors = {
      ...errors,
      ...results,
    };

    setErrors(newErrors);

    return newErrors;
  };

  const handleInputValue = (e) => {
    // this function will be triggered by the text field's onBlur and onChange events
    const { name, value } = e.target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);

    validate(newValues, { [name]: value });
  };

  // this function will be triggered by the submit event
  const validateForm = async () => {
    const errors = await validate(values);
    const isValid = Object.values(errors).every((error) => !error);
    if (isValid) {
      return values;
    }

    throw errors;
  };

  const props = Object.keys(values).reduce((acc, field) => {
    acc[field] = {
      ...others[field],
      value: values[field],
      error: !!errors[field],
      helperText: errors[field],
    };

    triggers[field].forEach((trigger) => {
      acc[field][trigger] = handleInputValue;
    });

    return acc;
  }, {});

  return { props, validateForm };
};

export const createForm = (configs) => {
  const validators = {};
  const defaultValues = {};
  const triggers = {};
  const others = {};

  configs.forEach((config) => {
    const { field, defaultValue = "", label } = config;
    let { trigger } = config;

    defaultValues[field] = defaultValue;
    validators[field] = parseValidator(config);
    others[field] = {
      id: field,
      name: field,
      label: label || field,
    };

    if (!trigger) trigger = ["change"];
    if (isString(trigger)) trigger = [trigger];

    triggers[field] = trigger.map(
      (t) => `on${t.replace(/^./, (s) => s.toUpperCase())}`
    );
  });

  return {
    defaultValues,
    triggers,
    validators,
    others,
  };
};

const checkRequired = (value, field) => {
  return value !== undefined && value !== null && value !== ""
    ? ""
    : `${field} must be required!`;
};

const generateCheckMax = (limit) => (value, field) => {
  return value && value.length <= limit
    ? ""
    : `${field}'s max length is ${limit}!`;
};

const generateCheckMin = (limit) => (value, field) => {
  return value && value.length >= limit
    ? ""
    : `${field}'s min length is ${limit}!`;
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

export default useFormControls;
