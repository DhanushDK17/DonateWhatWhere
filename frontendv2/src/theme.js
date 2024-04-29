import { createTheme } from "@mui/material/styles";

export const productTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f55951", // Navbar Color
    },
    secondary: {
      main: "#edd2cb", // Cards color
    },
    divider: "#00000", //Divider lines in cards
    success: {
      main: "#4ddc8c",
    },
    info: {
      main: "#543c52",
    },
    warning: {
      main: "#543c52",
    },
    error: {
      main: "#ff0000",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      navbar: "#FFFFFF", //includes text color for all dialog title and navbar
      default: "#361d32", //default text color is black
    },
    icon: "#FFFFFF", //Icon color in dialog box title
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontSize: 16,
    htmlFontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: 25,
      fontWeight: 400,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: 25,
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 0.9,
    },
    h4: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 0.9,
    },
    h5: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1,
    },
    h6: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 1.52,
    },
    subtitle2: {
      fontSize: 25,
      fontWeight: 400,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.1,
    },
    button: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.4,
      textTransform: "unset",
      cursor: "pointer",
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.even-row": {
            backgroundColor: "#ffffff",
          },
          "&.odd-row": {
            backgroundColor: "#f0f0f0",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 24px",
        },
        selectLabel: {
          margin: 0,
          padding: "8px 0",
          lineHeight: "1.4375em",
        },
        displayedRows: {
          margin: 0,
          padding: "8px 0",
          lineHeight: "1.4375em",
        },
        select: {
          margin: 0,
          padding: "8px 0",
          lineHeight: "1.4375em",
        },
        actions: {
          margin: 0,
          padding: "8px 0",
          lineHeight: "1.4375em",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          "&:not(:first-of-type)": {
            backgroundColor: "#f55951",
          },
          "&:first-of-type": {
            backgroundColor: "#543c52",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#f55951",
          color: "#000000",
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1,
        },
      },
    },
  },
  background: {
    header: "#361d32",
    footer: "#361d32",
  },
  breakpoints: {
    values: {
      //min-width
      xs: 0, //Mobiles
      sm: 600, //Small Tablet|Large Mobile
      md: 960, //Big Tablet
      lg: 1300, //Full HD
      xl: 2048, //2K
      xxl: 2560, //4K
    },
  },
});
