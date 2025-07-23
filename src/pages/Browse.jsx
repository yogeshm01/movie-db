import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const Browse = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres);
      } catch (err) {
        setError("Failed to load genres.");
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenre, sortBy]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${page}`;
        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch movies.");

        const data = await res.json();

        if (data?.results?.length > 0) {
          setMovies((prev) =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
          if (page >= data.total_pages || data.results.length < 20) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, selectedGenre, sortBy]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="bg-[#111] min-h-screen text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-6 pt-11 sm:text-3xl md:text-4xl lg:text-5xl">
        Browse Movies
      </h1>

      {/* Genre Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() =>
              setSelectedGenre((prev) => (prev === genre.id ? null : genre.id))
            }
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedGenre === genre.id
                ? "bg-cyan-400 text-black"
                : "bg-gray-600 text-white hover:bg-cyan-600"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Newest First</option>
          <option value="release_date.asc">Oldest First</option>
          <option value="original_title.asc">Title A-Z</option>
          <option value="original_title.desc">Title Z-A</option>
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center pl-3">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-center col-span-full">No movies found.</p>
        )}
      </div>

      {/* Load More Button */}
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

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Browse;
