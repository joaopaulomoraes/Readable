import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { reduxTextField } from '../form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { closeDialog } from '../../actions'

import {
  generateId,
  unixTimestamp
} from '../../utils'

import { createComment } from '../../actions/comments'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: '30px 0 0 0'
  },
  content: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

/**
 * @description Receives the values of the redux state and makes the order after being validated
 * @param {object} values - All form data extracted from the state
 * @param {object} dispatch - Make the dispatch with the data
 * @returns {object} A new comment data
 */
const onSubmit = (values, dispatch, match) => {
  const { match: { params: { postId } } } = match

  const objectData = {
    id: generateId(),
    timestamp: unixTimestamp(),
    body: values.body,
    author: values.author,
    parentId: postId
  }

  return (
    dispatch(createComment()(objectData)),
    dispatch(closeDialog())
  )
}

/**
 * @description Validates user input
 * @param {object} values - All form data extracted from the state
 * @returns {string} Required - Errors message to the user about the required fields
 */
const validate = values => {
  const errors = {}
  const requiredFields = [
    'body',
    'author'
  ]
  requiredFields.forEach(field =>
    !values[field] ? errors[field] = 'Required' : null
  )
  return errors
}

const CategoriesPost = props => {

  const {
    classes,
    handleSubmit,
    closeDialog
  } = props

  return (
    <div
      id="create-post-form"
      className={classes.container}
    >
      <form onSubmit={handleSubmit}>
        <Field
          autoFocus
          name="body"
          label="Body"
          component={reduxTextField}
          id="body"
          placeholder="If you need more than one line, press enter in this field"
          multiline
        />
        <Field
          name="author"
          label="Author"
          component={reduxTextField} 
          id="author"
        />
        
        <div className={classes.content}>
          <Button
            className={classes.button}
            size="small"
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            color="primary"
            size="small"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog())
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(reduxForm({
      form: 'postsForm',
      validate,
      onSubmit,
    })(withStyles(styles)(CategoriesPost))
  )
)
