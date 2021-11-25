export const noop = () => {};

export const isRegexp = (val) =>
  Object.prototype.toString.call(val) === "[object RegExp]";

export const isFunc = (val) =>
  Object.prototype.toString.call(val) === "[object Function]";

export const isString = (val) =>
  Object.prototype.toString.call(val) === "[object String]";

export const capitalizeFirstLetter = (val) =>
  val.replace(/^./, (s) => s.toUpperCase());
