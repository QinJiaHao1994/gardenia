import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiSpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import Backdrop from "@mui/material/Backdrop";

const SpeedDial = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCourse = () => {
    handleClose();
    navigate("/create-course");
  };

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
        open={open}
      />
      (
      <MuiSpeedDial
        ariaLabel="Operations"
        sx={{
          position: "fixed",
          bottom: 48,
          right: 48,
          zIndex: (theme) => theme.zIndex.appBar + 2,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          classes={{
            staticTooltipLabel: "w165",
          }}
          icon={<FileCopyIcon />}
          tooltipTitle="Create Course"
          tooltipOpen
          onClick={handleCreateCourse}
        />
      </MuiSpeedDial>
      )
    </>
  );
};

export default SpeedDial;
