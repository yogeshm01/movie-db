// src/components/MovieCard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AUTH = process.env.REACT_APP_TMDB_AUTHORIZATION;

const MovieCard = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  const roundedRating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : 'Unknown';

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
    const exists = stored.find((item) => item.id === movie.id);
    setInWatchlist(!!exists);
  }, [movie.id]);

  const fetchTrailer = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${AUTH}`,
        },
      });
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [movie.id]);

  const toggleWatchLater = () => {
    const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
    const exists = stored.find((item) => item.id === movie.id);
    let updated;
    if (exists) {
      updated = stored.filter((item) => item.id !== movie.id);
      alert(`${movie.title} removed from Watch Later.`);
    } else {
      updated = [...stored, movie];
      alert(`${movie.title} added to Watch Later.`);
    }
    localStorage.setItem('watchLater', JSON.stringify(updated));
    setInWatchlist(!inWatchlist);
  };

  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-lg flex flex-col w-56 hover:scale-105 transition-transform duration-300">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative">
          <img
            src={poster}
            alt={movie.title}
            className="w-full object-cover"
            style={{ height: '280px' }}
          />
        </div>
      </Link>

      <div className="bg-[#1a1a1a] text-white px-3 py-3 flex flex-col flex-grow">
        <span className="text-yellow-400 text-sm font-semibold mb-1">
          ⭐ {roundedRating}
        </span>
        <h3 className="text-base font-semibold truncate mb-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-2">Release Date: {releaseDate}</p>

        <div className="mt-auto flex gap-2">
          <button
            onClick={toggleWatchLater}
            className="flex-1 flex items-center justify-center gap-1 bg-[#2d2d2d] text-white px-3 py-2 text-sm rounded hover:bg-[#3d3d3d] transition"
          >
            {inWatchlist ? (
              <>
                <XMarkIcon className="h-4 w-4" /> Remove
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" /> Watchlist
              </>
            )}
          </button>

          {trailerUrl ? (
            <a
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 bg-white text-black px-3 py-2 text-sm rounded hover:bg-gray-200 transition"
            >
              <PlayIcon className="h-4 w-4" />
              Trailer
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1 bg-gray-600 text-white px-3 py-2 text-sm rounded opacity-50 cursor-not-allowed"
            >
              <PlayIcon className="h-4 w-4" />
              No Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;