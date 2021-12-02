import { useState, createRef, forwardRef } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import Files from "./Files";
import File from "./File";
import Folder from "./Folder";
import { RenameDialog } from "../../components/file";
import { contains } from "../../common/utils";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FileWrapper = ({ data = [], type, onOpen, onRename }) => {
  const ref = createRef();
  const [contextMenu, setContextMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [action, setAction] = useState(null);
  const folders = data.filter((file) => file.isDirectory);
  const files = data.filter((file) => !file.isDirectory);

  const handleClick = (data) => {
    setSelect(data);
  };

  const handleDoubleClick = (data) => {
    setSelect(null);
    onOpen(data);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const meatadata = contains(e.target, "li", e.currentTarget);
    if (contextMenu !== null || meatadata === null) {
      setSelect(null);
      setContextMenu(null);
      return;
    }
    const { type, index } = meatadata;
    setSelect((type === "Folder" ? folders : files)[index]);

    setContextMenu({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  const handleClickAway = () => {
    if (open) return;
    setSelect(null);
  };

  const handleAction = (action) => {
    switch (action) {
      case "rename":
        setAction("Rename");
        setOpen(true);
        break;
      case "remove":
        // setOpen(true);
        break;
      default:
        break;
    }
    setContextMenu(null);
  };

  const handleCloseDialog = (e) => {
    e.stopPropagation();
    setAction(null);
    setOpen(false);
  };

  const handleRename = (name) => {
    const cb = () => {
      setAction(null);
      setOpen(false);
    };
    onRename(name, select, cb);
  };

  return (
    <Box
      ref={ref}
      onContextMenu={handleContextMenu}
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
      <Files
        title="Folders"
        type={type}
        selectId={select && select.id}
        Component={Folder}
        data={folders}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onClickAway={handleClickAway}
      />
      <Files
        title="Files"
        type={type}
        selectId={select && select.id}
        Component={File}
        data={files}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onClickAway={handleClickAway}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleAction}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => handleAction("rename")}>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon fontSize="small" />
          </ListItemIcon>
          Remane
        </MenuItem>
        <MenuItem onClick={() => handleAction("remove")}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
      <Dialog open={open} fullWidth TransitionComponent={Transition}>
        {action === "Rename" && (
          <RenameDialog
            data={select}
            onClose={handleCloseDialog}
            onSubmit={handleRename}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default FileWrapper;
