import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScienceIcon from "@mui/icons-material/Science";
import SpeedDial from "../../components/speedDial";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { withIdentity } from "../../store/user/userHoc";
import { selectCourseById } from "../../store/course/courseSlice";

import {
  Summary,
  Lectures,
  Quizzes,
  Labs,
} from "../../components/courseDetail";

const CourseDetail = ({ isStudent }) => {
  const { courseId } = useParams();
  const [tab, setTab] = useState("1");
  const course = useSelector((state) => selectCourseById(state, courseId));
  const handleTabChange = (_, val) => setTab(val);

  const actions = [
    {
      key: 2,
      label: "Quiz",
      icon: <QuizIcon />,
      onClick: () => {},
    },
    {
      key: 1,
      label: "Lab",
      icon: <ScienceIcon />,
      onClick: () => {},
    },
    {
      key: 0,
      label: "Lecture",
      icon: <FileCopyIcon />,
      onClick: () => {},
    },
  ];

  const { year, semester, code, name, summary } = course;
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1">
          {code}-{name}
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary">
          {year}-{year + 1} Semester{semester}
        </Typography>
        <Summary content={summary} readonly={isStudent} />
      </Box>
      <TabContext value={tab}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", mt: 3, ml: 2, mr: 2 }}
        >
          <TabList onChange={handleTabChange} aria-label="Course Tabs">
            <Tab label="Lectures" value="1" />
            <Tab label="Labs" value="2" />
            <Tab label="Quizzes" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Lectures />
        </TabPanel>
        <TabPanel value="2">
          <Labs />
        </TabPanel>
        <TabPanel value="3">
          <Quizzes />
        </TabPanel>
      </TabContext>
      <SpeedDial
        actions={actions}
        FabProps={{
          color: "secondary",
        }}
      />
    </Container>
  );
};

export default withIdentity(CourseDetail);
