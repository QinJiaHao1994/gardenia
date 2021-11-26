import { useNavigate } from "react-router-dom";
import { getDisplayName } from "../utils";

const withNavigation = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };

  WrappedComponent.displayName = `withNavigation(${getDisplayName(Component)})`;

  return WrappedComponent;
};

export default withNavigation;
