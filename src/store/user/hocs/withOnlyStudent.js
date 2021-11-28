import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsStudent } from "../userSlice";
import { getDisplayName } from "../../../common/utils";

const withOnlyStudent = (Component) => {
  const WrappedComponent = (props) => {
    const isStudent = useSelector(selectIsStudent);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isStudent) navigate("/");
    }, [isStudent, navigate]);

    return isStudent && <Component {...props} />;
  };

  WrappedComponent.displayName = `withOnlyStudent(${getDisplayName(
    Component
  )})`;
  return WrappedComponent;
};

export default withOnlyStudent;
