/**
 * Created by mohadib on 1/30/17.
 */
import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"

import reducer from './reducers/Index'

const middleware = applyMiddleware( thunk, logger());

export default createStore(reducer, middleware)