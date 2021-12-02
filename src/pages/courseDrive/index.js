/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import IconButton from "@mui/material/IconButton";
// import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
// import ViewListIcon from "@mui/icons-material/ViewList";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import {
  selectStatus,
  fetchDriveAsync,
  selectFileDict,
  selectDefaultPath,
  rename,
} from "../../store/drive/driveSlice";
import { setLayout } from "../../store/common/commonSlice";
import { FileWrapper } from "../../components/file";
import SpeedDial from "../../components/speedDial";
import { withNotify } from "../../common/hocs";
import { useRequest } from "../../common/hooks";
import { renameFileOrFolder } from "../../store/drive/driveApi";
import { parsePath } from "../../store/drive/driveUtils";
import { generateNotifyPropsByRequestResult } from "../../common/utils";

const CourseDrive = ({ setNotify }) => {
  const { courseId } = useParams();
  const status = useSelector(selectStatus);
  const fileDict = useSelector(selectFileDict);
  const defaultPath = useSelector(selectDefaultPath);
  const dispatch = useDispatch();
  const [type] = useState(false);
  const [path, setPath] = useState(defaultPath);
  const [request, rest] = useRequest(renameFileOrFolder);

  const files = useMemo(() => {
    return parsePath(fileDict, path);
  }, [path, fileDict]);

  const actions = [
    {
      key: 2,
      label: "Folder",
      icon: <DriveFolderUploadIcon />,
      onClick: () => {},
    },
    {
      key: 1,
      label: "File",
      icon: <UploadFileIcon />,
      onClick: () => {},
    },
    {
      key: 0,
      label: "Markdown",
      icon: <ChromeReaderModeIcon />,
      onClick: () => {},
    },
  ];

  const handleOpen = ({ id, name, isDirectory }) => {
    if (!isDirectory) {
      return;
    }
    const last = { id, name };
    setPath([...path, last]);
  };

  const handleJumpByIndex = (index) => {
    setPath([...path.slice(0, index + 1)]);
  };

  const handleRename = async (name, data, cb) => {
    try {
      await request(name, data, fileDict);
      setNotify(generateNotifyPropsByRequestResult(rest));
      dispatch(
        rename({
          id: data.id,
          name,
        })
      );
      cb();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status !== "idle") return;
    dispatch(fetchDriveAsync(courseId));
  }, [dispatch, status, courseId]);

  useEffect(() => {
    setPath(defaultPath);
  }, [defaultPath]);

  useEffect(() => {
    dispatch(
      setLayout({
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      })
    );
    return () => {
      dispatch(setLayout({}));
    };
  }, [dispatch]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        overflow: "hidden",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          height: (theme) => `calc(100% - ${theme.spacing(4)})`,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Drive
        </Typography>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 1,
            flexGrow: 1,
            mb: 4,
            overflow: "hidden",
          }}
          elevation={3}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}
          >
            {path && (
              <Breadcrumbs aria-label="breadcrumb">
                {path.slice(0, path.length - 1).map((file, index) => (
                  <Link
                    key={file.id}
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleJumpByIndex(index)}
                  >
                    {file.name}
                  </Link>
                ))}

                <Typography color="text.primary">
                  {path[path.length - 1].name}
                </Typography>
              </Breadcrumbs>
            )}
            {/* <IconButton aria-label="1" onClick={() => setType((type) => !type)}>
              {type ? <CalendarViewMonthIcon /> : <ViewListIcon />}
            </IconButton> */}
          </Stack>
          <FileWrapper
            data={files}
            type={type}
            onOpen={handleOpen}
            onRename={handleRename}
          />
        </Paper>
      </Box>
      <SpeedDial
        actions={actions}
        FabProps={{
          color: "secondary",
        }}
      />
    </Container>
  );
};

export default withNotify(CourseDrive);
