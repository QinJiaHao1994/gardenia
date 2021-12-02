import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import courseApi from "../../store/course/courseApi";
import { withIdentity } from "../../store/user/userHoc";
import { addCourse, selectCourseById } from "../../store/course/courseSlice";
import { useFetch } from "../../common/hooks";
import { bindThisToClassApi } from "../../common/utils";

const apiWithThis = bindThisToClassApi(courseApi, "getCourseByid");

const EditCourseAuth = ({ isTeacher }) => {
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ error }, api] = useFetch(apiWithThis);

  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (!courseId || !isTeacher) {
      navigate("/");
      return;
    }

    if (course) return;

    const func = async () => {
      try {
        const course = await api(courseId);
        dispatch(addCourse(course));
      } catch (err) {}
    };
    func();
  }, [navigate, courseId, isTeacher, api, dispatch, course]);

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      {course && <Outlet />}
    </>
  );
};

export default withIdentity(EditCourseAuth);
