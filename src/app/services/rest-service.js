import axios from "axios";
import AuthService from './auth.service';

const API_URL = process.env.REACT_APP_MOVIES_BACKEND;

export default class RestService {

    get = (url) => {
        return axios.get(`${API_URL}${url}`, this.config);
    };

    post = (url, params) => {
        return axios.post(`${API_URL}${url}`, params, this.config);
    };

    put = (url, params) => {
        return axios.put(`${API_URL}${url}`, params, this.config);
    };

    delete = (url) => {
        return axios.delete(`${API_URL}${url}`, this.config);
    }

    get config() {
        return {
            headers: {
                'Authorization': `Bearer ${AuthService.getToken()}`
            }
        }
    };
}
