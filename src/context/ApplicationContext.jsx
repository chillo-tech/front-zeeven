import React, {createContext, useCallback, useMemo, useReducer} from 'react'
import { SIGN_OUT, SIGN_IN, SECURITY_TOKEN } from '../utils';
import { securityReducer } from './reducers';

export const ApplicationContext = createContext();

function ApplicationContextProvider({children}) {
  const [state, dispatch] = useReducer(securityReducer, {})
  const signIn = useCallback((data) => {
    sessionStorage.setItem(SECURITY_TOKEN, data.token);
    dispatch({ type: SIGN_IN, data});
  },[]);
  const signOut = useCallback(() => { 
    sessionStorage.removeItem(SECURITY_TOKEN); 
    dispatch({ type: SIGN_OUT})
  },[]);

  const valueMemo = useMemo(
    () => ({
      state,
      signIn,
      signOut,
    }),
    [
      state,
      signIn,
      signOut
    ],
  );
 
  return (
    <ApplicationContext.Provider value={valueMemo}>{children}</ApplicationContext.Provider>
  )
}

export {ApplicationContextProvider};
