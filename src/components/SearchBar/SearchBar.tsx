import React from "react";
import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleAction = (formData: FormData) => {
    const query = formData.get("query");

    if (typeof query !== "string" || !query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  };

  return (
     <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} action={handleAction}>
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoComplete="off"
            autoFocus
          />

          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};


export default SearchBar;