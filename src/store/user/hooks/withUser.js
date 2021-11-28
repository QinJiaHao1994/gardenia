import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";
import { getDisplayName } from "../../../common/utils";

const withUser = (Component) => {
  const WrappedComponent = (props) => {
    const user = useSelector(selectUser);

    return <Component {...props} user={user} />;
  };

  WrappedComponent.displayName = `withUser(${getDisplayName(Component)})`;
  return WrappedComponent;
};

export default withUser;
