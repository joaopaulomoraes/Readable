import React, { Component } from 'react'
import Posts from '../../components/posts'
import { connect } from 'react-redux'

import { getCategoriesByPost } from '../../actions/categories'

class PostsByCategory extends Component {

  componentDidMount () {
    this.props.getCategoriesByPost(
      this.props.match.params.category
    )
  }

  render() {
    return (
      <Posts />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getCategoriesByPost: category => dispatch(getCategoriesByPost(category))
})

export default connect(
  null,
  mapDispatchToProps
)(PostsByCategory)
