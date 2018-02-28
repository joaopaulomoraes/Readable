import ReadableAPI from '../'

/**
 * @description Promise to get all data of all posts
 * @returns {Promise} The Promise object that represents all posts
 */
export const getPosts = () => {
  return ReadableAPI.get('/posts')
}

/**
 * @description Promise to get all data of a post
 * @param {string} postId - Post id
 * @returns {Promise} The Promise object that represents a post
 */
export const getPostById = (postId) => {
  return ReadableAPI.get(`/posts/${postId}`)
}

/**
 * @description Promise to get all comments in a new post - Currying function
 * @param {string} postId - Post id
 * @returns {Promise} The Promise object that represents all comments in a post
 */
export const getPostComments = (postId) => {
  return ReadableAPI.get(`/posts/${postId}/comments`)
}

/**
 * @description Promise to create a post
 * @param {object} objectData - Object data with form values
 * @returns {Promise} The Promise object that represents a new post
 */
export const createPost = () => {
  return ( objectData ) => ReadableAPI.post('/posts', objectData)
}

/**
 * @description Promise to create a new vote - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with a option value
 * @returns {Promise} The Promise object that represents a post vote
 */
export const createVotePost = (postId) => {
  return ( objectData ) => ReadableAPI.post(`/posts/${postId}`, objectData)
}

/**
 * @description Promise to update a post - Currying function
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with form values
 * @returns {Promise} The Promise object that represents a updated post 
 */
export const updatePost = (postId) => {
  return ( objectData ) => ReadableAPI.put(`/posts/${postId}`, objectData)
}

/**
 * @description Promise to delete a post
 * @param {string} postId - Post id
 * @param {object} objectData - Object data with deleted and parentDeleted values set to true
 * @returns {Promise} The post data with the deleted value set to true
 */
export const deletePost = (postId) => {
  return ( objectData ) => ReadableAPI.delete(`/posts/${postId}`, objectData)
}
