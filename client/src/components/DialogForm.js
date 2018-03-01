import React from 'react'
import PropTypes from 'prop-types'
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'

const DialogForm = props => {

  const {
    open,
    title,
    id,
    closeDialog,
    children
  } = props

  return (
    <div id="dialog-form">
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby={id}
      >
        <DialogTitle id={id}>
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  )
}

DialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default DialogForm
