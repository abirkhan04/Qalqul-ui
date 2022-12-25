import UserService from "../services/user-service";
import AuthService from "../services/auth-service";
import { GET_USERS, SAVE_USER, API_ACTION, DELETE_USER } from "./action-types";
import authService from "../services/auth-service";

export const getUsers = () => dispatch => {
    return UserService.getUsers().then((response) => {
        dispatch({
            users: response.data,
            type: GET_USERS
        })
    });
}

export const saveUser = (user)=> (dispatch) => {
    user.storeId = authService.getUser().storeId;
    return UserService.save(user).then((response)=> {
          dispatch([{
              type: SAVE_USER,
              user: response.data,
          }, {
              type: API_ACTION,
              success: "User is saved successfully"
          }])
    }, err=> {
        dispatch({
            type: API_ACTION,
            errors: {message: err.response.data}
        })
    });
}

export const updatePassword = (password) =>  dispatch=> {
    let user = AuthService.getUser();
    user.password = password;
    return UserService.save(user).then((response) => {
        dispatch([{
            type: SAVE_USER,
            user: response.data,
        }, {
            type: API_ACTION,
            success: "User saved successfully"
        }])
  }, err=> {
      dispatch({
          type: API_ACTION,
          errors: {message: err.response.data}
      })
  });
}

export const deleteUser = (id)=> (dispatch)=> {
    return UserService.deleteUser(id).then((response)=> {
         dispatch([{
            type: DELETE_USER,
            user: response.data,
         },
         {
            type: API_ACTION,
            success: "User is deleted successfully"
         }
        ]);
    }, (error)=> {
        return dispatch({
             type: API_ACTION,
             errors: error.response.data
        });
    });
}
