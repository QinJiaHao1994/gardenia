import { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CourseList from "./CourseList";
import { createFilters } from "./utils";
import Link from "../../components/link";

const CourseOverview = ({ courses, readOnly }) => {
  const [index, setIndex] = useState(0);
  const handleChange = (e) => setIndex(e.target.value);
  const filters = useMemo(() => createFilters(courses), [courses]);
  const filteredCourses = courses
    .filter(filters[index].predict)
    .sort((a, b) => a.code.localeCompare(b.code));

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
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl size="small">
          <Select value={index} onChange={handleChange} autoWidth>
            {filters.map((filter, index) => [
              <MenuItem value={index}>{filter.label}</MenuItem>,
              filter.hasDivider ? <Divider /> : null,
            ])}
          </Select>
        </FormControl>
        {!readOnly && (
          <Link to="/create-course" underline="none">
            <Button variant="contained">Create Course</Button>
          </Link>
        )}
      </Box>
      <CourseList courses={filteredCourses} readOnly={readOnly} />
    </Paper>
  );
};

export default CourseOverview;
