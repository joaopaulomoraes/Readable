import ReadableAPI from '../'

/**
 * @description Promise to get all data of a comment
 * @param {string} commentId - Comment id
 * @returns {Promise} The Promise object that represents a comment
 */
export const getComment = (commentId) => {
  return ReadableAPI.get(`/comments/${commentId}`)
}

/**
 * @description Promise to create a new comment - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with form values
 * @returns {Promise} The Promise object that represents a new comment
 */
export const createComment = (postId) => {
  return ( objectData ) => ReadableAPI.post('/comments', objectData)
}

/**
 * @description Promise to create a new vote - Currying function
 * @param {string} commentId - Comment id
 * @param {object} objectData - Object data with a option value
 * @returns {Promise} The Promise object that represents a comment vote
 */
export const createVoteComment = (commentId) => {
  return ( objectData ) => ReadableAPI.post(`/comments/${commentId}`, objectData)
}

/**
 * @description Promise to update a comment - Currying function
 * @param {string} commentId - Comment id
 * @param {object} objectData - Object data with form values
 * @returns {Promise} The Promise object that represents a updated comment 
 */
export const updateComment = (commentId) => {
  return ( objectData ) => ReadableAPI.put(`/comments/${commentId}`, objectData)
}

/**
 * @description Promise to delete a comment
 * @param {string} commentId - Comment id
 * @returns {Promise} The comment data with the deleted value set to true
 */
export const deleteComment = (commentId) => {
   return ( objectData ) => ReadableAPI.delete(`/comments/${commentId}`, objectData)
}
