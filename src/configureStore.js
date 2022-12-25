import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reduxMulti from 'redux-multi'
import monitorReducersEnhancer from './enhancer/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers/root-reducer'

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, reduxMulti, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}
