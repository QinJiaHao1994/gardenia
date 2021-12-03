import { useState } from "react";
import MuiSpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import Backdrop from "@mui/material/Backdrop";

const SpeedDial = ({ actions, ...props }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (_, reason) => {
    if (reason === "focus") return;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={open}
      /> */}
      <MuiSpeedDial
        ariaLabel="Operations"
        sx={{
          position: "fixed",
          bottom: 48,
          right: 48,
          zIndex: (theme) => theme.zIndex.drawer + 3,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        {...props}
      >
        {actions.map(({ label, labelClass, onClick, key, icon }) => (
          <SpeedDialAction
            key={key}
            classes={{
              staticTooltipLabel: labelClass,
            }}
            icon={icon}
            tooltipTitle={label}
            tooltipOpen
            onClick={onClick}
          />
        ))}
      </MuiSpeedDial>
    </>
  );
};

export default SpeedDial;
