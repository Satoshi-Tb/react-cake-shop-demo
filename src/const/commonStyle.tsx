import { createTheme } from "@mui/material/styles";
import pink from "@mui/material/colors/pink";
import amber from "@mui/material/colors/amber";

const commonStyle = createTheme({
  palette: {
    primary: {
      main: pink[300],
    },
    secondary: {
      main: amber[400],
    },
  },
});

export default commonStyle;
