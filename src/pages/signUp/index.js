import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Field, createForm } from "../../components/form";
import useApi from "../../common/hooks/useApi";
import { signup } from "../../store/user/userApi";

import Logo from "../../images/logo.jpg";

const signUpForm = createForm([
  { field: "firstName", label: "First Name", required: true },
  { field: "lastName", label: "Last Name" },
  { field: "email", label: "Email Address", required: true },
  { field: "password", label: "Password", required: true },
  { field: "role", label: "Role", required: true },
  {
    field: "receiveEmail",
    label: "I want to receive notification via email.",
    defaultValue: false,
    keyOfValue: "checked",
  },
]);

const SignUp = () => {
  const navigate = useNavigate();
  const [{ loading, error }, api] = useApi(signup);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e, validateForm) => {
    e.preventDefault();
    try {
      const data = await validateForm();
      await api(data);
      navigate(`/`);
    } catch (err) {
      // console.log(err, typeof err);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, width: 64, height: 64 }} src={Logo} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form
          form={signUpForm}
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                autoComplete="given-name"
                name="firstName"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                fullWidth
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                required
                fullWidth
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                name="password"
                type="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="role"
                component={({
                  error,
                  helperText,
                  required,
                  label,
                  ...props
                }) => (
                  <FormControl fullWidth error={error}>
                    <InputLabel id="signup-role-label" required={required}>
                      {label}
                    </InputLabel>
                    <Select
                      {...props}
                      labelId="signup-role-label"
                      label={label}
                    >
                      <MenuItem value={0}>Teacher</MenuItem>
                      <MenuItem value={1}>Student</MenuItem>
                    </Select>
                    <FormHelperText>{helperText}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="receiveEmail"
                component={({ error, helperText, label, ...props }) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox {...props} color="primary" />}
                      label={label}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Box>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
