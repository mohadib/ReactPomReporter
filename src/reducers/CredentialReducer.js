/**
 * Created by mohadib on 1/30/17.
 */

import { CredentialActions } from '../actions/ActionTypes'

export default function reducer( state={ credentials:[], saving:false, fetching:false, err:null }, action)
{
   if( action.type === CredentialActions.GET_LIST_REQUEST )
   {
      return state = { ...state, fetching:true}
   }
   else if( action.type === CredentialActions.GET_LIST_SUCCESS )
   {
      return state = { ...state, fetching:false, credentials: action.payload };
   }
   else if( action.type === CredentialActions.GET_LIST_ERROR )
   {
      return state = { ...state, fetching:false, err:action.payload }
   }
   return state;
}