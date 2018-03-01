import * as postsRequest from '../../api/posts'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST_BY_ID = 'GET_POST_BY_ID'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const CREATE_POST = 'CREATE_POST'
export const CREATE_VOTE_POST = 'CREATE_VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const ORDER_POSTS_BY = 'ORDER_POSTS_BY'
export const ORDER_POSTS_BY_VOTESCORE = 'ORDER_POSTS_BY_VOTESCORE'
export const ORDER_POSTS_BY_DATE = 'ORDER_POSTS_BY_DATE'
export const ORDER_POSTS_BY_CATEGORY = 'ORDER_POSTS_BY_CATEGORY'

/**
 * @description Get all posts
 * @returns {object} action - The action type
 */
export const getPosts = () => {
  return dispatch => postsRequest.getPosts().then(posts =>
    dispatch({ type: GET_POSTS, posts })
  )
}

/**
 * @description Get all the details of a post
 * @param {string} postId - Post id
 * @returns {object} The post data and action type
 */
export const getPostById = postId => {
  return dispatch => {
    postsRequest.getPostById(postId).then(post =>
      dispatch({ type: GET_POST_BY_ID, post })
    )
  }
}

/**
 * @description Get all comments from a post
 * @param {string} postId - Post id
 * @returns {object} The post data and action type
 */
export const getPostComments = postId => {
  return dispatch => {
    postsRequest.getPostComments(postId).then(comments =>
      dispatch({ type: GET_POST_COMMENTS, comments })
    )
  }
}

/**
 * @description Create a new post - Currying function
 * @param {object} objectData - Object data with form values
 * @returns {object} The post data and action type
 */
export const createPost = () => objectData => {
  return dispatch => {
    postsRequest.createPost()(objectData).then(post =>
      dispatch({ type: CREATE_POST, post })
    )
  }
}

/**
 * @description Increase or decrease a voting value - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with a option value
 * @returns {object} The post data with the updated voteScore option and the action type
 */
export const createVotePost = postId => objectData => {
  return dispatch => {
    postsRequest.createVotePost(postId)(objectData).then(post =>
      dispatch({ type: CREATE_VOTE_POST, post })
    ) 
  }
}

/**
 * @description Update a post - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with deleted and parentDeleted values set to true
 * @returns {object} The post data updated and the type of action
 */
export const updatePost = postId => objectData => {
  return dispatch => {
    postsRequest.updatePost(postId)(objectData).then(post =>
      dispatch({ type: UPDATE_POST, post })
    )
  }
}

/**
 * @description Delete a post - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with a values
 * @returns {object} The post data with the deleted value set to true and the action type
 */
export const deletePost = postId => objectData => {
  return dispatch => {
    postsRequest.deletePost(postId)(objectData).then(post =>
      dispatch({ type: DELETE_POST, post })
    )
  }
}

/**
 * @description Order all posts
 * @param {string} order - Order type
 * @returns {object} All post data in order based on action and the action type
 */
export const orderPostsBy = order => {
  return dispatch => {
    dispatch({ type: ORDER_POSTS_BY, order })
  }
}
