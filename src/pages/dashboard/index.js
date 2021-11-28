// import { memo } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../../app/firebase";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AppBar from "../../components/appbar";
import { withUserAuthentication, withUser } from "../../store/user/userHoc";
import { compose } from "../../common/hocs";

const Dashboard = ({ user }) => {
  return (
    <Box sx={{ display: "flex" }}>
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
    </Box>
  );
};

export default compose(withUserAuthentication, withUser)(Dashboard);
