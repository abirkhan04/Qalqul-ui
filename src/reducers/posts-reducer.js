import { GET_POSTS } from "../actions/action-types";

const initialState = {
    posts: [],
};


export default function postReducers(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.posts.slice(0,8) };
        default:
            return state;
    }
}
