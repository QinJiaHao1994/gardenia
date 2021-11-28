import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import TableViewIcon from "@mui/icons-material/TableView";
import Link from "../../components/link";
import { extractAbbr } from "../../common/utils";

const ResponsiveAppBar = ({ user, signOut }) => {
  const [anchor, setAnchor] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchor(null);
  };

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Link to="/" sx={{ flexGrow: 1 }}>
          <Typography
            component="h1"
            variant="h6"
            color="primary.contrastText"
            noWrap
          >
            Dashboard
          </Typography>
        </Link>
        <Stack direction="row" spacing={2}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <TableViewIcon />
              </ListItemIcon>
              Grade
            </MenuItem>
            <Divider />
            <MenuItem onClick={signOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
