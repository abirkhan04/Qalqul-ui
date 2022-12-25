import {
  LOGIN_SUCCESS,
  LOGIN_FAIL, GET_RIGHTS, GET_RIGHTS_ERROR, GET_PASSWORD_REQUESTS
} from "../actions/action-types";
import CONSTANTS from "../constants.js";

const initialState = {
  user: CONSTANTS.EMPTY_STRING,
  authError: CONSTANTS.EMPTY_STRING,
  forgetPasswords: [],
  isLoggedIn: false
};

export default function authReducers(state = initialState, action) {

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authError: action.authError,
        isLoggedIn: action.isLoggedIn
      };
    case GET_RIGHTS:
      return {
        ...state,
        rights: action.rights
      };
    case GET_RIGHTS_ERROR:
      return {
        ...state
      };
    case GET_PASSWORD_REQUESTS:
      return { ...state, forgetPasswords: action.forgetPasswords.reverse() }
    default:
      return state;
  }

}
