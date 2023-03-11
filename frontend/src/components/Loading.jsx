import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import { tokens } from "../theme.js";

function Spinner() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return <CircularProgress color="secondary" />;
}

export default Spinner;
