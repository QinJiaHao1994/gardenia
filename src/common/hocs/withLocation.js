import { useLocation } from "react-router-dom";
import { getDisplayName } from "../utils";

const withLocation = (Component) => {
  const WrappedComponent = (props) => {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };

  WrappedComponent.displayName = `withLocation(${getDisplayName(Component)})`;

  return WrappedComponent;
};

export default withLocation;
