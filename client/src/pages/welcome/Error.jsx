import { IconButton, Snackbar } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

const Error = ({ open, onClose, message }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    autoHideDuration={6000}
    {...{ open, onClose, message }}
    action={
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    }
  />
)

export default Error
