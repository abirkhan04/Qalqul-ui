import { IPaginationParams } from "../interfaces/app-interfaces";
import HomeService from "../services/home.service";

export function getMovies() {
  return HomeService.getMovies();
}

export function getPagedMovies(params: IPaginationParams) {
  return HomeService.getPagedMovies(params);
}
