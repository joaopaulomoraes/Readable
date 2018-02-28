import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import TagFacesIcon from 'material-ui-icons/TagFaces'
import { connect } from 'react-redux'
import {
  getCategories,
  getCategoriesByPost
} from '../../actions/categories'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
})

class Categories extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getCategories()
  }

  render() {
    const {
      classes,
      categories,
      postsByCategory,
      getCategoriesByPost,
      history
    } = this.props

    return (
      <Paper className={classes.root}>
        {categories.data.map(category => {
          let avatar = null

          if (category.name === 'redux') {
            avatar = (
              <Avatar>
                <TagFacesIcon className={classes.svgIcon} />
              </Avatar>
            )
          }

          return (
            <Chip
              key={category.name}
              id={category.name}
              avatar={avatar}
              label={category.name}
              onClick={() => { return (postsByCategory(category.path), getCategoriesByPost(category.name))} }
              className={classes.chip}
            />
          )
        })}
        <Chip
          key="all"
          id="all"
          label="all"
          onClick={() => history.push('/')}
          className={classes.chip}
        />
      </Paper>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  postsByCategory: category => dispatch(push(`/categories/${category}`)),
  getCategoriesByPost: category => dispatch(getCategoriesByPost(category))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Categories)))
