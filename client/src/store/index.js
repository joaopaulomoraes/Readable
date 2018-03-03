import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import reducer from '../recuders'

export
const history = createHistory()

const logger = createLogger({
  predicate: (getState, action) => !action.type.includes('@@redux-form')
})

const router = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      router,
      logger
    )
  )
)

export default store
