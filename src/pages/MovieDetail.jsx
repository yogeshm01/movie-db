// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch movie details.');
        }

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.error('Movie Detail Error:', err);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!movie) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={poster}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 mb-2">
            Release Date: {movie.release_date}
          </p>
          <p className="text-gray-400 mb-2">
            Rating: {movie.vote_average} / 10
          </p>
          <p className="text-gray-400 mb-4">{movie.overview}</p>
          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              Official Homepage
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
