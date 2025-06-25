import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: '#FF3040',
      light: '#FF4D5D',
      dark: '#CC2636',
      contrastText: '#ffffff',
    },
    secondary: {
      main: "#d946ef",
      light: "#e879f9",
      dark: "#c026d3",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
    divider: "rgba(148,163,184,0.12)",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontSize: "0.875rem",
          padding: "8px 16px",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.2)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #0ea5e9 30%, #38bdf8 90%)",
        },
        containedSecondary: {
          background: "linear-gradient(45deg, #d946ef 30%, #e879f9 90%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "#1e293b",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
        },
      },
    },
  },
});

export default darkTheme;