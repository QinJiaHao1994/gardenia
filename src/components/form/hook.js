import { useState } from "react";

const useFormControls = ({
  defaultValues,
  keyOfValues,
  triggers,
  validators,
  others,
}) => {
  const [modified, setModified] = useState(false);
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

  const handleValueChange = async (name, value, transform = (val) => val) => {
    // this function will be triggered by the text field's onBlur and onChange events
    const fieldValues = { [name]: transform(value) };

    const newValues = {
      ...values,
      ...fieldValues,
    };

    if (!modified) {
      setModified(true);
    }

    setValues(newValues);
    validate(newValues, fieldValues);
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
    const keyOfValue = keyOfValues[field];

    const { transform, ...other } = others[field];

    acc[field] = {
      ...other,
      [keyOfValue]: values[field],
      error: !!errors[field],
      helperText: errors[field],
    };

    triggers[field].forEach((trigger) => {
      acc[field][trigger] = (e) =>
        handleValueChange(e.target.name, e.target[keyOfValue], transform);
    });

    return acc;
  }, {});

  return { props, validateForm, setValues, modified };
};

export default useFormControls;
