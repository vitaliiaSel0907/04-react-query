// src/components/App/App.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import { getMovies } from "../../services/api";
import type { MoviesResponse } from "../../types/movie";

import MoviesList from "../MovieList/MovieList";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import css from "./App.module.css";

const App: React.FC = () => {
 
 const [query, setQuery] = useState("");
 const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => getMovies(query, page),
    enabled: query.length > 0, 
  });

  return (
    <div>
      {/* Поле пошуку */}
      <SearchBar
        onSubmit={(searchQuery) => {
          setQuery(searchQuery);
          setPage(1);            
        }}
      />

      {}
      {isLoading && <Loader />}

      {/* Повідомлення про помилку */}
      {error && <p>Error loading movies.</p>}

      {}
     {data?.results?.length ? <MoviesList movies={data.results} /> : null}



      {}
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
    </div>
  );
};

export default App;


