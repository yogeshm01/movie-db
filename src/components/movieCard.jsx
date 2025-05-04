import React from 'react';

const MovieCard = ({ movie }) => {

  const roundedRating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="bg-gray-900 rounded-lg p-2 w-48 flex-shrink-0 flex flex-col h-100">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="rounded w-full"
        />
        <h3 className="text-sm mt-2 min-h-[2.5rem]">{movie.title}</h3> 
      </div>
      <div className="mt-auto">
        <p className="text-yellow-400 text-xs mb-2">⭐ {roundedRating}</p>
        <div className="flex flex-col gap-2">
          <button className="bg-[#00FFFF] text-black px-2 py-1 text-xs rounded">+ Watchlist</button>
          <button className="bg-gray-700 text-white px-2 py-1 text-xs rounded">▶ Trailer</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
