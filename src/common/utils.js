export const noop = () => {};

export const isRegexp = (val) =>
  Object.prototype.toString.call(val) === "[object RegExp]";

export const isFunc = (val) =>
  Object.prototype.toString.call(val) === "[object Function]";

export const isString = (val) =>
  Object.prototype.toString.call(val) === "[object String]";

export const capitalizeFirstLetter = (val) =>
  val.replace(/^./, (s) => s.toUpperCase());

export const collectIdsAndDocs = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

export const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const SnakeCaseTocamel = (str) =>
  str.replace(/_[a-z]/g, (letter) => letter[1].toUpperCase());

export const toDatabase = (data) => {
  const convertedData = {};
  Object.keys(data).forEach((key) => {
    convertedData[camelToSnakeCase(key)] = data[key];
  });
  return convertedData;
};

export const fromDatabase = (data) => {
  const convertedData = {};
  Object.keys(data).forEach((key) => {
    convertedData[SnakeCaseTocamel(key)] = data[key];
  });
  return convertedData;
};

export const extractAbbr = (user) => {
  if (!user) return "";
  const { firstName = "", lastName = "" } = user;
  const f = firstName[0] || "";
  const l = lastName[0] || "";
  return f + l;
};

class Storage {
  get(key) {
    const value = localStorage.getItem(key);
    if (!value) {
      return value;
    }

    return JSON.parse(value);
  }

  set(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

export const storage = new Storage();
