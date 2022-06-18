import { useEffect, useState,useContext } from 'react';
import { ApplicationContext } from '../../context';

export function useUser() {

  const {state: {user}, signOut} = useContext(ApplicationContext);
  const [userInfos, setUserInfos] = useState({firstName:  ''});

  useEffect(() => {
    if (user) {
      setUserInfos(user)
    } else {
      signOut()
    }
  }, [user, signOut])
  return {userInfos, signOut}
}
