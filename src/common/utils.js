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
