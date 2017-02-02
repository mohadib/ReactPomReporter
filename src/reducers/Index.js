/**
 * Created by mohadib on 1/30/17.
 */
import {combineReducers} from "redux"
import credReducer from './CredentialReducer'
import activeCredReducer from './ActiveCredentialReducer'
import alertsReducer from './AlertsReducer'

export default combineReducers({
   credentials: credReducer,
   active: activeCredReducer,
   alerts: alertsReducer
})