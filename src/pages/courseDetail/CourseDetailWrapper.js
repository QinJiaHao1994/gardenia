import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  setDrawerIndex,
  openDrawer,
  closeDrawer,
} from "../../store/common/commonSlice";
import { useDispatch } from "react-redux";
import { withIdentity } from "../../store/user/userHoc";

const CourseDetailWrapper = ({ isStudent }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStudent) return;
    dispatch(setDrawerIndex(0));
    dispatch(openDrawer());
    return () => {
      dispatch(setDrawerIndex(-1));
      dispatch(closeDrawer(false));
    };
  }, [isStudent, dispatch]);

  return <Outlet />;
};

export default withIdentity(CourseDetailWrapper);
