import { IPaginationParams } from "../interfaces/app-interfaces";
import RestService from "./rest-service";

class HomeService extends RestService{
   getMovies = ()=> {
       return this.get(`movies`);
   }

   getPagedMovies = (params: IPaginationParams)=> {
       return this.get(`movies/paged-movies/${params.pageNumber}/${params.pageSize}`);
   }
}

export default new HomeService();
