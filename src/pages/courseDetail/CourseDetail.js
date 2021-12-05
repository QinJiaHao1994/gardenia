import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScienceIcon from "@mui/icons-material/Science";
import SpeedDial from "../../components/speedDial";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { withIdentity } from "../../store/user/userHoc";
import { selectCourseById, setCourse } from "../../store/course/courseSlice";
import courseApi from "../../store/course/courseApi";
import { getFilesByCourseId } from "../../store/drive/driveApi";
import { Summary, CreateDialog } from "../../components/courseDetail";
import { useRequest } from "../../common/hooks";
import { getFileDownloadURL } from "../../store/drive/driveApi";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

const sortByDate = (x, y) => x.release_date - y.release_date;

const CourseDetail = ({ isStudent, isTeacher }) => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [tab, setTab] = useState("1");
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("lecture");
  const [request] = useRequest(getFilesByCourseId);
  const course = useSelector((state) => selectCourseById(state, courseId));
  const handleTabChange = (_, val) => setTab(val);

  useEffect(() => {
    const func = async () => {
      try {
        const files = await request(courseId);
        setFiles(files);
      } catch (error) {}
    };
    func();
  }, [courseId, request]);

  const handleSaveSummary = async (value) => {
    const data = { summary: value };

    await courseApi.updateCourse(courseId, data);
    dispatch(
      setCourse({
        id: courseId,
        diffData: data,
      })
    );
  };

  const handleCreate = async (form, cb) => {
    const key = `${action}s`;
    let value = course[key] || [];
    const data = {
      [key]: [...value, form],
    };
    await courseApi.updateCourse(courseId, data);
    dispatch(
      setCourse({
        id: courseId,
        diffData: data,
      })
    );
    cb();
  };

  const handleOpen = async ({ preview, fileUrl, fileId, release_date }) => {
    if (release_date > Date.now()) return;
    if (preview) {
      window.open(`/preview/${fileId}`, "_blank");
      return;
    }
    try {
      const url = await getFileDownloadURL(fileUrl);
      window.open(url, "_blank");
    } catch (err) {}
  };

  const actions = [
    {
      key: 1,
      label: "Lab",
      icon: <ScienceIcon />,
      onClick: () => {
        setAction("lab");
        setOpen(true);
      },
    },
    {
      key: 0,
      label: "Lecture",
      icon: <FileCopyIcon />,
      onClick: () => {
        setAction("lecture");
        setOpen(true);
      },
    },
  ];

  let {
    year,
    semester,
    code,
    name,
    summary,
    lectures = [],
    labs = [],
  } = course;

  lectures = [...lectures];
  labs = [...labs];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1">
          {code}-{name}
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary">
          {year}-{year + 1} Semester{semester}
        </Typography>
        <Summary
          content={summary}
          readonly={isStudent}
          onSave={handleSaveSummary}
        />
      </Box>
      <TabContext value={tab}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", mt: 3, ml: 2, mr: 2 }}
        >
          <TabList onChange={handleTabChange} aria-label="Course Tabs">
            <Tab label="Lectures" value="1" />
            <Tab label="Labs" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={4}>
            {lectures.sort(sortByDate).map((lecture, index) => (
              <Grid item xs={3} key={index}>
                <Card sx={{ p: 2 }}>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                  >
                    {lecture.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={
                      lecture.release_date > Date.now() ? "grey.800" : "primary"
                    }
                    sx={{
                      cursor:
                        lecture.release_date > Date.now()
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={() => handleOpen(lecture)}
                  >
                    [Link]
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={4}>
            {labs.sort(sortByDate).map((lab, index) => (
              <Grid item xs={3} key={index}>
                <Card sx={{ p: 2 }}>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    color="inherit"
                    noWrap
                  >
                    {lab.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={
                      lab.release_date > Date.now() ? "grey.800" : "primary"
                    }
                    sx={{
                      cursor:
                        lab.release_date > Date.now()
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={() => handleOpen(lab)}
                  >
                    [Link]
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </TabContext>
      {isTeacher && (
        <SpeedDial
          actions={actions}
          FabProps={{
            color: "secondary",
          }}
        />
      )}

      <CreateDialog
        open={open}
        title={action === "lecture" ? "Create Lecture" : "Create Lab"}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
        files={files}
      ></CreateDialog>
    </Container>
  );
};

export default withIdentity(CourseDetail);
