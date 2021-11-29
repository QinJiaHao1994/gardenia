import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Link from "../../components/link";

const CourseItem = ({ course, readOnly }) => {
  const { code, name, year, semester, id } = course;
  return (
    <>
      <Link to={`course/${id}`} underline="none">
        <Typography component="p" variant="h6" color="grey.800">
          {`${code}-${name} ${year}-${year + 1}:Semester${semester}`}
        </Typography>
      </Link>
      {!readOnly && (
        <Link to={`edit-course/${id}`} underline="none">
          <IconButton color="primary">
            <EditIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Link>
      )}
    </>
  );
};

export default CourseItem;
