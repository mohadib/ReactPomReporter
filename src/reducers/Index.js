/**
 * Created by mohadib on 1/30/17.
 */
import {combineReducers} from "redux"
import credReducer from './CredentialReducer'
import activeCredReducer from './ActiveCredentialReducer'

export default combineReducers({
    credentials: credReducer,
    active: activeCredReducer
})