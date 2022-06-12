import { useEffect, useState,useContext } from 'react';
import { SecurityContext } from '../../context';

export function useUser() {

  const {state: {user}, signOut} = useContext(SecurityContext);
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
