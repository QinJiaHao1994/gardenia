import react from "react";
import { connect } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { fetchUserAsync } from "./userSlice";
import { auth } from "./userApi";
import { getDisplayName } from "../../common/utils";

const withUserAuthentication = (Component) => {
  class WrappedComponent extends react.Component {
    componentDidMount() {
      const {
        location: { pathname, search },
        navigate,
        dispatch,
      } = this.props;

      this.unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          const href = pathname + search;
          navigate(`/signin?to=${href}`);
          return;
        }

        const { uid } = user;
        dispatch(fetchUserAsync(uid));
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const { location, navigate, dispatch, ...forwardProps } = this.props;
      return <Component {...forwardProps} />;
    }
  }

  WrappedComponent.displayName = `withUserAuthentication(${getDisplayName(
    Component
  )})`;

  return connect()(WrappedComponent);
};

export default withUserAuthentication;
