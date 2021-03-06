import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

const RenameDialog = ({ data, onClose, loading, onSubmit }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (!data) return;
    setValue(data.name);
  }, [data]);

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Rename
        <IconButton aria-label="close" onClick={onClose}>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSubmit(value)} disabled={!value || loading}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default RenameDialog;
