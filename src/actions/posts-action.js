import PostService from "../services/post-service";
import { GET_POSTS } from "./action-types";

export const getPosts = () => dispatch => {
    return PostService.getPosts().then((response) => {
        dispatch({
            posts: response.data,
            type: GET_POSTS
        })
    });
}
