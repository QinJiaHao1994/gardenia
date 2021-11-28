import react from "react";
import { connect } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserAsync, selectStatus, selectUser } from "../userSlice";
import { auth } from "../../../app/firebase";
import { getDisplayName } from "../../../common/utils";
import { withLocation, withNavigation, compose } from "../../../common/hocs";

const mapStateToProps = (state) => ({
  user: selectUser(state),
  status: selectStatus(state),
});

const withUserAuthentication = (Component) => {
  class WrappedComponent extends react.Component {
    componentDidMount() {
      const { dispatch } = this.props;
      this.unsubscribe = onAuthStateChanged(auth, async (user) => {
        dispatch(fetchUserAsync(user));
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.status === "loading" && this.props.status === "failed") {
        this.redirect();
      }
    }

    redirect() {
      const {
        location: { pathname, search },
        navigate,
      } = this.props;

      const href = pathname + search;
      navigate(`/signin?to=${href}`);
    }

    render() {
      const { user, location, navigate, dispatch, status, ...forwardProps } =
        this.props;
      return user && <Component {...forwardProps} />;
    }
  }

  WrappedComponent.displayName = `withUserAuthentication(${getDisplayName(
    Component
  )})`;

  return connect(mapStateToProps)(WrappedComponent);
};

export default compose(withLocation, withNavigation, withUserAuthentication);
