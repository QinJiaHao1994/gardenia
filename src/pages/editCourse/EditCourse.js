import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CreateOrEditCourse from "../../components/createOrEditCourse";
import { selectCourseById, setCourse } from "../../store/course/courseSlice";
import { useApi } from "../../common/hooks";
import { selectApi, diff } from "../../common/utils";
import courseApi from "../../store/course/courseApi";
const apiWithThis = selectApi(courseApi, "updateCourse");

const EditCourse = () => {
  const { courseId } = useParams();
  const course = useSelector((state) => selectCourseById(state, courseId));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [{ loading, error, finished }, api] = useApi(apiWithThis);

  const { id, teacherId, ...other } = course;
  const initialValues = {
    ...other,
    startDate: new Date(other.startDate),
    endDate: new Date(other.endDate),
  };

  useEffect(() => {
    if (!finished) return;
    setOpen(true);
  }, [finished]);

  const handleClose = () => {
    setOpen(false);
    if (!error) {
      navigate("/");
    }
  };

  const handleCancel = () => navigate("/");

  const handleSumbit = async (data, modified) => {
    if (!modified) {
      navigate("/");
      return;
    }
    try {
      const diffData = diff(data, initialValues);
      await api(id, diffData);
      dispatch(setCourse({ id, diffData }));
    } catch (error) {}
  };

  return (
    <CreateOrEditCourse
      title="Edit Course"
      loading={loading}
      initialValues={initialValues}
      onCancel={handleCancel}
      onSubmit={handleSumbit}
      alertOpen={open}
      alertType={error ? "error" : "success"}
      alertText={error ? error : "Edit success!"}
      onAlertClose={handleClose}
    />
  );
};

export default EditCourse;
