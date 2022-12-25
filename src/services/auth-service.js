import axios from "axios";

const API_URL = process.env.REACT_APP_FACEBOOK_COMMUNICATOR_BACKEND;

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
    
    sendAccessToken=(accessToken)=> {
        console.log("send access token", accessToken, `${API_URL}access-token`);
       return axios.post(`${API_URL}access-token`, {accessToken});
    }

    getUser = () => {
        return JSON.parse(localStorage.getItem("user"));
    }

}

export default new AuthService();
