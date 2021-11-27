export const combineHocs =
  (...hocs) =>
  (Component) =>
    hocs.reduceRight((acc, hoc) => hoc(acc), Component);
