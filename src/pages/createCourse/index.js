import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CreateOrEditCourse from "../../components/createOrEditCourse";
import { withOnlyTeacher } from "../../store/user/userHoc";
import { useFetch } from "../../common/hooks";
import { bindThisToClassApi } from "../../common/utils";
import courseApi from "../../store/course/courseApi";
import { addCourse } from "../../store/course/courseSlice";
const apiWithThis = bindThisToClassApi(courseApi, "createCourse");

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ loading, error, finished }, api] = useFetch(apiWithThis);

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

  const handleSumbit = async (data) => {
    try {
      const courseData = await api(data);
      dispatch(addCourse(courseData));
    } catch (error) {}
  };

  return (
    <CreateOrEditCourse
      title="Create Course"
      loading={loading}
      onCancel={handleCancel}
      onSubmit={handleSumbit}
      alertOpen={open}
      alertType={error ? "error" : "success"}
      alertText={error ? error : "Create success!"}
      onAlertClose={handleClose}
    />
  );
};

export default withOnlyTeacher(CreateCourse);
