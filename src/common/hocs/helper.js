export const compose =
  (...hocs) =>
  (Component) =>
    hocs.reduceRight((acc, hoc) => hoc(acc), Component);
