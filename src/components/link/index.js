import MaterialLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, ...props }) => {
  return (
    <MaterialLink
      underline="none"
      color="inherit"
      component={RouterLink}
      {...props}
    >
      {children}
    </MaterialLink>
  );
};

export default Link;
