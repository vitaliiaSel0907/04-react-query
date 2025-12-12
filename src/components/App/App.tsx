
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import { getMovies } from "../../services/api";
import type { MoviesResponse } from "../../types/movie";

import MoviesList from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


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
      {}
      <SearchBar
        onSubmit={(searchQuery) => {
          setQuery(searchQuery);
          setPage(1);            
        }}
      />

    {isLoading && <Loader />}

/* Помилка запиту */
{error && <ErrorMessage message="Error loading movies." />}

/* Якщо запит пройшов, але фільми не знайдено */
{!isLoading && !error && data?.results.length === 0 && (
  <ErrorMessage message="No movies found for this query." />
)}

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


