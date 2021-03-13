import { createMuiTheme } from '@material-ui/core'
export const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: '"Open Sans"',
    body1: {
      fontSize: '.875rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '.75rem',
      fontWeight: 600,
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
