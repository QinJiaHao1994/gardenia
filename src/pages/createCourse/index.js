import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateOrEditCourse from "../../components/createOrEditCourse";
import { withOnlyTeacher } from "../../store/user/userHoc";
import { useApi } from "../../common/hooks";
import { selectApi } from "../../common/utils";
import courseApi from "../../store/course/courseApi";
const apiWithThis = selectApi(courseApi, "createCourse");

const CreateCourse = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ loading, error, finished }, api] = useApi(apiWithThis);

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
      await api(data);
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
