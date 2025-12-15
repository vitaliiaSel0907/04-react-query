import axios from "axios";
import type { Movie } from "../types/movie";


export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Токен
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;


export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });

  return data;
};

