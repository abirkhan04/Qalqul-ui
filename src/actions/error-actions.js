import { RESET_API_ACTION } from "./action-types";

export const resetApiAction= ()=>(dispatch)=> {
    dispatch({
        type: RESET_API_ACTION,
    });
}
