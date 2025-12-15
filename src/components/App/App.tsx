
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { toast, Toaster } from "react-hot-toast";

import { getMovies } from "../../services/movieService";
import type { MoviesResponse } from "../../services/movieService";

import type { Movie } from "../../types/movie";

import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

 const { data, isLoading, isError, isSuccess, isFetching } = useQuery<MoviesResponse, Error>({
  queryKey: ["movies", query, page],
  queryFn: () => getMovies(query, page),
  enabled: query.length > 0,
  placeholderData: { results: [], page: 1, total_pages: 1, total_results: 0 } as MoviesResponse,
  // Я намагалася додати keepPreviousData у виклик useQuery для плавної пагінації,
  //  але у моєму проєкті TypeScript постійно підсвічує його червоним і видає помилки.
});

useEffect(() => {
  if (isSuccess && !isFetching && query.length > 0 && data?.results.length === 0) {
    toast.error("No movies found for this query.");
  }
}, [isSuccess, isFetching, data, query]);


  return (
    <div>
      <Toaster />

      <SearchBar
        onSubmit={(searchQuery) => {
          setQuery(searchQuery);
          setPage(1);
        }}
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Error loading movies." />}

      {isSuccess && data?.results.length > 0 && (
        <MovieGrid
          movies={data.results}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {}
      {selectedMovie && (
        <MovieGrid
          movies={[selectedMovie]}
          onSelect={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;

