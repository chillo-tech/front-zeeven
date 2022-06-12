import React, {createContext, useCallback, useMemo, useReducer} from 'react'
import { SIGN_OUT, SIGN_IN, SECURITY_TOKEN } from '../utils';
import { securityReducer } from './reducers';

export const SecurityContext = createContext();

function SecurityContextProvider({children}) {
  const [state, dispatch] = useReducer(securityReducer, {})
  const signIn = useCallback((data) => dispatch({ type: SIGN_IN, data}),[]);
  const signOut = useCallback(() => { sessionStorage.removeItem(SECURITY_TOKEN); dispatch({ type: SIGN_OUT})},[]);

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
    <SecurityContext.Provider value={valueMemo}>{children}</SecurityContext.Provider>
  )
}

export default SecurityContextProvider;
