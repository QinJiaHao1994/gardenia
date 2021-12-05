import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateDialog = ({ open, title, onClose, onSubmit, files = [] }) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [fileId, setFileId] = useState("");

  const handleSumbit = () => {
    const file = files.find((f) => f.id === fileId);
    const data = {
      title: value,
      release_date: date.getTime(),
      fileUrl: file.url,
      fileId: file.id,
      preview: file.type === "text/markdown",
    };

    const cb = () => {
      onClose(false);
      setValue("");
      setDate(new Date());
      setFileId("");
    };
    onSubmit(data, cb);
  };

  return (
    <div>
      <Dialog open={open} fullWidth TransitionComponent={Transition}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            label="Title"
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
              renderInput={(props) => (
                <TextField
                  variant="standard"
                  fullWidth
                  {...props}
                  sx={{ mt: 3 }}
                />
              )}
              label="Release Date"
              value={date}
              onChange={setDate}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ mt: 3, p: 0 }} variant="standard">
            <InputLabel id="dialog-file-label">File</InputLabel>
            <Select
              label="File"
              variant="standard"
              id="demo-simple-select"
              value={fileId}
              labelId="dialog-file-label"
              onChange={(e) => setFileId(e.target.value)}
            >
              {files.map((file) => (
                <MenuItem value={file.id} key={file.id}>
                  {file.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSumbit} disabled={!value || !date || !fileId}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateDialog;
