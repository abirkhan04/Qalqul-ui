import axios from "axios";
import authService from "./auth-service";

export default class RestService {

    get = (url) => {
        return axios.get(url, this.config);
    };

    post = (url, params) => {
        return axios.post(url, params, this.config);
    };

    put = (url, params) => {
        return axios.put(url, params, this.config);
    };

    delete = (url) => {
        return axios.delete(url, this.config);
    }

    get config() {
        return {
            headers: {
                'x-access-token': authService.getToken()
            }
        }
    };
}
