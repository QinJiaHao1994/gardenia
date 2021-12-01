import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Form, Field, createForm, DatePicker } from "../../components/form";

const form = createForm([
  { field: "code", label: "Code", required: true },
  { field: "name", label: "Name", required: true },
  {
    field: "year",
    label: "Year",
    required: true,
    transform: (val) => (val ? parseInt(val) : ""),
  },
  {
    field: "semester",
    label: "Semester",
    required: true,
    transform: (val) => (val ? parseInt(val) : ""),
  },
  {
    field: "startDate",
    label: "Start Date",
    required: true,
    defaultValue: null,
    rules: [
      {
        validator: (val) => val.toString() !== "Invalid Date",
        message: "Invalid Date",
      },
      {
        validator: (val, _, values) => !values.endDate || val <= values.endDate,
        message: "Start Date must before End Date",
      },
    ],
  },
  {
    field: "endDate",
    label: "End Date",
    required: true,
    defaultValue: null,
    rules: [
      {
        validator: (val) => val.toString() !== "Invalid Date",
        message: "Invalid Date",
      },
      {
        validator: (val, _, values) =>
          !values.startDate || val >= values.startDate,
        message: "End Date must after Start Date",
      },
    ],
  },
]);

const CreateOrEditCourse = ({
  title,
  onCancel,
  onSubmit,
  initialValues,
  alertOpen,
  alertType,
  alertText,
  onAlertClose,
  loading,
}) => {
  const handleSubmit = async (e, validateForm, modified) => {
    e.preventDefault();
    try {
      const data = await validateForm();
      await onSubmit(data, modified);
    } catch (err) {}
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" variant="h5" color="grey.800">
          {title}
        </Typography>
        <Form
          form={form}
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
          initialValues={initialValues}
        >
          <Grid container spacing={4}>
            <Field
              name="code"
              variant="standard"
              fullWidth
              component={(props) => (
                <Grid item xs={6}>
                  <TextField {...props} />
                </Grid>
              )}
            />
            <Field
              name="name"
              variant="standard"
              fullWidth
              component={(props) => (
                <Grid item xs={6}>
                  <TextField {...props} />
                </Grid>
              )}
            />
            <Field
              name="year"
              variant="standard"
              type="number"
              fullWidth
              component={(props) => (
                <Grid item xs={6}>
                  <TextField {...props} />
                </Grid>
              )}
            />
            <Field
              name="semester"
              component={({ error, helperText, label, required, ...props }) => (
                <Grid item xs={6}>
                  <FormControl component="fieldset" fullWidth error={error}>
                    <FormLabel component="legend" required={required}>
                      {label}
                    </FormLabel>
                    <RadioGroup row aria-label="gender" {...props}>
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Semester1"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="Semester2"
                      />
                    </RadioGroup>
                    <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>
                  </FormControl>
                </Grid>
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Field
                name="startDate"
                variant="standard"
                inputFormat="MM/dd/yyyy"
                component={(props) => (
                  <Grid item xs={6}>
                    <DatePicker {...props} />
                  </Grid>
                )}
              />
              <Field
                name="endDate"
                variant="standard"
                inputFormat="MM/dd/yyyy"
                component={(props) => (
                  <Grid item xs={6}>
                    <DatePicker {...props} />
                  </Grid>
                )}
              />
            </LocalizationProvider>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button onClick={onCancel} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={loading}>
                  Save
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </Paper>
      <Snackbar
        open={alertOpen}
        onClose={onAlertClose}
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertText}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateOrEditCourse;
