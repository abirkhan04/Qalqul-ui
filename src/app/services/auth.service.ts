import axios from "axios";
import { IkeyValue, User } from "../interfaces/app-interfaces";

const API_URL = process.env.REACT_APP_MOVIES_BACKEND;

class AuthService  {

    authenticate = (user: IkeyValue) => {
        const url = `auth/login`;
        return axios.post(API_URL + url, user);
    }

    getToken = () => {
        return localStorage.getItem("token");
    }

    register = (user: User) => {
        return axios.post(`${API_URL}register`, user);
    }

}

export default new AuthService();
