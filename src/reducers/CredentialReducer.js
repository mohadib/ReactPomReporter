/**
 * Created by mohadib on 1/30/17.
 */

import {CredentialActions} from '../actions/ActionTypes';

export default function reducer( state={credentials:[], saving:false, fetching:false, err:null, credential: null}, action)
{
   if( action.type === CredentialActions.CREATE_NEW || action.type === CredentialActions.PROPERTY_UPDATED)
   {
      state = {...state, credential: action.payload }
   }
   return state;
}