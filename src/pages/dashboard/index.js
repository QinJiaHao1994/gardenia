import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../app/firebase";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AppBar from "../../components/appbar";
import { Drawer } from "../../components/drawer";
import { withUserAuthentication, withUser } from "../../store/user/userHoc";
import {
  selectdrawerStatus,
  selectDrawerIndex,
  openDrawer,
  closeDrawer,
} from "../../store/common/commonSlice";
import { compose } from "../../common/hocs";

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const index = useSelector(selectDrawerIndex);
  const open = useSelector(selectdrawerStatus);
  const handleOpen = () => dispatch(openDrawer());
  const handleClose = () => dispatch(closeDrawer());

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        user={user}
        signOut={() => auth.signOut()}
        show={index !== -1}
        open={open}
        onOpen={handleOpen}
      />
      <Drawer open={open} index={index} onClose={handleClose} />
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
