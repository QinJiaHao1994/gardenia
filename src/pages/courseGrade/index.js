import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { withOnlyTeacher } from "../../store/user/userHoc";

const CourseGrade = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>CourseGrade</Box>
    </Container>
  );
};

export default withOnlyTeacher(CourseGrade);
