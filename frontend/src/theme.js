import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#dbdbdf",
          200: "#b6b7bf",
          300: "#92939e",
          400: "#6d6f7e",
          500: "#494b5e",
          600: "#3a3c4b",
          700: "#2c2d38",
          800: "#1d1e26",
          900: "#0f0f13",
        },
        yellowAccent: {
          100: "#faf6d8",
          200: "#f5edb1",
          300: "#f0e48a",
          400: "#ebdb63",
          500: "#e6d23c",
          600: "#b8a830",
          700: "#8a7e24",
          800: "#5c5418",
          900: "#2e2a0c",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#0f0f13",
          200: "#1d1e26",
          300: "#2c2d38",
          400: "#3a3c4b",
          500: "#494b5e",
          600: "#6d6f7e",
          700: "#92939e",
          800: "#b6b7bf",
          900: "#dbdbdf",
        },
        yellowAccent: {
          100: "#2e2a0c",
          200: "#5c5418",
          300: "#8a7e24",
          400: "#b8a830",
          500: "#e6d23c",
          600: "#ebdb63",
          700: "#f0e48a",
          800: "#f5edb1",
          900: "#faf6d8",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
              light: colors.primary[100],
              dark: colors.primary[700],
            },
            secondary: {
              main: colors.yellowAccent[500],
              light: colors.yellowAccent[300],
              dark: colors.yellowAccent[700],
            },
            onSecondary: {
              main: colors.grey[700],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[800],
            },
          }
        : {
            primary: {
              main: colors.primary[500],
              light: colors.primary[100],
              dark: "#eeeeee",
            },
            secondary: {
              main: colors.yellowAccent[500],
              light: colors.yellowAccent[300],
              dark: colors.yellowAccent[700],
            },
            onSecondary: {
              main: colors.grey[100],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[900],
            },
          }),
    },
    link: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 500,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 500,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: colors.primary[100],
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: `6px`,
            backgroundColor: "primary.main",
            border: "transparent",
            color: colors.primary[100],
            "&.Mui-focused": {
              color: colors.primary[100],
            },
          },
          label: {
            "&.Mui-focused": {
              color: "yellow",
            },
          },
          underline: {
            "&:before": {
              borderBottomColor: "transparent",
            },
            "&:after": {
              borderBottomColor: "transparent",
            },
            "&:hover:not(.Mui-disabled)::before": {
              borderBottomColor: "transparent",
            },
            "&:hover:not(.Mui-disabled)::after": {
              borderBottomColor: "transparent",
            },
          },
        },
      },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
      easing: {
        // This is the most common easing curve.
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        // Objects enter the screen at full velocity from off-screen and
        // slowly decelerate to a resting point.
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        // Objects leave the screen at full velocity. They do not decelerate when off-screen.
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        // The sharp curve is used by objects that may return to the screen at any time.
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
