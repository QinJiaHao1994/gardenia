import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CourseItem from "./CourseItem";

const CourseList = ({ courses, readOnly }) => {
  const length = courses.length;

  return (
    <Box sx={{ mt: 2 }}>
      <List>
        {courses.map((course, i) => (
          <ListItem key={course.id} sx={styleCourseItem(course, i, length)}>
            <CourseItem course={course} readOnly={readOnly} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const styleCourseItem = (course, i, length) => {
  const isFirst = i === 0;
  const isLast = i === length - 1;

  const sx = {
    p: 2,
    border: 1,
    borderColor: "divider",
    justifyContent: "space-between",
  };

  if (isFirst) {
    sx.borderTopLeftRadius = 3;
    sx.borderTopRightRadius = 3;
  }

  if (isLast) {
    sx.borderBottomLeftRadius = 3;
    sx.borderBottomRightRadius = 3;
  }

  if (!isLast) {
    sx.borderBottom = 0;
  }

  return sx;
};

export default CourseList;
