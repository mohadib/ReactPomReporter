export default function crudReducer(entityName, entityNamePlural, actions)
{
   const entName = entityName.toLowerCase();
   const entNamePlural = entityNamePlural.toLowerCase();

   const defaultState = {
      [entName]:null,
      editing:false,
      saving:false,
      saved:false,
      err:null,
      list: {
         [entNamePlural]:[],
         saving:false,
         fetching:false,
         err:null
      }
   };

   const actionMap = Object.freeze({
      [actions.PROPERTY_UPDATED]: function (state, action)
      {
         return {...state, [entName]: action.payload, editing: true,  err: null, saving: false, saved: false}
      },
      [actions.CREATE_NEW]: function (state, action)
      {
         return {...state, [entName]: action.payload, editing: false, err: null, saving: false, saved: false}
      },
      [actions.GET_ONE_SUCCESS]: function (state, action)
      {
         return {...state, [entName]: action.payload, editing: false, err: null, saving: false, saved: false}
      },
      [actions.SAVE_SUCCESS]: function (state, action)
      {
         return {...state, [entName]: action.payload, editing: false, err: null, saving: false, saved: true}
      },
      [actions.GET_ONE_ERROR]: function (state, action)
      {
         return {...state, [entName]: null, editing: false, err: action.payload, saving: false, saved: false}
      },
      [actions.CLEAR_ALL]: function (state, action)
      {
         return {...state, [entName]: null, editing: false,  err: null,  saving: false, saved: false}
      },
      [actions.SAVE_ERROR]: function (state, action)
      {
         return {...state, err: action.payload, saving: false, saved: false}
      },
      [actions.SAVE_REQUEST]: function (state, action)
      {
         return {...state, saving: true, saved: false}
      },
      [actions.UPDATE_REQUEST]: function (state, action)
      {
         return {...state, saving: true, saved: false}
      },
      [actions.RESET_ALERTS]: function (state, action)
      {
         return {...state, err: null, saved: false}
      },
      //LIST ACTIONS
      [actions.GET_LIST_REQUEST]: function (state, action)
      {
         return {...state, list:{...state.list, saving:false, fetching:true, err:null } }
      },
      [actions.GET_LIST_SUCCESS]: function (state, action)
      {
         return {...state, list:{...state.list, saving:false, fetching:false, err:null, [entNamePlural]: action.payload }}
      },
      [actions.GET_LIST_ERROR]: function (state, action)
      {
         return {...state, list:{...state.list, saving:false, fetching:false, err:action.payload} }
      }
   });

   return function( state=defaultState, action )
   {
      console.log( "Received action in CRUD reducer: ", action.type)
      let handler = actionMap[action.type];
      return handler === undefined ? state : handler(state, action);
   }
}