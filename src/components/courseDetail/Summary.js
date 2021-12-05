import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const Summary = ({ content, readonly, onSave }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState(content);
  const handleOpen = () => setShow(true);
  const handleSave = () => {
    onSave(text);
    setShow(false);
  };
  const handleChange = (e) => setText(e.target.value);

  return (
    <>
      <Box
        sx={{
          p: 0,
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1" component="p">
          Summary:
        </Typography>
        {!readonly && !show && (
          <IconButton color="primary" onClick={handleOpen}>
            <EditIcon sx={{ fontSize: 24 }} />
          </IconButton>
        )}
        {!readonly && show && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </Box>
      {!show && <Typography variant="body1">{content}</Typography>}
      {show && (
        <TextField multiline fullWidth value={text} onChange={handleChange} />
      )}
    </>
  );
};

export default Summary;
