const API_KEY = '4d12250ded3f509fff3ee6a53c61a713'
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
  const data = await res.json();
  return data;
};
