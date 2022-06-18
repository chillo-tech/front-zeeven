import React,{useEffect} from 'react';
import { ApplicationContext,EventContext } from '../context';
import { SECURITY_TOKEN } from '../utils';
import OpenedStack from './opened/OpenedStack';
import ProtectedStack from './protected/Index';

function ApplicationLayout() {
  const {state: {isAuthenticated}, signIn, signOut} = React.useContext(ApplicationContext);
  useEffect(() => {
      const token = sessionStorage.getItem(SECURITY_TOKEN);
      if(token) {
        signIn({token});
      } else {
        signOut();
      }
      
  }, [isAuthenticated, signIn, signOut])

  return (
    <section className='bg-slate-200 min-h-screen'>
      {
        isAuthenticated ? 
            <EventContext>
             <ProtectedStack />
            </EventContext> : 
            <OpenedStack />
      }
    </section>
  )
}

export default ApplicationLayout