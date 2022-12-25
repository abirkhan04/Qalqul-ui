import AuthService from "../services/auth-service";
import { API_ACTION, LOGIN_SUCCESS } from "./action-types";

export const authenticateUser = (user) => (dispatch) => {
    return AuthService.authenticate(user).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch({
            type: LOGIN_SUCCESS,
            token: response.data.token,
            isLoggedIn: true,
        });
    }, err => {
        dispatch({
            type: API_ACTION,
            errors: { message: err.response.data }
        })
    });
};

export const sendAccessToken = (token)=>(dispatch)=> {
    localStorage.setItem('token', token);
    return AuthService.sendAccessToken(token).then((response)=> {
        dispatch({
            type: LOGIN_SUCCESS,
            token: response.data.token,
            isLoggedIn: true,
        });
    });
}
