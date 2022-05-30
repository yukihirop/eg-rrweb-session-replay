import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#44A8A2"
    },
    secondary: {
      main: "#6D7884"
    },
    error: {
      main: "#EE6566"
    },
    warning: {
      main: "#EFC257"
    },
    info: {
      main: "#5784EF"
    },
    success: {
      main: "#65EEA9"
    }
  }
});

export const ThemeProviderComponent = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderComponent;
