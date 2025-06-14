// src/pages/ActorDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MovieDetail from './MovieDetail';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const ActorDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error('Failed to fetch actor details');
        const data = await res.json();
        setActor(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCredits = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error('Failed to fetch credits');
        const data = await res.json();
        setCredits(data.cast || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchActorDetails();
    fetchCredits();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!actor) return <p className="text-gray-400 text-center mt-10">Loading...</p>;

  const profileUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <img src={profileUrl} alt={actor.name} className="w-full md:w-1/3 rounded-lg" />
        <div>
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">{actor.name}</h1>
          {actor.known_for_department && (
            <p className="text-gray-300 mb-2">Known For: {actor.known_for_department}</p>
          )}
          {actor.birthday && (
            <p className="text-gray-300 mb-2">Born: {actor.birthday}</p>
          )}
          {actor.place_of_birth && (
            <p className="text-gray-300 mb-2">Place of Birth: {actor.place_of_birth}</p>
          )}
          {actor.deathday && (
            <p className="text-red-400 mb-2">Died: {actor.deathday}</p>
          )}
          <p className="text-gray-400 mt-4">{actor.biography || 'Biography not available.'}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Filmography</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {credits.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
        <div className="bg-gray-800 rounded-lg overflow-hidden text-sm hover:bg-gray-700 transition">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-2">
            <p className="font-semibold truncate">{movie.title}</p>
            <p className="text-gray-400 text-xs">
              as {movie.character || 'Unknown'}
            </p>
          </div>
        </div>
      </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
