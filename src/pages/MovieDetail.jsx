import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const authorization = process.env.REACT_APP_TMDB_AUTHORIZATION;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authorization}`,
        },
      });
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  return (
    <div className="p-6 text-white">
      {movie ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p>{movie.overview}</p>
          {/* Add poster, rating, genres, etc. */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetail;
