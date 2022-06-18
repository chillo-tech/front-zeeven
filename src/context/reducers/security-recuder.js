import {SIGN_OUT, SIGN_IN,INITIAL_STATE} from '../../utils';
import jwt_decode from "jwt-decode";

export function securityReducer(state = INITIAL_STATE, action) {
  const {type, data = {token: ''}} = action;
  switch (type) {
    case SIGN_IN: {
      const userInToken = jwt_decode(data.token);
      return {
        ...state, 
        ...data,
        user: {
        ...userInToken, 
        name: `${userInToken.firstName} ${userInToken.lastName}`
        },
        isAuthenticated: true
      }
    }
    case SIGN_OUT: {
      return INITIAL_STATE
    }
    default: {
      return state
    }
  }
}
