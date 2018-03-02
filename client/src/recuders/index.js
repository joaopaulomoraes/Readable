import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_POST_COMMENTS,
  CREATE_POST,
  CREATE_VOTE_POST,
  UPDATE_POST,
  DELETE_POST,
  ORDER_POSTS_BY,
  ORDER_POSTS_BY_DATE,
  ORDER_POSTS_BY_CATEGORY
} from '../actions/posts'

import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_POST
} from '../actions/categories'

import {
  CREATE_COMMENT,
  CREATE_VOTE_COMMENT,
  DELETE_COMMENT
} from '../actions/comments'

import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from '../actions'

const stateData = {
  data: []
}

/**
 * @description Posts and their states based on their actions
 * @param {object} [state=stateData] 
 * @param {object} action
 * @returns {object} An updated copy of the current state
 */
const posts = (state = stateData, action) => {
  const {
    posts,
    post,
    order,
    comments,
    comment
  } = action

  const { data } = state

  switch (action.type) {

    /**
     * @description Manages the state of all posts
     * @returns The updated copy of the previous state
     */
    case GET_POSTS:
      return {
        ...state,
        data: posts.data.sort((posts, post) => posts.voteScore < post.voteScore)
      }

    case GET_POST_BY_ID:
      return {
        ...state,
        data: [post.data]
      }

    case GET_POST_COMMENTS:
      return {
        ...state,
        comments
      }

    case CREATE_POST:
      return {
        ...state,
        data: data.concat([post.data])
      }

    case DELETE_POST:
      return {
        ...state,
        data: data.filter(posts => posts.id !== post.data.id)
      }

    case CREATE_VOTE_POST:
      return {
        ...state,
        data: data.map(posts => {
          return (
            posts.id === post.data.id
            ? (posts.voteScore = post.data.voteScore, posts)
            : (posts.voteScore, posts)
          )
        }).sort((posts, post) => posts.voteScore < post.voteScore)
      }

    case UPDATE_POST:
      return {
        ...state,
        data: data.filter(posts => posts.id !== post.data.id).concat([post.data])
      }

    case ORDER_POSTS_BY:
      return {
        ...state,
        data:
          order
            ? order === ORDER_POSTS_BY_DATE
              ? data.sort((posts, post) => posts.timestamp < post.timestamp)
              : order === ORDER_POSTS_BY_CATEGORY
                ? data.sort((posts, post) => posts.category > post.category)
                : data.sort((posts, post) => posts.voteScore < post.voteScore)
          : null
      }
    
    /**
     * @description Manages the state of all categories
     */
    case GET_CATEGORIES_BY_POST:
      return {
        ...state,
        data: posts.data
      }
    
    /**
     * @description Manages the state of all comments
     */
    case CREATE_COMMENT:
      return {
        ...state,
        comments: {
          data: state.comments.data.concat(comment.data)
        },
        data: data.map(post => 
          post.id === comment.data.parentId
          ? (post.commentCount += 1, post)
          : post
        )
      }

    case CREATE_VOTE_COMMENT:
      return {
        ...state,
        comments: {
          data: state.comments.data.map(comments => {
            return (
              comments.id === comment.data.id
              ? (comments.voteScore = comment.data.voteScore, comments)
              : (comments.voteScore, comments)
            )
          }).sort((comments, comment) => comments.voteScore < comment.voteScore)
        }
      }

    case DELETE_COMMENT:
      return {
        ...state,
        comments: {
          data: state.comments.data.filter(comments => comments.id !== comment.data.id)
        }
      }

    default:
      return state
  }
}

/**
 * @description Categories and their states based on their actions
 * @param {object} [state=stateData] 
 * @param {object} action 
 * @returns An updated copy of the current state
 */
const categories = (state = stateData, action) => {
  const { categories } = action

  switch(action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        data: categories.data.categories
      }

    default:
      return state
  }
}

/**
 * @description Controls the status of the main dialog
 * @param {boolean} [state={ open: false }] 
 * @param {object} action
 * @returns {object} An updated copy of the current state
 */
const dialog = (state = { open: false }, action) => {
  switch(action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        open: true
      }

    case CLOSE_DIALOG:
      return {
        ...state,
        open: false
      }

    default:
      return state
  }
}

/** 
 * Exports and combines
 * all reducers to serve the store
 */
 export default combineReducers({
  posts,
  categories,
  dialog,
  router: routerReducer,
  form: formReducer
})
