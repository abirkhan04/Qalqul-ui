import { API_ACTION, RESET_API_ACTION } from "../actions/action-types";

const initialState = {
    message: { errors: null, success: null }
};


export default function apiActionReducers(state = initialState, action) {
    switch (action.type) {
        case API_ACTION:
            const message = { errors: action.errors, success: action.success };
            return { ...state,  message };
        case RESET_API_ACTION:
            return { ...state, message: { errors: false, success: false } };
        default:
            return state;
    }

}
