import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Announcement from "../../components/announcement";
import { CourseOverview } from "../../components/course";
import Timeline from "../../components/timeline";

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xl={8}>
          <Announcement />
          <CourseOverview />
        </Grid>
        <Grid item xl={4}>
          <Timeline />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
