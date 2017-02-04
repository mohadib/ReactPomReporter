import { DisplayedGroup } from '../actions/ActionTypes'
export default function reduce(state={selected:null}, action)
{
   if( action.type === DisplayedGroup.GROUP_SELECTED )
   {
      state = { selected:action.payload }
   }
   return state;
}