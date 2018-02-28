import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import SortIcon from 'material-ui-icons/Sort'
import Tooltip from 'material-ui/Tooltip'
import { connect } from 'react-redux'

import {
  orderPostsBy,
  ORDER_POSTS_BY_VOTESCORE,
  ORDER_POSTS_BY_DATE,
  ORDER_POSTS_BY_CATEGORY
} from '../../actions/posts'

const options = [
  {
    action: ORDER_POSTS_BY_VOTESCORE,
    value: 'Votes'
  },
  {
    action: ORDER_POSTS_BY_DATE,
    value: 'Date'
  },
  {
    action: ORDER_POSTS_BY_CATEGORY,
    value: 'Category'
  }
]

class OrderPosts extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    
    const {
      orderPostsBy
    } = this.props

    const { anchorEl } = this.state

    return (
      <div id="order-posts">
        <Tooltip
          title="Order posts by"
          placement="left"
          disableTriggerFocus
        >
          <IconButton
            aria-label="More"
            aria-owns={anchorEl ? "long-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <SortIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === "None"}
              onClick={() => {
                return ( this.handleClose, orderPostsBy(option.action) )
              }}
            >
              {option.value}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}

const mapDispatchToProps = dispatch => ({
  orderPostsBy: order => dispatch(orderPostsBy(order))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPosts)
