import {ProjectActions} from '../actions/ActionTypes';
import Project from '../models/Project'

const actionMap = Object.freeze({
   [ProjectActions.PROPERTY_UPDATED]: function (state, action)
   {
      return {...state, project: action.payload, editing: true, err: null, saving: false, saved: false}
   },
   [ProjectActions.CREATE_NEW]: function (state, action)
   {
      return {...state, project: action.payload, err: null, editing: false, saving: false, saved: false}
   },
   [ProjectActions.GET_ONE_SUCCESS]: function (state, action)
   {
      return {...state, project: action.payload, err: null, editing: false, saving: false, saved: false}
   },
   [ProjectActions.GET_ONE_ERROR]: function (state, action)
   {
      return {...state, project: null, err: action.payload, editing: false, saving: false, saved: false}
   },
   [ProjectActions.SAVE_ERROR]: function (state, action)
   {
      return {...state, err: action.payload, saving: false, saved: false}
   },
   [ProjectActions.SAVE_REQUEST]: function (state, action)
   {
      return {...state, saving: true, saved: false}
   },
   [ProjectActions.UPDATE_REQUEST]: function (state, action)
   {
      return {...state, saving: true, saved: false}
   },
   [ProjectActions.SAVE_SUCCESS]: function (state, action)
   {
      let cred = new Project().copy(action.payload);
      return {...state, project: cred, saving: false, editing: false, err: null, saved: true}
   },
   [ProjectActions.RESET_ALERTS]: function (state, action)
   {
      return {...state, err: null, saved: false}
   },
   [ProjectActions.CLEAR_ALL]: function (state, action)
   {
      return {...state, project: null, editing: false, saving: false, err: null, saved: false}
   }
});

export default function reduce(state = {
   project: null,
   editing: false,
   saving: false,
   err: null,
   saved: false
}, action)
{
   let handler = actionMap[action.type];
   return handler === undefined ? state : handler(state, action);
}
