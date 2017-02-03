/**
 * Created by mohadib on 1/30/17.
 */
import {combineReducers} from "redux"
import credReducer from './CredentialReducer'
import activeCredReducer from './ActiveCredentialReducer'
import alertsReducer from './AlertsReducer'
import projectReducer from './ProjectsReducer'
import activeProjectReducer from './ActiveProjectReducer'
import projectGroupsReducer from './ProjectGroupsReducer'
import activeProjectGroupReducer from './ActiveProjectGroupReducer'

export default combineReducers({
   credentials: credReducer,
   active: activeCredReducer,
   alerts: alertsReducer,
   projects: projectReducer,
   activeProject: activeProjectReducer,
   projectgroups: projectGroupsReducer,
   activeProjectGroup: activeProjectGroupReducer
})