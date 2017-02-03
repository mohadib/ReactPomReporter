import { ProjectActions } from '../actions/ActionTypes'

export default function reduce( state={ projects:[], saving:false, fetching:false, err:null }, action )
{
   if( action.type === ProjectActions.GET_LIST_REQUEST )
   {
      state = { ...state, fetching:true }
   }
   else if( action.type === ProjectActions.GET_LIST_SUCCESS )
   {
      return state = { ...state, fetching:false, projects: action.payload };
   }
   else if( action.type === ProjectActions.GET_LIST_ERROR )
   {
      return state = { ...state, fetching:false, err:action.payload }
   }
   return state;
}