import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import courseApi from "../../store/course/courseApi";
import { withIdentity } from "../../store/user/userHoc";
import { setCourse } from "../../store/course/courseSlice";
import { useApi } from "../../common/hooks";
import { selectApi } from "../../common/utils";

const apiWithThis = selectApi(courseApi, "getCourseByid");

const EditCourseAuth = ({ isTeacher }) => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ finished, error }, api] = useApi(apiWithThis);

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
    }

    const func = async () => {
      try {
        const course = await api(courseId);
        dispatch(setCourse(course));
      } catch (err) {}
    };
    func();
  }, [navigate, courseId, isTeacher, api, dispatch]);

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
      {finished && !error && <Outlet />}
    </>
  );
};

export default withIdentity(EditCourseAuth);
