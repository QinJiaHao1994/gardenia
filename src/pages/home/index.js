import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Announcement from "../../components/announcement";
import { CourseOverview } from "../../components/course";
import Timeline from "../../components/timeline";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import { withIdentity } from "../../store/user/userHoc";
import {
  fetchCoursesAsync,
  selectCourses,
} from "../../store/course/courseSlice";

const Home = ({ isStudent }) => {
  const user = useSelector(selectUser);
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!user) return;
    const { id, role } = user;
    const data = {
      id,
      role,
    };
    dispatch(fetchCoursesAsync(data));
  }, [dispatch, user]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xl={8}>
          <Announcement />
          <CourseOverview courses={courses} readOnly={isStudent} />
        </Grid>
        <Grid item xl={4}>
          <Timeline />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withIdentity(Home);
