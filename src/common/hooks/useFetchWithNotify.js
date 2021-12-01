import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useFetch from "./useFetch";
import { noop } from "../utils";

const useFetchWithNotify = (
  defaultApi,
  successText,
  errorText,
  onSuccess = noop,
  onError = noop
) => {
  const [open, setOpen] = useState(false);
  const [{ value, error, loading, finished }, wrappedFetch] =
    useFetch(defaultApi);
  const type = error ? "error" : "success";
  const text = error ? errorText || error : successText;

  useEffect(() => {
    if (!finished) return;
    setOpen(true);
  }, [finished]);

  const handleClose = () => {
    setOpen(false);
    error ? onError(error) : onSuccess(value);
  };

  const Nofity = (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={1000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );

  return [Nofity, wrappedFetch, loading];
};

export default useFetchWithNotify;
