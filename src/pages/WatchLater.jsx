import React, { useEffect, useState } from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import MovieCard from '../components/movieCard';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetical');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // Load watch later movies from localStorage
    const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
    setWatchLaterMovies(stored);
  }, []);

  useEffect(() => {
    // Fetch genre list from TMDb
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const sortMovies = (movies) => {
    const sorted = [...movies];
    switch (sortBy) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.title?.localeCompare(b.title));
      case 'rating':
        return sorted.sort((b, a) => (a.vote_average || 0) - (b.vote_average || 0));
      case 'release':
        return sorted.sort(
          (b, a) => new Date(a.release_date) - new Date(b.release_date)
        );
      case 'runtime':
        return sorted.sort((b, a) => (a.runtime || 0) - (b.runtime || 0));
      default:
        return sorted;
    }
  };

  const filterMovies = (movies) => {
    if (!selectedGenre) return movies;
    return movies.filter((movie) =>
      movie.genre_ids?.includes(Number(selectedGenre))
    );
  };

  const processedMovies = sortMovies(filterMovies(watchLaterMovies));

  return (
    <div className="min-h-screen bg-black text-white pt-16 px-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 pt-11 mb-6">
        <BookmarkIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl font-bold text-cyan-400 text-center sm:text-3xl md:text-4xl lg:text-5xl">
          Watch Later
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 flex-wrap">
        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600"
        >
          <option value="alphabetical">Alphabetical (A–Z)</option>
          <option value="rating">IMDb Rating</option>
          <option value="release">Release Date</option>
          <option value="runtime">Runtime</option>
        </select>

        {/* Genre Chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() =>
                setSelectedGenre((prev) => (prev === genre.id ? null : genre.id))
              }
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedGenre === genre.id
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-white hover:bg-cyan-600'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center pl-3">
  {processedMovies.length > 0 ? (
    processedMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))
  ) : (
    <p className="text-center col-span-full text-gray-400 text-lg">
      No movies found. Try adjusting your filters.
    </p>
  )}
</div>

    </div>
  );
};

export default WatchLater;
