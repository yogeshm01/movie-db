// src/pages/WatchLater.jsx
import React, { useEffect, useState } from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import MovieCard from '../components/movieCard';

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
    setWatchLaterMovies(stored);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <BookmarkIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-3xl font-bold">Watch Later</h1>
      </div>

      {watchLaterMovies.length === 0 ? (
        <p className="text-gray-400 text-lg">No movies added yet. Start adding your favorites!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchLaterMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
