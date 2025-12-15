import React from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <div className={css.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelect(movie)} 
        />
      ))}
    </div>
  );
};

export default MovieGrid;
