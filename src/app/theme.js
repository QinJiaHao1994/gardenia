import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: red,
  },
});

export default theme;
