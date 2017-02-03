import { ProjectGroupActions } from '../actions/ActionTypes'

export default function reduce( state={ projectgroups:[], saving:false, fetching:false, err:null }, action )
{
   if( action.type === ProjectGroupActions.GET_LIST_REQUEST )
   {
      state = { ...state, fetching:true }
   }
   else if( action.type === ProjectGroupActions.GET_LIST_SUCCESS )
   {
      return state = { ...state, fetching:false, projectgroups: action.payload };
   }
   else if( action.type === ProjectGroupActions.GET_LIST_ERROR )
   {
      return state = { ...state, fetching:false, err:action.payload }
   }
   return state;
}