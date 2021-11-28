import { useSelector } from "react-redux";
import { selectIsTeacher, selectIsStudent } from "../userSlice";
import { getDisplayName } from "../../../common/utils";

const withIdentity = (Component) => {
  const WrappedComponent = (props) => {
    const isTeacher = useSelector(selectIsTeacher);
    const isStudent = useSelector(selectIsStudent);
    return <Component {...props} isTeacher={isTeacher} isStudent={isStudent} />;
  };

  WrappedComponent.displayName = `withIdentity(${getDisplayName(Component)})`;
  return WrappedComponent;
};

export default withIdentity;
