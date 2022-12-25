import axios from "axios";

const API_URL = process.env.REACT_APP_SHOPMANAGEMENT_BACKEND;

class AuthService  {

    authenticate = (user) => {
        return axios.post(`${API_URL}login`, user);
    }

    sendPasswordRequest = (username) => {
        return axios.post(`${API_URL}forget-password`, { username });
    }

    getToken = () => {
        return localStorage.getItem("token");
    }

    getStore = () => {
        return JSON.parse(localStorage.getItem("user")).store;
    }

    getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

    register = (user) => {
        return axios.post(`${API_URL}register`, user);
    }

}

export default new AuthService();
