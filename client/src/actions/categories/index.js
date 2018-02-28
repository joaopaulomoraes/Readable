import * as categoriesRequest from '../../api/categories'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_BY_POST = 'GET_CATEGORIES_BY_POST'

/**
 * @description Get all categories
 * @returns {object} action - The action type
 */
export const getCategories = () => {
  return dispatch => categoriesRequest.getCategories().then(categories =>
    dispatch({ type: GET_CATEGORIES, categories })
  )
}

/**
 * @description Get all posts filtered by category
 * @param {string} category - Category name
 * @returns {object} action - The action type
 */
export const getCategoriesByPost = category => {
  return dispatch => categoriesRequest.getCategoriesByPost(category).then(posts =>
    dispatch({ type: GET_CATEGORIES_BY_POST, posts })
  )
}
