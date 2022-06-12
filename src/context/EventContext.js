import { createContext, useCallback, useMemo, useReducer } from 'react';
import { INITIAL_STATE,UPDATE_STEP, UPDATE_DATES, UPDATE_EVENT, UPDATE_CONTACT, RESET_EVENT } from '../utils';

import eventReducer from './reducers/EventReducer';

export const NewEventContext = createContext({});

function EventContext({children}) {
  const [state, dispatch] = useReducer(eventReducer, INITIAL_STATE);
  const updateStep = useCallback((data) => dispatch({ type: UPDATE_STEP, data}),[]);
  const updateDates = useCallback((data) => dispatch({ type: UPDATE_DATES, data}),[]);
  const updateContact= useCallback((data) => dispatch({type: UPDATE_CONTACT, data }),[]);
  const resetEvent= useCallback(() => dispatch({type: RESET_EVENT}),[]);
  const updateEvent = useCallback((data) => dispatch({data, type: UPDATE_EVENT}),[]);
  const valueMemo = useMemo(
    () => ({
      state,
      resetEvent,
      updateDates,
      updateContact,
      updateEvent,
      updateStep
    }),
    [
      state,
      resetEvent,
      updateDates,
      updateContact,
      updateEvent,
      updateStep
    ],
  );
 
  return (
    <NewEventContext.Provider value={valueMemo}>
     {children}
    </NewEventContext.Provider>
  )
}
export default EventContext;