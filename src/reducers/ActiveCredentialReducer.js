/**
 * Created by jdavis on 1/31/17.
 */

import {CredentialActions} from '../actions/ActionTypes';
import Credential from '../models/Credential'

const actionMap = Object.freeze({
   [CredentialActions.PROPERTY_UPDATED]: function (state, action)
   {
      return {...state, credential: action.payload, editing: true, err: null, saving: false, saved: false}
   },
   [CredentialActions.CREATE_NEW]: function (state, action)
   {
      return {...state, credential: action.payload, err: null, editing: false, saving: false, saved: false}
   },
   [CredentialActions.GET_ONE_SUCCESS]: function (state, action)
   {
      return {...state, credential: action.payload, err: null, editing: false, saving: false, saved: false}
   },
   [CredentialActions.GET_ONE_ERROR]: function (state, action)
   {
      return {...state, credential: null, err: action.payload, editing: false, saving: false, saved: false}
   },
   [CredentialActions.SAVE_ERROR]: function (state, action)
   {
      return {...state, err: action.payload, saving: false, saved: false}
   },
   [CredentialActions.SAVE_REQUEST]: function (state, action)
   {
      return {...state, saving: true, saved: false}
   },
   [CredentialActions.UPDATE_REQUEST]: function (state, action)
   {
      return {...state, saving: true, saved: false}
   },
   [CredentialActions.SAVE_SUCCESS]: function (state, action)
   {
      let cred = new Credential().copy(action.payload);
      cred.password = '';
      return {...state, credential: cred, saving: false, editing: false, err: null, saved: true}
   },
   [CredentialActions.RESET_ALERTS]: function (state, action)
   {
      return {...state, err: null, saved: false}
   },
   [CredentialActions.CLEAR_ALL]: function (state, action)
   {
      return {...state, credential: null, editing: false, saving: false, err: null, saved: false}
   }
});

export default function reduce(state = {
   credential: null,
   editing: false,
   saving: false,
   err: null,
   saved: false
}, action)
{
   let handler = actionMap[action.type];
   return handler === undefined ? state : handler(state, action);
}
