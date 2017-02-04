import axios from 'axios'
import { browserHistory } from 'react-router'
import { newInfomationAlert, newErrorAlert } from './AlertsService'

axios.defaults.baseURL = '/api'

export default function (urlBase, actionTypes, createFn )
{

   function deleteAction( dispatch, state )
   {
      return function( id )
      {
         console.log('delete action called in rest ' + urlBase);
         dispatch({ type: actionTypes.DELETE_REQUEST, payload: id });
         axios.delete( urlBase + "/" + id )
         .then( (resp)=> {
            dispatch({ type: actionTypes.DELETE_SUCCESS, payload: id });
            dispatch( newInfomationAlert('Entity deleted') );
            browserHistory.push(urlBase)
         })
         .catch( (err)=> {
            dispatch({type: actionTypes.DELETE_ERROR, payload: err});
            dispatch( newErrorAlert(err.response.data.msg));
         });
      }
   }

   function saveAction( dispatch, state )
   {
      return function( entity )
      {
         console.log('save action called in rest ' + urlBase);
         dispatch({ type: actionTypes.SAVE_REQUEST, payload: entity });
         axios.post( urlBase, entity )
         .then((resp)=>{
            dispatch({type: actionTypes.SAVE_SUCCESS, payload: createFn(resp.data)});
            dispatch( newInfomationAlert('Entity saved') );
            browserHistory.push(urlBase)
         })
         .catch((err) => {
            dispatch({type: actionTypes.SAVE_ERROR, payload: err});
            dispatch( newErrorAlert(err.response.data.msg));
         });
      }
   }

   function updateAction(dispatch, state)
   {
      return (entity) =>
      {
         console.log('update action called in rest ' + urlBase);
         dispatch({type: actionTypes.UPDATE_REQUEST, payload: entity});
         axios.patch(urlBase, entity)
         .then((resp) => {
            dispatch({type: actionTypes.SAVE_SUCCESS, payload: createFn(resp.data)});
            dispatch( newInfomationAlert('Entity Saved') );
            browserHistory.push(urlBase);
         })
         .catch((err) => {
            dispatch({type: actionTypes.SAVE_ERROR, payload: err});
            dispatch( newErrorAlert(err.response.data.msg));
         });
      }
   }

   function getAll( dispatch, state)
   {
      return () =>
      {
         console.log('getAll action called in rest ' + urlBase);
         dispatch({type: actionTypes.GET_LIST_REQUEST });
         axios.get(urlBase)
         .then((resp) =>
         {
            dispatch({type: actionTypes.GET_LIST_SUCCESS, payload: resp.data.map(createFn)})
         })
         .catch((err) => dispatch({type: actionTypes.GET_LIST_ERROR, payload: err}))
      }
   }


   function getOne(dispatch, state)
   {
      return (id) =>
      {
         console.log('getOne action called in rest ' + urlBase);
         dispatch({type: actionTypes.GET_ONE_REQUEST });
         axios.get(urlBase + "/" + id)
         .then((resp) => dispatch({type: actionTypes.GET_ONE_SUCCESS, payload: createFn(resp.data)}))
         .catch((err) => dispatch({type: actionTypes.GET_ONE_ERROR, payload: err}))
      }
   }

   return Object.freeze({
      saveAction: saveAction,
      updateAction: updateAction,
      getAll: getAll,
      getOne: getOne,
      deleteAction: deleteAction
   });
}

