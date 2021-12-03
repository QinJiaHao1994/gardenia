import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
// import GradingIcon from "@mui/icons-material/Grading";
import Link from "../../components/link";
import MenuIcon from "@mui/icons-material/Menu";
import { extractAbbr } from "../../common/utils";
import { drawerWidth } from "../drawer";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ user, signOut, open, onOpen, show }) => {
  const [anchor, setAnchor] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchor(null);
  };

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        {show && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            onClick={onOpen}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to="/">
          <Typography
            component="h1"
            variant="h6"
            color="primary.contrastText"
            noWrap
          >
            Dashboard
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction="row" spacing={2}>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>{extractAbbr(user)}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            keepMounted
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            anchorEl={anchor}
            open={!!anchor}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};
export default AppBar;
