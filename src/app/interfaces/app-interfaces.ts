export interface IkeyValue {
  [key: string]: any;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
}

export interface Movie {
  title: string;
  detail: string;
  rating: number;
}

export interface IPaginationParams {
   pageSize: number;
   pageNumber: number;
}

export interface PagedMovies {
  pageCount: number;
  movies: Movie[];
}
