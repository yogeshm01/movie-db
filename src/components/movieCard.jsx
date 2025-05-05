import React from 'react';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid';

const MovieCard = ({ movie }) => {
  const roundedRating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-lg flex flex-col w-56"> {/* wider card */}
      {/* Poster with tagline */}
      <div className="relative">
        <img
          src={poster}
          alt={movie.title}
          className="w-full object-cover"
          style={{ height: '280px' }} 
        />
      </div>

      {/* Movie Info */}
      <div className="bg-[#1a1a1a] text-white px-3 py-3 flex flex-col flex-grow">
        <span className="text-yellow-400 text-sm font-semibold mb-1">⭐ {roundedRating}</span>
        <h3 className="text-base font-semibold truncate mb-2">{movie.title}</h3>

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 bg-[#2d2d2d] text-white px-3 py-2 text-sm rounded hover:bg-[#3d3d3d] transition">
            <PlusIcon className="h-4 w-4" />
            Watchlist
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 bg-white text-black px-3 py-2 text-sm rounded hover:bg-gray-200 transition">
            <PlayIcon className="h-4 w-4" />
            Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
