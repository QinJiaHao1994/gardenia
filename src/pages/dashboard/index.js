import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import { auth } from "../../app/firebase";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "../../components/appbar";
import Box from "@mui/material/Box";
import withUserAuthentication from "../../store/user/userAuth";
import { withLocation, withNavigation, combineHocs } from "../../common/hocs";
// import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(selectUser);

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

export default combineHocs(
  withLocation,
  withNavigation,
  withUserAuthentication
)(Dashboard);
