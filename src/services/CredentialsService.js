/**
 * Created by mohadib on 1/30/17.
 */
import {CredentialActions} from '../actions/ActionTypes'
import axios from 'axios'


const urlBase = '/credentials';

export function saveActionCreator(dispatch, state) {
    return (credential) => {
        dispatch({type: CredentialActions.SAVE_REQUEST, payload: credential});

        axios.post(urlBase, credential)
            .then((resp) => dispatch({type: CredentialActions.SAVE_SUCCESS, payload: resp.data}))
            .catch((err) => dispatch({type: CredentialActions.SAVE_ERROR, payload: err}));
    }
}

export function updateActionCreator(dispatch, state) {
    return (credential) => {
        dispatch({type: CredentialActions.UPDATE_REQUEST, payload: credential});

        axios.patch(urlBase, credential)
            .then((resp) => dispatch({type: CredentialActions.SAVE_SUCCESS, payload: resp.data}))
            .catch((err) => dispatch({type: CredentialActions.SAVE_ERROR, payload: err}));
    }
}

export function getAll( dispatch, state ){
    return () => {

        dispatch({type: CredentialActions.GET_LIST_REQUEST, payload:null});
        axios.get(urlBase)
            .then((resp) => dispatch({ type: CredentialActions.GET_LIST_SUCCESS, payload: resp.data }))
            .catch((err) => dispatch({ type: CredentialActions.GET_LIST_ERROR, payload: err }))
    }
}
