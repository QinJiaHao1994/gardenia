import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

const CreateFolderDialog = ({ onClose, loading, onSubmit }) => {
  const [value, setValue] = useState("Untitled folder");

  const handleClose = (e) => {
    setValue("Untitled folder");
    onClose(e);
  };

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        New Folder
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => onSubmit(value)} disabled={!value || loading}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateFolderDialog;
