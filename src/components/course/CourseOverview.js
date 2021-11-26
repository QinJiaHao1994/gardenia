import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CourseList from "./CourseList";

const CourseOverview = () => {
  return (
    <Paper
      sx={{
        mt: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="p" variant="h6" color="inherit" noWrap>
        Course Overview
      </Typography>
      <Box>过滤器</Box>
      <CourseList />
    </Paper>
  );
};

export default CourseOverview;
