import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFormControls, {
  createForm,
} from "../../common/hooks/useFormControls";
import useApi from "../../common/hooks/useApi";
import { signin } from "../../features/user/userApi";
import Image from "../../images/loginBg.jpg";

const signInForm = createForm([
  { field: "email", label: "Email Address", required: true },
  { field: "password", label: "Password", required: true },
]);

const SignIn = () => {
  let navigate = useNavigate();
  const [{ value, loading, error }, api] = useApi(signin);
  const [open, setOpen] = useState(false);
  const { props, validateForm } = useFormControls(signInForm);

  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  const handleClose = () => setOpen(false);

  if (value) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await validateForm();
    api(data);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => {
            return t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900];
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              {...props.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              autoComplete="current-password"
              {...props.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/forget" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignIn;
