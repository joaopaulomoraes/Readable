import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Card, {
  CardHeader,
  CardContent,
  CardActions,
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'
import Button from 'material-ui/Button'
import {
  ThumbUp,
  ThumbDown,
  ThumbsUpDown,
  Comment,
  Add,
  ArrowForward,
  ErrorOutline
} from 'material-ui-icons'

import FormPosts from '../../components/posts/FormPosts'
import OrderPosts from './OrderPosts'
import DialogForm from '../DialogForm'

import {
  ReactSVG,
  ReduxSVG,
  UdacitySVG
} from '../categories/Icons'

import NotFound from '../../components/NotFound'

import moment from 'moment'
import { connect } from 'react-redux'

import {
  getPosts,
  createVotePost
} from '../../actions/posts'

import { openDialog } from '../../actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 4
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
  media: {
    height: 200
  },
  actions: {
    display: 'flex'
  },
  avatar: {
    padding: '5px',
    backgroundColor: 'white'
  },
  message: {
    width: '25vh',
    height: '25vh'
  },
  right: {
    textAlign: 'right'
  }
})

class Posts extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getPosts()
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
      posts,
      dialog,
      openDialog,
      history
    } = this.props

    return (
      <div
        id="posts"
        className={classes.root}
      >
        <Button
          fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={openDialog}
        >
          <Add />
        </Button>

        <DialogForm
          open={dialog.open}
          title="Create a new post"
          id="create-dialog-post"
        >
          <FormPosts />
        </DialogForm>

        <Grid
          container
          spacing={24}
        >
          <Grid
            item
            xs={10}
          >
            <Typography
              type="display1"
              gutterBottom
            >
              Posts
            </Typography>
          </Grid>
          
          <Grid
            item
            xs={2}
            className={classes.right}
          >
            <OrderPosts />
          </Grid>

          {posts.data.length
            ? posts.data.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
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
                        onClick={() => history.push(`/posts/${post.id}`)}
                      >
                        <ArrowForward />
                      </IconButton>
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
                </CardActions>
              </Card>
            </Grid>
          )) : (
            <NotFound message="There are no posts here yet." />
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
  getPosts: () => dispatch(getPosts()),
  openDialog: () => dispatch(openDialog()),
  handleVote: postId => option => dispatch(createVotePost(postId)(option))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Posts))
)
