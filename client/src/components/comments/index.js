import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, {
  CardHeader,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Badge from 'material-ui/Badge'
import {
  ThumbUp,
  ThumbDown,
  ThumbsUpDown,
  //ModeEdit,
  Delete
} from 'material-ui-icons'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import { getPostComments } from '../../actions/posts'
import {
  createVoteComment,
  deleteComment
} from '../../actions/comments'

const styles = {
  comment: {
    boxShadow: 'none'
  },
  avatar: {
    width: 30,
    height: 30
  }
}

class Comments extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { match: { params: { postId } } } = this.props
    this.props.getPostComments(postId)
  }

  render() {

    const {
      classes,
      comments,
      handleVoteComment,
      deleteComment
    } = this.props

    return (
      <div id="comments">
        <CardContent>
        {comments !== undefined
        ? (
          <Typography paragraph type="body2">
            Comments
          </Typography>
        )
        ? comments.data.map((comment, i) => (
            <Card
              className={classes.comment}
              key={comment.id}
            >
              <Divider/>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatar}
                    alt="Readable Avatar"
                    src={`https://api.adorable.io/avatars/50/${i}@readable-react-redux`}
                  />
                }
                action={
                  <CardActions
                    disableActionSpacing
                  >
                    <IconButton
                      aria-label="Vote up"
                      onClick={() => handleVoteComment(comment.id)({option: 'upVote'})}
                    >
                      <ThumbUp/>
                    </IconButton>
                    <IconButton
                      aria-label="Vote down"
                      onClick={() => handleVoteComment(comment.id)({option: 'downVote'})}
                    >
                      <ThumbDown/>
                    </IconButton>
                    <IconButton
                      aria-label="Votes"
                      disabled
                    >
                      <Badge
                        className={classes.badge}
                        badgeContent={comment.voteScore}
                        color={comment.voteScore > 0 ? 'primary' : 'secondary'}
                      >
                        <ThumbsUpDown color="disabled" />
                      </Badge>
                    </IconButton>
                    <IconButton
                      onClick={() => deleteComment(comment.id)({ deleted: true, parentDeleted: true })}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                }
                title={`Commented by ${comment.author}`}
                subheader={`${moment(comment.timestamp).startOf('hour').fromNow()}`}
              />
              <CardContent>
                <Typography component="p">
                  {comment.body}
                </Typography>
              </CardContent>
            </Card>
          )) : null
          : null }
        </CardContent>
      </div>
    )
  }
}

const mapStateToProps = ({ posts: { comments } }) => {
  return {
    comments
  }
}

const mapDispatchToProps = dispatch => ({
  getPostComments: postId => dispatch(getPostComments(postId)),
  handleVoteComment: commentId => option => dispatch(createVoteComment(commentId)(option)),
  deleteComment: commentId => objectData => dispatch(deleteComment(commentId)(objectData))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Comments))
)
