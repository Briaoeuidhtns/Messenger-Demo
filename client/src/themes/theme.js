import { createMuiTheme } from '@material-ui/core'
export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      sizeLarge: {
        fontSize: '1rem',
      },
    },
  },
  typography: {
    fontFamily: '"Open Sans"',
    button: {
      textTransform: 'none',
      fontSize: '.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '.875rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.6875rem',
      fontWeight: 600,
    },
    h1: {
      fontSize: '1.625rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
    background: { default: '#FFF' },
    text: { primary: '#000' },
  },
})
