export const noop = () => {};

export const isSameType = (a, b) =>
  Object.prototype.toString.call(a) === Object.prototype.toString.call(b);

export const isDate = (val) =>
  Object.prototype.toString.call(val) === "[object Date]";

export const isRegexp = (val) =>
  Object.prototype.toString.call(val) === "[object RegExp]";

export const isFunc = (val) =>
  Object.prototype.toString.call(val) === "[object Function]" ||
  Object.prototype.toString.call(val) === "[object AsyncFunction]";

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

export const selectApi =
  (api, key) =>
  (...args) =>
    api[key](...args);

export const diff = (after, before) => {
  const keys = new Set([...Object.keys(after), ...Object.keys(before)]);
  const result = [...keys].reduce((acc, key) => {
    if (!equals(after[key], before[key])) {
      acc[key] = after[key];
    }
    return acc;
  }, {});

  return result;
};

// ! Shallow comparison
const equals = (after, before) => {
  const afterisEmpty = after === undefined || after === null;
  const beforeisEmpty = before === undefined || before === null;
  if (afterisEmpty && beforeisEmpty) return true;
  if (afterisEmpty || beforeisEmpty) return false;

  if (!isSameType(after, before)) return false;
  if (isDate(after)) return after.getTime() === before.getTime();
  return after === before;
};

export const cancellablePromise = (promise) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject({ isCanceled, error })
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};

export const delay = (n) => new Promise((resolve) => setTimeout(resolve, n));

export const uuid = (obj) => {
  var temp_url = URL.createObjectURL(obj);
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
};
