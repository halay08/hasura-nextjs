import { createTheme } from '@material-ui/core/styles';
declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    colors: {
      white: any;
      green: any;
      black: any;
      gray: any;
      yellow: any;
    };
  }
  interface ThemeOptions {
    colors: {
      white: any;
      green: any;
      black: any;
      gray: any;
      yellow: any;
    };
  }
}

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export const muiTheme = createTheme({
  colors: {
    white: {
      main: '#fff',
      100: 'rgba(255, 255, 255, 0.3)',
    },
    green: {
      main: '#00A876',
    },
    black: {
      100: 'rgba(0, 0, 0, 0.5)',
    },
    gray: {
      100: '#E8E3D9',
    },
    yellow: {
      100: '#BD7F02',
      200: '#E4A11A',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1440,
      xxl: 1920,
    },
  },
});
