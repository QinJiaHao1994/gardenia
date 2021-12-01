import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Files from "./Files";
import File from "./File";
import Folder from "./Folder";

const FileWrapper = ({ data = [], type, onJump }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [select, setSelect] = useState(null);
  const folders = data.filter((file) => file.isDirectory);
  const files = data.filter((file) => !file.isDirectory);

  const handleClick = (data) => {
    setSelect(data.id);
  };

  const handleClickAway = () => {
    setSelect(null);
  };

  const handleDoubleClick = (data) => {
    setSelect(null);
    onJump(data);
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    // setSelect(data.id);
    console.log(222);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflowY: "auto",
        p: 2,
      }}
    >
      {!folders.length && (
        <>
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddToDriveIcon sx={{ fontSize: 80 }} color="warning" />
            <Typography variant="h5" component="p">
              A place for all of your files
            </Typography>
          </Box>
        </>
      )}
      {!!folders.length && (
        <>
          <Typography variant="subtitle1" component="p">
            Folders
          </Typography>
          <Files
            type={type}
            select={select}
            Component={Folder}
            data={folders}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onClickAway={handleClickAway}
            onContextMenu={handleContextMenu}
          />
        </>
      )}
      {!!files.length && (
        <>
          <Typography variant="subtitle1" component="p">
            Files
          </Typography>
          <Files
            type={type}
            select={select}
            Component={File}
            data={files}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onClickAway={handleClickAway}
            onContextMenu={handleContextMenu}
          />
        </>
      )}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Remane</MenuItem>
        <MenuItem onClick={handleClose}>Remove</MenuItem>
      </Menu>
    </Box>
  );
};

export default FileWrapper;
