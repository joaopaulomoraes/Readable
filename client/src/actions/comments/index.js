import * as commentsRequest from '../../api/comments'

export const GET_COMMENT = 'GET_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_VOTE_COMMENT = 'CREATE_VOTE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getComment = commentId => {
  return dispatch => commentsRequest.getComment(commentId).then(comment =>
    dispatch({ type: GET_COMMENT, comment })
  )
}

export const createComment = postId => objectData => {
  return dispatch => commentsRequest.createComment()(objectData).then(comment =>
    dispatch({ type: CREATE_COMMENT, comment })
  )
}

export const createVoteComment = commentId => objectData => {
  return dispatch => commentsRequest.createVoteComment(commentId)(objectData).then(comment =>
    dispatch({ type: CREATE_VOTE_COMMENT, comment })
  )
}


export const updateComment = commentId => objectData => {
  return dispatch => commentsRequest.updateComment(commentId)(objectData).then(comment =>
    dispatch({ type: UPDATE_COMMENT, comment })
  )
}


export const deleteComment = commentId => objectData => {
  return dispatch => commentsRequest.deleteComment(commentId)(objectData).then(comment =>
    dispatch({ type: DELETE_COMMENT, comment })
  )
}
