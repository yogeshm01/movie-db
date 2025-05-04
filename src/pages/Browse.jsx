import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const Browse = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=1`;

      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    };

    fetchMovies();
  }, [selectedGenre, sortBy]);

  return (
    <div className="bg-[#111] min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold text-[#00FFFF] mb-7 text-center pt-12 mt-8">
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
                : "bg-gray-600"
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-[360px] object-cover"
              />
              <div className="p-3">
                <h3 className="text-md font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.release_date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
