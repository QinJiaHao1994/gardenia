import withLocation from "./withLocation";
import withNavigation from "./withNavigation";

const combineHocs =
  (...hocs) =>
  (Component) =>
    hocs.reduceRight((acc, hoc) => hoc(acc), Component);

export { withLocation, withNavigation, combineHocs };
