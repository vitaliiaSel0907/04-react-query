import React, { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal"; 
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void; // <- обов’язково
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={css.movieCard}
        onClick={() => {
          setIsOpen(true);
          onClick?.(); // виклик пропа, якщо він є
        }}
      >
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className={css.image}
          />
        )}
        <div className={css.description}>
          <h3 className={css.title}>{movie.title}</h3>
          <p className={css.details}>
            {movie.release_date} • {movie.vote_average}/10
          </p>
        </div>
      </div>

      {isOpen && <MovieModal movie={movie} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default MovieCard;




