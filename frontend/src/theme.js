import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0c3d17', // Cor primária
      dark: '#115c21', // Cor do hover da primária
    },
    secondary: {
      main: '#a30000', // Cor secundária
      dark: '#b50909', // Cor do hover da secundária
    },
  },
});

export default theme;
