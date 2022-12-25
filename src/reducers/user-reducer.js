import { GET_USERS, SAVE_USER, DELETE_USER } from "../actions/action-types";

const initialState = {
    users: [],
    user: []
};

export default function userReducers(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return { ...state, users: action.users.reverse() };
        case SAVE_USER:
            return { ...state, user: action.user };
        case DELETE_USER:
            return { ...state, user: action.user };
        default:
            return state;
    }
}
