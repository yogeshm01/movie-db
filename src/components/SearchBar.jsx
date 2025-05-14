// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      // Redirect to /search?query=your_query
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-3 py-2 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
