import RestService from "./rest-service";

const API_URL = process.env.REACT_APP_SHOPMANAGEMENT_BACKEND;

class ForgetPasswordService extends RestService {

    getForgetPasswords = ()=> {
        return this.get(`${API_URL}forget-passwords`);
    }
    deleteForgetPassword = (id) => {
        return this.delete(`${API_URL}forget-password/${id}`);
    }

}

export default new ForgetPasswordService();
