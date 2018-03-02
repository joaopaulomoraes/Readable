import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  reduxTextField,
  reduxSelectField
} from '../form'

import {
  createPost,
  getPostById,
  updatePost
} from '../../actions/posts'
import { closeDialog } from '../../actions'

import {
  generateId,
  unixTimestamp
} from '../../utils'

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
 * @returns {object} A new post data
 */
const onSubmit = (values, dispatch, props) => {
  const { match: { params: { postId } } } = props
  
  const objectData = {
    id: values.id || generateId(),
    timestamp: values.timestamp || unixTimestamp(),
    title: values.title,
    body: values.body,
    author: values.author,
    category: values.category
  }

  return (
    ! postId
    ? (dispatch(createPost()(objectData)), dispatch(closeDialog()))
    : (dispatch(updatePost(postId)(objectData)), dispatch(closeDialog()))
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
    'title',
    'body',
    'author',
    'category'
  ]
  requiredFields.forEach(field =>
    !values[field] ? errors[field] = 'Required' : null
  )
  return errors
}

class FormPosts extends Component {
  componentDidMount () {
    getPostById(this.props.match.params.postId)
  }

  render() {

    const {
      classes,
      handleSubmit,
      closeDialog,
      categories,
    } = this.props

    return (
      <div
        id="create-post-form"
        className={classes.container}
      >
        <form onSubmit={handleSubmit}>
          <Field
            autoFocus
            name="title"
            label="Title"
            component={reduxTextField}
            id="title"
          />
          <Field
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
          <Field
            name="category"
            label="Category"
            component={reduxSelectField}
            id="category"
          >
            {categories.data.map(category => (
              <MenuItem
                key={category.path}
                value={category.name}
              >
                {category.name}
              </MenuItem>
            ))}
          </Field>
          
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
}

const mapStateToProps = ({ posts, categories }, { match }) => {
  return {
    posts,
    categories,
    /*
     * Little magic to filter the post and extract the first position of the sector
     */
    initialValues: posts.data.filter(posts => posts.id === match.params.postId)[0]
  }
}

const mapDispatchToProps = dispatch => ({
  getPostById: postId => dispatch(getPostById(postId)),
  closeDialog: () => dispatch(closeDialog())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({
      form: 'postsForm',
      validate,
      onSubmit,
    })(withStyles(styles)(FormPosts))
  )
)
