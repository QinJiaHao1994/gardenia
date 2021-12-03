import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getDisplayName, noop, isBoolean } from "../utils";

const defaultProps = {
  open: false,
  onClose: noop,
  type: "info",
  text: "",
};

const withNotify = (Component) => {
  const WrappedComponent = (props) => {
    const [nofityProps, setNotifyProps] = useState(defaultProps);

    const handleClose = () => {
      setNotifyProps({
        ...nofityProps,
        open: false,
      });
      nofityProps.onClose();
    };
    const { open, type, text } = nofityProps;
    const severity = isBoolean(type) ? (type ? "success" : "error") : type;

    return (
      <>
        <Component {...props} updateNotify={setNotifyProps} />
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={1000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {text}
          </Alert>
        </Snackbar>
      </>
    );
  };

  WrappedComponent.displayName = `withNotify(${getDisplayName(Component)})`;

  return WrappedComponent;
};

export default withNotify;
