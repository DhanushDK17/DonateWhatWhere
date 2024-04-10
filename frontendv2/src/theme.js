import { createTheme } from '@mui/material/styles';

export const productTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#597697', // Navbar Color
    },
    secondary: {
      main: '#F6F4F3', // Cards color
    },
    divider: "#BDBDBD", //Divider lines in cards
    success: {
      main: '#4ddc8c',
    },
    info: {
      main: '#597697',
    },
    warning: {
      main: '#597697',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      navbar: "#FFFFFF", //includes text color for all dialog title and navbar
      default: "#000000", //default text color is black
    },
    icon: "#FFFFFF", //Icon color in dialog box title
  },
  typography: {
    fontFamily: "Myriad Pro",
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
      fontSize: 18,
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
      textTransform: "unset"
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.even-row': {
            backgroundColor: '#ffffff',
          },
          '&.odd-row': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 24px',
        },
        selectLabel: {
          margin: 0,
          padding: '8px 0',
          lineHeight: '1.4375em',
        },
        displayedRows: {
          margin: 0,
          padding: '8px 0',
          lineHeight: '1.4375em',
        },
        select: {
          margin: 0,
          padding: '8px 0',
          lineHeight: '1.4375em',
        },
        actions: {
          margin: 0,
          padding: '8px 0',
          lineHeight: '1.4375em',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          '&:not(:first-of-type)': {
            
            backgroundColor: '#c5d4e0',
             
          },
          '&:first-of-type': {
           
            backgroundColor: "#597697",
             
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#F6F4F3",
          color: "#000000",
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1,
        },
      },
    },
  },
  background: {
    header: "#597697",
    footer: "#597697"
  },
  breakpoints: {
    values: { //min-width
      xs: 0, //Mobiles
      sm: 600, //Small Tablet|Large Mobile
      md: 960, //Big Tablet
      lg: 1300, //Full HD
      xl: 2048, //2K
      xxl: 2560, //4K
    }
  }
});
