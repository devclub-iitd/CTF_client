
import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default function Notif (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={props.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  )
}
