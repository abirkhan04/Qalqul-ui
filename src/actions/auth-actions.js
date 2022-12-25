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

export const sendPasswordRequest = (username) => (dispatch) => {
    return AuthService.sendPasswordRequest(username).then(() => {
        dispatch({
            type: API_ACTION,
            success: "Request submitted"
        });
    }, err =>
        dispatch({
            type: API_ACTION,
            errors: { message: err.response.data }
        })
    );
}

export const registerUser = (user) => (dispatch) => {
    return AuthService.register(user).then((response) => {
        dispatch({
            type: API_ACTION,
            success: "Submitted successfully. Please wait for approval."
        });
    }, err => {
        dispatch({
            type: API_ACTION,
            errors: { message: err.response.data }
        })
    });
}
