import * as commentsRequest from '../../api/comments'

export const GET_COMMENT = 'GET_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_VOTE_COMMENT = 'CREATE_VOTE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

/**
 * @description Get all the details of a comment
 * @param {string} commentId - Comment id
 * @returns {object} The comment data and action type
 */
export const getComment = commentId => {
  return dispatch => commentsRequest.getComment(commentId).then(comment =>
    dispatch({ type: GET_COMMENT, comment })
  )
}

/**
 * @description Increase or decrease a voting value - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with a option value
 * @returns {object} The new comment data and action type
 */
export const createComment = postId => objectData => {
  return dispatch => commentsRequest.createComment()(objectData).then(comment =>
    dispatch({ type: CREATE_COMMENT, comment })
  )
}

/**
 * @description Increase or decrease a voting value - Currying function
 * @param {string} commentId - Comment id
 * @param {object} objectData - Object data with a option value
 * @returns {object} The comment data with the updated voteScore option and the action type
 */
export const createVoteComment = commentId => objectData => {
  return dispatch => commentsRequest.createVoteComment(commentId)(objectData).then(comment =>
    dispatch({ type: CREATE_VOTE_COMMENT, comment })
  )
}

/**
 * @description Update a comment - Currying function
 * @param {string} commentId - Comment id
 * @param {object} objectData - Object data with deleted and parentDeleted values set to true
 * @returns {object} The comment data updated and the type of action
 */
export const updateComment = commentId => objectData => {
  return dispatch => commentsRequest.updateComment(commentId)(objectData).then(comment =>
    dispatch({ type: UPDATE_COMMENT, comment })
  )
}

/**
 * @description Delete a comment - Currying function
 * @param {string} commentId - Comment id
 * @param {object} objectData - Object data with a values
 * @returns {object} The comment data with the deleted value set to true and the action type
 */
export const deleteComment = commentId => objectData => {
  return dispatch => commentsRequest.deleteComment(commentId)(objectData).then(comment =>
    dispatch({ type: DELETE_COMMENT, comment })
  )
}
