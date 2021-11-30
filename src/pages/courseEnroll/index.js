import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { withOnlyTeacher } from "../../store/user/userHoc";
import {
  selectStudents,
  selectStatus,
  selectEnrollIds,
  fetchStudentsAndEnrollIdsAsync,
} from "../../store/student/studentSlice";
import { extractAbbr } from "../../common/utils";
import { useApi } from "../../common/hooks";

const filterOptions = createFilterOptions({
  stringify: ({ firstName, lastName, email }) =>
    `${firstName} ${lastName}(${email})`,
});

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CourseEnroll = () => {
  const [value, setValue] = useState(null);
  const { courseId } = useParams();
  const status = useSelector(selectStatus);
  const students = useSelector(selectStudents);
  const enrollIds = useSelector(selectEnrollIds);
  const dispatch = useDispatch();

  const [{ loading, error, finished }, api] = useApi();

  const handleAdd = () => {
    console.log(value);
  };

  const handleDelete = (id) => () => {
    console.log(id);
  };

  useEffect(() => {
    if (status !== "idle") return;
    dispatch(fetchStudentsAndEnrollIdsAsync(courseId));
  }, [dispatch, status, courseId]);

  const [enrolled, rest] = students.reduce(
    (acc, curr) => {
      if (enrollIds.includes(curr.id)) {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Enroll
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant="h6"
          component="div"
          sx={{ width: 120, minWidth: 120 }}
        >
          Search:
        </Typography>
        <Autocomplete
          value={value}
          onChange={(_, value) => setValue(value)}
          sx={{ width: 400 }}
          size="small"
          options={rest}
          autoHighlight
          getOptionLabel={({ firstName, lastName }) =>
            `${firstName} ${lastName}`
          }
          filterOptions={filterOptions}
          renderOption={(props, student) => (
            <Box component="li" {...props}>
              <Avatar sx={{ mr: 2, flexShrink: 0 }}>
                {extractAbbr(student)}
              </Avatar>
              <Typography variant="body2" component="span" noWrap>
                {`${student.firstName} ${student.lastName}(${student.email})`}
              </Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a student"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        <Button
          disabled={!value}
          variant="contained"
          color="secondary"
          onClick={handleAdd}
        >
          Add
        </Button>
      </Stack>
      <Stack direction="row" sx={{ mt: 3 }} spacing={2} alignItems="flex-start">
        <Typography
          variant="h6"
          component="div"
          sx={{ width: 120, minWidth: 120 }}
        >
          Students:
        </Typography>
        <Paper
          elevation={3}
          component="ul"
          sx={{
            p: 0.5,
            flexGrow: 1,
            minHeight: 400,
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
          }}
        >
          {enrolled.map((student) => (
            <ListItem key={student.id}>
              <Tooltip title={student.email}>
                <Chip
                  color="error"
                  label={`${student.firstName} ${student.lastName}`}
                  variant="outlined"
                  onDelete={handleDelete(student.id)}
                  avatar={<Avatar>{extractAbbr(student)}</Avatar>}
                />
              </Tooltip>
            </ListItem>
          ))}
        </Paper>
      </Stack>
    </Container>
  );
};

export default withOnlyTeacher(CourseEnroll);
