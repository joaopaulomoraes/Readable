import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { reduxTextField } from '../form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  generateId,
  unixTimestamp
} from '../../utils'

import {
  createComment,
  updateComment
} from '../../actions/comments'

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
const onSubmit = (values, dispatch, props) => {
  const { match: { params: { postId } }, commentId, closeDialog } = props

  const objectData = {
    id: commentId || generateId(),
    timestamp: values.timestamp || unixTimestamp(),
    body: values.body,
    author: values.author,
    parentId: postId
  }

  return (
    ! commentId
    ? (dispatch(createComment()(objectData)), closeDialog())
    : (dispatch(updateComment(commentId)(objectData), closeDialog()))
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

const mapStateToProps = ({ posts: { comments } }, props) => {
  return {
    comments,
    /*
     * Little magic to filter the comment and extract the first position of the sector
     */
    initialValues: comments.data.filter(comments => comments.id === props.commentId)[0]
  }
}


export default withRouter(
  connect(
    mapStateToProps,
    null
  )(reduxForm({
      form: 'postsForm',
      validate,
      onSubmit,
    })(withStyles(styles)(CategoriesPost))
  )
)
