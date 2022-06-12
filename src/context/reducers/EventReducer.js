import { INITIAL_STATE, UPDATE_STEP, UPDATE_DATES, UPDATE_EVENT, UPDATE_CONTACT, RESET_EVENT } from "../../utils";


function eventReducer(state = INITIAL_STATE, action) {
  const {type, data} = action;
  let newState = INITIAL_STATE;
  switch (type) {
    case UPDATE_STEP: {
      newState = {...state, step: data }
      break;
    }
    case UPDATE_CONTACT: {
      newState = {
        ...state, 
        event: {
          ...state.event, 
          contacts: [...state.event.contacts, data]
        }
      }
      break;
    }
    case UPDATE_DATES: {
      newState = {
        ...state, 
        event: {
          ...state.event, 
          dates: data
        }
      }
      break;
    }
    case UPDATE_EVENT: {
      newState = {...state, event: {...state.event}};
       break;
    }
    case RESET_EVENT: {
      newState = INITIAL_STATE;
       break;
    }
    default: {
      newState = state;
    }
  }
  
  return newState;
  
}
export default eventReducer;