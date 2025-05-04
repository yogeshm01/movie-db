import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const authorization = process.env.REACT_APP_TMDB_AUTHORIZATION;

const TvDetail = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${authorization}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch TV show details.');
        }

        const data = await response.json();
        setTvShow(data);
      } catch (err) {
        console.error('Error fetching TV show:', err);
        setError(err.message);
      }
    };

    fetchTvShow();
  }, [id]);

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      {error && <p className="text-red-500">{error}</p>}
      {tvShow ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{tvShow.name}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
            className="rounded-lg mb-4"
          />
          <p className="mb-4">{tvShow.overview}</p>
          <p className="text-sm text-yellow-400 mb-2">⭐ {tvShow.vote_average?.toFixed(1)} / 10</p>
          <p className="text-sm text-gray-400">First Air Date: {tvShow.first_air_date}</p>
          <p className="text-sm text-gray-400">Seasons: {tvShow.number_of_seasons}</p>
        </div>
      ) : (
        !error && <p>Loading TV show details...</p>
      )}
    </div>
  );
};

export default TvDetail;
