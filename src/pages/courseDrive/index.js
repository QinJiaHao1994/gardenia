/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
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
import {
  selectStatus,
  fetchDriveAsync,
  selectFiles,
  selectDefaultPath,
  rename,
  add,
  remove,
} from "../../store/drive/driveSlice";
import { withOnlyTeacher } from "../../store/user/userHoc";
import { setLayout } from "../../store/common/commonSlice";
import FileWrapper from "../../components/file";
import { withNotify } from "../../common/hocs";
import { useRequest } from "../../common/hooks";
import {
  renameFileOrFolder,
  createFolder,
  deleteFileOrFolder,
  uploadFile,
  getFileDownloadURL,
} from "../../store/drive/driveApi";
import { parsePath, parseFiles } from "../../store/drive/driveUtils";
import { udpateNotifyPropsByResponse } from "../../common/utils";

const CourseDrive = ({ updateNotify }) => {
  const { courseId } = useParams();
  const status = useSelector(selectStatus);
  const files = useSelector(selectFiles);
  const defaultPath = useSelector(selectDefaultPath);
  const dispatch = useDispatch();
  const [type] = useState(false);
  const [path, setPath] = useState(defaultPath);
  const [reqRename, resRename] = useRequest(renameFileOrFolder);
  const [reqDelete, resDelete] = useRequest(deleteFileOrFolder);
  const [reqAddFolder, resAddFolder] = useRequest(createFolder);
  const [reqUpload, resUpload] = useRequest(uploadFile);
  const loadings = {
    rename: resRename.status === "loading",
    addFolder: resAddFolder.status === "loading",
  };

  const fileDict = useMemo(() => parseFiles(files), [files]);

  const filesArray = useMemo(() => {
    return parsePath(fileDict, path);
  }, [path, fileDict]);

  const handleOpen = ({ id, name, isDirectory }) => {
    if (!isDirectory) {
      handleOpenFile(id);
      return;
    }
    const last = { id, name };
    setPath([...path, last]);
  };

  const handleOpenFile = async (id) => {
    const file = fileDict[id];
    const type = file.type;

    if (type === "text/markdown") {
      window.open(`./preview/${id}`, "_blank");
      return;
    }
    try {
      const url = await getFileDownloadURL(file.url);
      window.open(url, "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  const handleJumpByIndex = (index) => {
    setPath([...path.slice(0, index + 1)]);
  };

  const handleRename = async (name, data, cb) => {
    try {
      await reqRename(name, data, fileDict);
      dispatch(
        rename({
          id: data.id,
          name,
        })
      );
      cb();
    } catch (err) {}
  };

  useEffect(() => {
    udpateNotifyPropsByResponse(updateNotify, resRename, {
      successText: "Rename success!",
    });
  }, [resRename, updateNotify]);

  const handleDelete = async (id) => {
    try {
      await reqDelete(fileDict[id]);
      dispatch(remove(id));
    } catch (err) {}
  };

  useEffect(() => {
    udpateNotifyPropsByResponse(updateNotify, resDelete, {
      successText: "Remove success!",
    });
  }, [resDelete, updateNotify]);

  const handleUpload = async (file) => {
    try {
      const data = await reqUpload(
        file,
        courseId,
        path[path.length - 1],
        fileDict
      );
      data.createdAt = data.createdAt.getTime();
      data.updatedAt = data.updatedAt.getTime();
      dispatch(add(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    udpateNotifyPropsByResponse(updateNotify, resUpload, {
      successText: "Upload success!",
    });
  }, [resUpload, updateNotify]);

  const handleAddFolder = async (name, cb) => {
    const date = new Date();
    const data = {
      name,
      isDirectory: true,
      courseId,
      createdAt: date,
      updatedAt: date,
      parentId: path[path.length - 1].id,
    };
    try {
      const id = await reqAddFolder(data);
      data.id = id;
      data.createdAt = data.createdAt.getTime();
      data.updatedAt = data.updatedAt.getTime();
      dispatch(add({ ...data, id }));
      cb();
    } catch (err) {}
  };

  useEffect(() => {
    udpateNotifyPropsByResponse(updateNotify, resAddFolder, {
      successText: "Create success!",
    });
  }, [resAddFolder, updateNotify]);

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
            data={filesArray}
            type={type}
            onOpen={handleOpen}
            onRename={handleRename}
            onDelete={handleDelete}
            onUpload={handleUpload}
            onAddFolder={handleAddFolder}
            loadings={loadings}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default withOnlyTeacher(withNotify(CourseDrive));
