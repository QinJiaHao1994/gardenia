import { isString, capitalizeFirstLetter } from "../../common/utils";
import parseValidator from "./validator";

const createForm = (configs) => {
  const validators = {};
  const defaultValues = {};
  const keyOfValues = {};
  const triggers = {};
  const others = {};

  configs.forEach((config) => {
    const {
      field,
      defaultValue = "",
      label,
      required,
      keyOfValue = "value",
      transform,
    } = config;

    let { trigger } = config;
    keyOfValues[field] = keyOfValue;
    defaultValues[field] = defaultValue;
    validators[field] = parseValidator(config);
    others[field] = {
      transform,
      required: !!required,
      id: field,
      name: field,
      label: label || field,
    };

    if (!trigger) trigger = ["change"];
    if (isString(trigger)) trigger = [trigger];

    triggers[field] = trigger.map((t) => `on${capitalizeFirstLetter(t)}`);
  });

  return {
    defaultValues,
    keyOfValues,
    triggers,
    validators,
    others,
  };
};

export default createForm;
