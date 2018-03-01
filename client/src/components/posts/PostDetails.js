import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Grid from 'material-ui/Grid'
import Menu, { MenuItem } from 'material-ui/Menu'
import Card, {
  CardHeader,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'
import {
  ThumbUp,
  ThumbDown,
  ThumbsUpDown,
  Comment,
  Add,
  ModeEdit,
  Delete,
  FormatListBulleted,
  ErrorOutline,
  ExpandMore
} from 'material-ui-icons'

import Comments from '../comments'

import {
  ReactSVG,
  ReduxSVG,
  UdacitySVG
} from '../categories/Icons'

import CommentsForm from '../comments/CommentsForm'
import DialogForm from '../DialogForm'

import { connect } from 'react-redux'
import moment from 'moment'
import NotFound from '../NotFound'

import {
  getPostById,
  createVotePost,
  deletePost
} from '../../actions/posts'

import { openDialog } from '../../actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '70vw',
    margin: `${theme.spacing.unit * 4}px auto`
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  card: {
    maxWidth: '100%',
    minHeight: '100%'
  },
  comment: {
    boxShadow: 'none'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    overflow: 'auto'
  },
  actions: {
    display: 'flex'
  },
  avatar: {
    padding: '5px',
    backgroundColor: 'white'
  }
})

class PostDetails extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    anchorEl: null,
    expanded: false
  }

  componentDidMount () {
    const { match: { params: { postId } } } = this.props
    this.props.getPostById(postId)
  }

  handleClickAnchor = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleCloseAnchor = () => {
    this.setState({ anchorEl: null })
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleCategory = (category) => {
    switch(category) {
      case 'react':
        return <ReactSVG />
      case 'redux':
        return <ReduxSVG />
      case 'udacity':
        return <UdacitySVG />
      default:
        return <ErrorOutline color="error" />
    }
  }

  render() {

    const {
      classes,
      handleVote,
      deletePost,
      posts,
      openDialog,
      dialog
    } = this.props

    const {
      anchorEl,
      expanded
    } = this.state

    return (
      <div
        id="posts-details"
        className={classes.root}
      >
        <Grid
          container
          spacing={24}
        >
          <Grid
            item
            xs={12}
          >
            {posts.data.length ? (
              <div>
                <Button
                  fab
                  color="primary"
                  aria-label="add"
                  className={classes.fab}
                  onClick={openDialog}
                >
                  <Add />
                </Button>

                <DialogForm
                  open={dialog.open}
                  title="Create a new Comment"
                  id="create-dialog-comment"
                >
                  <CommentsForm />
                </DialogForm>
                <Typography
                  type="display1"
                  gutterBottom
                >
                  Post details
                </Typography>
              </div>
            ): null}
          </Grid>

          {posts.data.length
            ? posts.data.map(post => (
            <Grid
              item
              xs={12}
              key={post.author}
            >
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="Post"
                      className={classes.avatar}
                    >
                      {this.handleCategory(post.category)}
                    </Avatar>
                  }
                  action={
                    <div id="actions-post">
                      <IconButton
                        aria-label="Actions"
                        aria-owns={anchorEl ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClickAnchor}
                      >
                        <FormatListBulleted />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleCloseAnchor}
                      >
                        <MenuItem onClick={this.handleCloseAnchor}>
                          <ModeEdit
                            onClick={() => null}
                            color="primary"
                          />
                        </MenuItem>
                        <MenuItem onClick={this.handleCloseAnchor}>
                          <Delete
                            onClick={() => deletePost(post.id)({ deleted: true, parentDeleted: true })}
                            color="secondary"
                          />
                        </MenuItem>
                      </Menu>
                    </div>
                  }
                  title={post.title}
                  subheader={`Posted by ${post.author} | ${post.category} | ${moment(post.timestamp).format('LL')}`}
                />
                <CardContent>
                  <Typography component="p">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions
                  className={classes.actions}
                  disableActionSpacing
                >
                  <IconButton
                    aria-label="Vote up"
                    onClick={() => handleVote(post.id)({ option: 'upVote' })}
                    color="primary"
                  >
                    <ThumbUp />
                  </IconButton>
                  <IconButton
                    aria-label="Vote down"
                    onClick={() => handleVote(post.id)({ option: 'downVote' })}
                    color="secondary"
                  >
                    <ThumbDown />
                  </IconButton>
                  <IconButton
                    aria-label="Votes"
                    disabled
                  >
                    <Badge
                      className={classes.badge}
                      badgeContent={post.voteScore}
                      color={post.voteScore > 0 ? 'primary' : 'secondary'}
                    >
                      <ThumbsUpDown color="disabled" />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-label="Vote down"
                    disabled
                  >
                    <Badge
                      className={classes.badge}
                      badgeContent={post.commentCount}
                      color="primary"
                    >
                      <Comment color="disabled" />
                    </Badge>
                  </IconButton>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show more"
                  >
                    <ExpandMore />
                  </IconButton>
                </CardActions>
                <Collapse
                  in={expanded}
                  timeout="auto"
                  unmountOnExit
                  className={classes.collapse}
                >
                  <Comments />
                </Collapse>
              </Card>
            </Grid>
          )) : (
            <NotFound message="Post not found." />
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, dialog }) => {
  return {
    posts,
    dialog
  }
}

const mapDispatchToProps = dispatch => ({
  getPostById: postId => dispatch(getPostById(postId)),
  handleVote: postId => option => dispatch(createVotePost(postId)(option)),
  deletePost: postId => objectData => dispatch(deletePost(postId)(objectData)),
  openDialog: () => dispatch(openDialog())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostDetails))
