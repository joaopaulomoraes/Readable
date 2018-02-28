import ReadableAPI from '../'

/**
 * @description Get all categories of api
 * @returns {object} All Categories and the action type
 */
const getCategories = () => {
  return ReadableAPI.get('/categories')
}

/**
 * @description Get all posts based on a category
 * @param {string} category - Category type
 * @returns {object} The post data filtered by a category and the type of action and type of action
 */
export const getCategoriesByPost = category => {
  return ReadableAPI.get(`/${category}/posts`)
}
