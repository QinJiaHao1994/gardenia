import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsTeacher } from "../userSlice";
import { getDisplayName } from "../../../common/utils";

const withOnlyTeacher = (Component) => {
  const WrappedComponent = (props) => {
    const isTeacher = useSelector(selectIsTeacher);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isTeacher) navigate("/");
    }, [isTeacher, navigate]);

    return isTeacher && <Component {...props} />;
  };

  WrappedComponent.displayName = `withOnlyTeacher(${getDisplayName(
    Component
  )})`;
  return WrappedComponent;
};

export default withOnlyTeacher;
