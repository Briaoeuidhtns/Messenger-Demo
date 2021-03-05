import { theme } from '../src/themes/theme'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'
import { MuiThemeProvider } from '@material-ui/core'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const muiSetup = (storyfn) => (
  <MuiThemeProvider theme={theme}>
    <ScopedCssBaseline>{storyfn()}</ScopedCssBaseline>
  </MuiThemeProvider>
)

export const decorators = [muiSetup]
