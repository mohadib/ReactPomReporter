/**
 * Created by mohadib on 1/30/17.
 */
import {CredentialActions} from '../actions/ActionTypes'
import { newInfomationAlert } from './AlertsService'
import axios from 'axios'
import { browserHistory } from 'react-router'

const urlBase = '/credentials';

export function saveActionCreator(dispatch, state)
{
   return (credential) =>
   {
      dispatch({type: CredentialActions.SAVE_REQUEST, payload: credential});

      axios.post(urlBase, credential)
      .then((resp) =>{
         dispatch({type: CredentialActions.SAVE_SUCCESS, payload: resp.data});
         dispatch( newInfomationAlert("Credential Saved") );
         browserHistory.push('/credentials')
      })
      .catch((err) => dispatch({type: CredentialActions.SAVE_ERROR, payload: err}));
   }
}

export function updateActionCreator(dispatch, state)
{
   return (credential) =>
   {
      dispatch({type: CredentialActions.UPDATE_REQUEST, payload: credential});

      axios.patch(urlBase, credential)
      .then((resp) => dispatch({type: CredentialActions.SAVE_SUCCESS, payload: resp.data}))
      .catch((err) => dispatch({type: CredentialActions.SAVE_ERROR, payload: err}));
   }
}

export function getAll(dispatch, state)
{
   return () =>
   {

      dispatch({type: CredentialActions.GET_LIST_REQUEST, payload: null});
      axios.get(urlBase)
      .then((resp) => dispatch({type: CredentialActions.GET_LIST_SUCCESS, payload: resp.data}))
      .catch((err) => dispatch({type: CredentialActions.GET_LIST_ERROR, payload: err}))
   }
}

export function getOne(dispatch, state)
{
   return (id) =>
   {
      dispatch({type: CredentialActions.GET_ONE_REQUEST, payload: null});
      axios.get(urlBase + "/" + id)
      .then((resp) => dispatch({type: CredentialActions.GET_ONE_SUCCESS, payload: resp.data}))
      .catch((err) => dispatch({type: CredentialActions.GET_ONE_ERROR, payload: err}))
   }
}
