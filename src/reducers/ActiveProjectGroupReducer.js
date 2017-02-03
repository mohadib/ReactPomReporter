import {ProjectGroupActions} from '../actions/ActionTypes';

const actionMap = Object.freeze({
   [ProjectGroupActions.PROPERTY_UPDATED]: function (state, action)
   {
      return {...state, projectgroup: action.payload, editing: true, err: null, saving: false, saved: false}
   },
   [ProjectGroupActions.CREATE_NEW]: function (state, action)
   {
      return {...state, projectgroup: action.payload, err: null, editing: false, saving: false, saved: false}
   },
   [ProjectGroupActions.GET_ONE_SUCCESS]: function (state, action)
   {
      return {...state, projectgroup: action.payload, err: null, editing: false, saving: false, saved: false}
   },
   [ProjectGroupActions.GET_ONE_ERROR]: function (state, action)
   {
      return {...state, projectgroup: null, err: action.payload, editing: false, saving: false, saved: false}
   },
   [ProjectGroupActions.SAVE_ERROR]: function (state, action)
   {
      return {...state, err: action.payload, saving: false, saved: false}
   },
   [ProjectGroupActions.SAVE_REQUEST]: function (state, action)
   {
      return {...state, saving: true, saved: false}
   },
   [ProjectGroupActions.UPDATE_REQUEST]: function (state, action)
   {
      return {...state, saving: true, saved: false}
   },
   [ProjectGroupActions.SAVE_SUCCESS]: function (state, action)
   {
      return {...state, projectgroup: action.payload, saving: false, editing: false, err: null, saved: true}
   },
   [ProjectGroupActions.RESET_ALERTS]: function (state, action)
   {
      return {...state, err: null, saved: false}
   },
   [ProjectGroupActions.CLEAR_ALL]: function (state, action)
   {
      return {...state, projectgroup: null, editing: false, saving: false, err: null, saved: false}
   }
});

export default function reduce(state = {
   projectgroup: null,
   editing: false,
   saving: false,
   err: null,
   saved: false
}, action)
{
   let handler = actionMap[action.type];
   return handler === undefined ? state : handler(state, action);
}
