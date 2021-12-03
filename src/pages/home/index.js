import { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Announcement from "../../components/announcement";
import { CourseOverview } from "../../components/course";
import { useSelector, useDispatch } from "react-redux";
import { withIdentity } from "../../store/user/userHoc";
import {
  fetchCoursesAsync,
  selectCourses,
  selectStatus,
  reset,
} from "../../store/course/courseSlice";
import { useTitle } from "../../common/hooks";

const Home = ({ isStudent }) => {
  useTitle("Dashboard");
  const status = useSelector(selectStatus);
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "idle") return;
    dispatch(fetchCoursesAsync());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, status]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <Announcement />
          <CourseOverview courses={courses} readOnly={isStudent} />
        </Grid>
        {/* <Grid item md={4} xs={12}>
          <Timeline />
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default withIdentity(Home);
