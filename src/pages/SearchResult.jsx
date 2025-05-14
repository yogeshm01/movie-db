// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/movieCard';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch search results.');
        }

        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
        console.error('Search Error:', err);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4">
      <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
        Search Results for: <span className="text-white">{query}</span>
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
