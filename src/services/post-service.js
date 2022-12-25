import RestService from "./rest-service";

const API_URL = process.env.REACT_APP_FACEBOOK_COMMUNICATOR_BACKEND;

class PostService extends RestService {

   getPosts=()=> {
      return this.get(`${API_URL}posts`);
   }

}

export default new PostService();
