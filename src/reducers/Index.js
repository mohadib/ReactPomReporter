import {combineReducers} from "redux"
import { CredentialActions, ProjectActions, ProjectGroupActions } from '../actions/ActionTypes'
import crudReducer from './CrudReducer'
import alertsReducer from './AlertsReducer'
import displayedGroupReducer from './DisplayedGroupReducer'


export default combineReducers({
   credentials: crudReducer('Credential', 'Credentials', CredentialActions),
   projects: crudReducer('Project', 'Projects', ProjectActions),
   projectgroups: crudReducer('ProjectGroup', 'ProjectGroups', ProjectGroupActions),
   displayedgroup: displayedGroupReducer,
   alerts: alertsReducer,
})