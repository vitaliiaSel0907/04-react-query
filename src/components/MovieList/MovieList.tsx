import React from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

interface Props {
  movies: Movie[];
}

const MoviesList: React.FC<Props> = ({ movies }) => {
  return (
    <div className={css.moviesList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
