import axios from "axios";
import bcrypt from "bcrypt";

export const getAll = (fetch, page) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/${fetch}?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  );
export const getTrending = (fetch, page) =>
  axios.get(
    `https://api.themoviedb.org/3/trending/${fetch}/week?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  );
export const getTopRated = (fetch, page) =>
  axios.get(
    `https://api.themoviedb.org/3/${fetch}/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  );
export const getUpcomingMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  );
export const getByTitle = (fetch, query) =>
  axios.get(
    `https://api.themoviedb.org/3/search/${fetch}?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  );
export const getByGenreId = (genre, fetch, page) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/${fetch}?api_key=${process.env.TMDB_API_KEY}&with_genres=${genre}&page=${page}`
  );
export const getGenres = (fetch, page) =>
  axios.get(
    `https://api.themoviedb.org/3/genre/${fetch}/list?api_key=${process.env.TMDB_API_KEY}&page=${page}`
  );
export const getMoviesByKeywordId = (keywordId) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_keywords=${keywordId}`
  );
export const getMoviesKeywords = (keyword) =>
  axios.get(
    `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.TMDB_API_KEY}&query=${keyword}`
  );
export const getDetails = (fetch, id) =>
  axios.get(
    `https://api.themoviedb.org/3/${fetch}/${id}?api_key=${process.env.TMDB_API_KEY}`
  );
export const getVideos = (fetch, id) =>
  axios.get(
    `https://api.themoviedb.org/3/${fetch}/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
  );
export const getMovieReviews = (fetch, movieId) =>
  axios.get(
    `https://api.themoviedb.org/3/${fetch}/${movieId}/reviews?api_key=${process.env.TMDB_API_KEY}`
  );
export const getSimilarMovies = (fetch, movieId) =>
  axios.get(
    `https://api.themoviedb.org/3/${fetch}/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}`
  );
export const getRecommendedMovies = (fetch, movieId) =>
  axios.get(
    `https://api.themoviedb.org/3/${fetch}/${movieId}/recommendations?api_key=${process.env.TMDB_API_KEY}`
  );

export async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds (cost factor)
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
}

export async function checkPassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error("Error verifying password:", err);
  }
}
