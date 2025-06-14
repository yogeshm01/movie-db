import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const options = [
    { label: "Today", value: "day" },
    { label: "This Week", value: "week" },
];

function Trending() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [timeWindow, setTimeWindow] = useState("week"); 

  useEffect(() => {
      setMovies([]);
      setPage(1);
      setHasMore(true);
  }, [timeWindow]);

  useEffect(() => {
      const fetchTrendingMovies = async () => {
          setLoading(true);
          try {
              const response = await fetch(
                  `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${page}`
              );

              if (!response.ok) {
                  throw new Error("Failed to fetch trending movies.");
              }

              const data = await response.json();

              if (data?.results?.length > 0) {
                  setMovies((prevMovies) =>
                      page === 1 ? data.results : [...prevMovies, ...data.results]
                  );
                  if (page >= data.total_pages || data.results.length < 20) {
                      setHasMore(false);
                  }
              } else {
                  setHasMore(false);
              }
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchTrendingMovies();
  }, [page, timeWindow]);

  const loadMore = () => {
      setPage((prev) => prev + 1);
  };

  return (
      <div className="min-h-screen bg-black text-white pt-16 px-4">
          <h1 className="text-4xl font-bold text-cyan-400 text-center mb-6 pt-11 sm:text-3xl md:text-4xl lg:text-5xl">
              Trending Movies
          </h1>

          {/* Filter Chips */}
          <div className="flex justify-center space-x-4 mb-8 flex-wrap">
              {["day", "week"].map((window) => (
                  <button
                      key={window}
                      onClick={() => setTimeWindow(window)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                          timeWindow === window
                              ? "bg-cyan-500 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-cyan-600 hover:text-white"
                      }`}
                  >
                      {window === "day" ? "Today" : "This Week"}
                  </button>
              ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Movie Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 gap-x-0">

              {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>

          {/* Load More */}
          {hasMore && !loading && (
              <div className="flex justify-center mt-10">
                  <button
                      onClick={loadMore}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg text-lg transition shadow-md"
                  >
                      Load More
                  </button>
              </div>
          )}

          {/* Loading Spinner */}
          {loading && (
              <div className="text-center mt-6 text-cyan-300">Loading...</div>
          )}
      </div>
  );
}

export default Trending;
