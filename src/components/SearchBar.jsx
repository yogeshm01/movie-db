import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const authorization = process.env.REACT_APP_TMDB_AUTHORIZATION;

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Debounce API calls
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`,
            {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${authorization}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch search results.');
          }

          const data = await response.json();
          setResults(data.results || []);
        } catch (err) {
          console.error('Search error:', err);
          setResults([]);
        }
      };

      fetchResults();
    }, 500); // debounce delay (ms)

    setTimeoutId(newTimeout);
  }, [query]);

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* Search Input and Button */}
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Search movies or TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 bg-[#2c2c2c] text-white text-base rounded-l-md focus:outline-none focus:bg-[#3c3c3c] border-none"
        />
        <button
          type="submit"
          className="bg-cyan-300 text-[#121212] px-4 py-2 rounded-r-md hover:bg-[#00CED1] cursor-pointer"
          onClick={() => {
            if (query.trim() !== '') {
              // Navigate to the search results or handle the search
              // You can also clear query or trigger another action
              setQuery('');
            }
          }}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="absolute bg-[#2c2c2c] border border-[#3c3c3c] mt-2 w-full max-h-80 overflow-y-auto rounded-md shadow-lg z-10">
          {results.map((item) => (
            <Link
              to={`/${item.media_type}/${item.id}`} // customize routing
              key={item.id}
              className="block px-4 py-2 hover:bg-[#3c3c3c] text-white"
              onClick={() => setQuery('')}
            >
              {item.title || item.name}
              <span className="ml-2 text-sm text-[#cccccc]">({item.media_type})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
