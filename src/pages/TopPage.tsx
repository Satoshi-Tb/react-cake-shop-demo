import { AppBar, ThemeProvider } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import commonStyle from "../const/commonStyle";

export const TopPage = () => {
  return (
    <ThemeProvider theme={commonStyle}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            CANDY CHUPS Patisserie
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
