import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";

const DatePicker = (props) => {
  const {
    id,
    label,
    value,
    error,
    name,
    helperText,
    required,
    onChange,
    inputFormat,
    variant,
  } = props;

  const datePickerProps = {
    inputFormat,
    label,
    value,
    onChange: (value) =>
      onChange({
        target: {
          name,
          value,
        },
      }),
  };

  const textFieldProps = { variant, id, required, error, helperText };

  return (
    <DesktopDatePicker
      {...datePickerProps}
      renderInput={({ error: forwardError, ...props }) => (
        <TextField
          {...textFieldProps}
          {...props}
          error={forwardError || error}
        />
      )}
    />
  );
};

export default DatePicker;
