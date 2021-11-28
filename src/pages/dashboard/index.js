import { memo, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../../app/firebase";
import Backdrop from "@mui/material/Backdrop";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import AppBar from "../../components/appbar";
import {
  withUserAuthentication,
  withUser,
  withIdentity,
} from "../../store/user/userHoc";
import { withNavigation, compose } from "../../common/hocs";

const Dashboard = ({ user, isTeacher, navigate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCourse = () => {
    handleClose();
    navigate("/create-course");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
        open={open}
      />
      <AppBar user={user} signOut={() => auth.signOut()} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {isTeacher && (
        <SpeedDial
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
        </SpeedDial>
      )}
    </Box>
  );
};

export default compose(
  withUserAuthentication,
  withUser,
  withIdentity,
  withNavigation
)(memo(Dashboard));
