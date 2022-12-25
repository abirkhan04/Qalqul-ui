import { combineReducers } from "redux";
import  authReducers  from "./auth-reducer";
import apiActionReducers from "./api-action-reducers";
import userReducers from "./user-reducer";
import postReducers from "./posts-reducer";

export default combineReducers({
    authReducers: authReducers,
    apiActionReducers: apiActionReducers,
    userReducers: userReducers,
    postReducers: postReducers
});
