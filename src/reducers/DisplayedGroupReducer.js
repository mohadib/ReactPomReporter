import { DisplayedGroup, ProjectGroupActions } from '../actions/ActionTypes'
export default function reduce(state={selected:null}, action)
{
   if( action.type === DisplayedGroup.GROUP_SELECTED )
   {
      state = { selected:action.payload }
   }
   else if( state.selected !== null && action.type === ProjectGroupActions.GET_LIST_SUCCESS )
   {
      //refresh 'selected' if we find it in a getAll request
      state = { selected:action.payload.find((group)=> group.id === state.selected.id) }
   }
   else if( state.selected !== null && action.type === ProjectGroupActions.GET_ONE_SUCCESS )
   {
      if( action.payload.id === state.selected.id )
      {
         //refresh 'selected' if we find it in a getOne request
         state = { selected:action.payload }
      }
   }
   return state;
}