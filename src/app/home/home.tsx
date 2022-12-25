import React, { useEffect, useState , lazy } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPagedMoviesAsync, selectPagedMovies } from '../home/HomeSlice';
import Styles from './Home.module.css';
import { MovieCard } from '../shared/movie-card';
import { IPaginationParams } from '../interfaces/app-interfaces';

const Pagination = lazy(()=> import('../shared/Pagination'));

export default function Home() {
    const pagedMovies = useAppSelector(selectPagedMovies);
    const [params, setParams] = useState<IPaginationParams>({ pageSize: 2, pageNumber: 1}); 
    const dispatch = useAppDispatch();
   
    useEffect(()=> {
       dispatch(getPagedMoviesAsync(params));
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const nextClicked = () => {
      setParams((prevState) => {
          return { ...prevState, pageNumber: prevState.pageNumber + 1 }
      });
  }

  const previousClicked = () => {
      setParams((prevState) => {
          return { ...prevState, pageNumber: prevState.pageNumber - 1 }
      });
  }

  const linkClicked = (pageNumber: number) => {
      setParams((prevState) => {
          return { ...prevState, pageNumber: pageNumber }
      });
  }

  const pageSizeChanged = (pageSize: number) => {
      const pageNumber = pageSize > params.pageSize ? Math.ceil((params.pageNumber * params.pageSize)/pageSize): params.pageNumber;
      setParams({ ...params, pageSize, pageNumber });
  }

    const events = {linkClicked, nextClicked, previousClicked, pageSizeChanged};

    return <div className={Styles.root}>{pagedMovies.movies.map((movie)=> <MovieCard key={movie.title} card={movie}/>)}
       <Pagination {...params} {...events} pageCount={pagedMovies.pageCount} />
    </div>
}
