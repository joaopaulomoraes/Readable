import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'

import {
  reduxTextField,
  reduxSelectField
} from '../form'

import { createPost } from '../../actions/posts'
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

const onSubmit = (values, dispatch) => {
  const objectData = {
    id: generateId(),
    timestamp: unixTimestamp(),
    title: values.title,
    body: values.body,
    author: values.author,
    category: values.category
  }

  return (
    dispatch(createPost()(objectData)),
    dispatch(closeDialog())
  )
}

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

const FormPosts = props => {

  const {
    classes,
    handleSubmit,
    closeDialog,
    categories,
  } = props

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

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'postsForm',
  validate,
  onSubmit,
})(withStyles(styles)(FormPosts)))
