import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjAwNjQ5NmY3YmQ0NGY2NDRiNzI1N2UxZGFlMDkzYyIsIm5iZiI6MTc2NDk0ODM3NS41MTUsInN1YiI6IjY5MzJmOTk3MjEwMmIyMGVmMzM2ZTU2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.250EL6USHXWcuSRUg19HLAdYkCjC_L2-5D-D5-WYbp8";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });

  return data;
};
