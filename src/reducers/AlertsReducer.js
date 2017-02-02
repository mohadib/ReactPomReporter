import { AlertActions } from '../actions/ActionTypes'

export default function reduce( state={ alerts:[] }, action )
{
   if( action.type === AlertActions.NEW_ALERT )
   {
      state = { ...state, alerts: state.alerts.concat(action.payload) }
   }
   else if( action.type === AlertActions.CLEAR_ALERT )
   {
      state = { ...state, alerts: state.alerts.filter( (alert)=> alert.id !== action.payload)}
   }
   else if( action.type === AlertActions.CLEAR_ALERTS )
   {
      state={ alerts:[] }
   }

   return state;
}