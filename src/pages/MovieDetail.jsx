// src/pages/MovieDetail.jsx
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import MovieCard from '../components/movieCard';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const castScrollRef = useRef(null);

  const scroll = (offset) => {
    if (castScrollRef.current) {
      castScrollRef.current.scrollLeft += offset;
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [detailRes, creditRes, videoRes, recRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`)
        ]);

        if (!detailRes.ok) throw new Error('Failed to fetch movie details.');
        const detailData = await detailRes.json();
        setMovie(detailData);

        const creditData = await creditRes.json();
        setCast(creditData.cast.slice(0, 10));

        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || '');

        const recData = await recRes.json();
        setRecommendations(recData.results.slice(0, 10));
      } catch (err) {
        setError(err.message);
        console.error('Movie Detail Error:', err);
      }
    };

    fetchMovieData();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!movie) return <p className="text-center text-gray-400">Loading...</p>;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={poster}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && <p className="italic text-gray-400 mb-2">"{movie.tagline}"</p>}
          <p className="text-gray-400 mb-2">Release Date: {movie.release_date}</p>
          <p className="text-gray-400 mb-2">Rating: {movie.vote_average?.toFixed(1)}</p>
          <p className="text-gray-400 mb-2">
            Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </p>
          <p className="text-gray-400 mb-2">
            Genres: {movie.genres.map((g) => g.name).join(', ')}
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

      {trailerKey && (
        <div className="max-w-4xl mx-auto mt-10">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
              className="w-full h-96 rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {cast.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 text-center">Top Cast</h2>
          <div className="relative">
            <button
              onClick={() => scroll(-300)}
              className="absolute -left-8 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-md z-10 hover:bg-cyan-500"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <div
              ref={castScrollRef}
              className="flex overflow-x-auto space-x-4 pb-4 px-8 scroll-smooth"
            >
              {cast.map((actor) => (
                <Link key={actor.id} to={`/actor/${actor.id}`}>
                  <div className="w-32 flex-shrink-0 bg-gray-800 rounded-lg p-2 text-center hover:bg-gray-700 transition">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : 'https://via.placeholder.com/185x278?text=No+Image'
                      }
                      alt={actor.name}
                      className="w-full h-44 object-cover rounded"
                    />
                    <p className="text-sm mt-1 font-semibold">{actor.name}</p>
                    <p className="text-xs text-gray-400">as {actor.character}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button
              onClick={() => scroll(300)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full shadow-md z-10 hover:bg-cyan-500"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recommendations.map((recMovie) => (
              <MovieCard key={recMovie.id} movie={recMovie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
