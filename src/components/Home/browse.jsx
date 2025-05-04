import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MovieCard from "../movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

function Browse() {
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch genres.");
                }

                const data = await response.json();
                if (data?.genres) {
                    setGenres([{ id: 'all', name: 'All' }, ...data.genres]); // Add 'All' option to the genre list
                } else {
                    throw new Error("Invalid response format.");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching genres:", err);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`;

            if (selectedGenre !== 'all') {
                url += `&with_genres=${selectedGenre}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch movies.");
                }

                const data = await response.json();
                if (data?.results) {
                    setMovies(data.results);
                } else {
                    throw new Error("Invalid response format.");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching movies:", err);
            }
        };

        fetchMovies();
    }, [selectedGenre]);

    return (
        <>
            <div className="flex justify-center items-center mt-14">
                <h1 className="text-3xl font-bold text-[#00FFFF] p-4">Browse by Genre</h1>
            </div>

            {/* Genre Chips */}
            <div className="flex flex-wrap justify-center gap-4 px-4 py-4">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    genres.map((genre) => {
                        const isSelected = selectedGenre === genre.id;
                        return (
                            <button
                                key={genre.id}
                                onClick={() => setSelectedGenre(genre.id)}
                                className={`
                        px-4 py-2 rounded-full transition-colors duration-200
                        ${isSelected ?
                                        'bg-[#00FFFF] text-black'
                                        : 'bg-gray-600 text-white hover:bg-[#00FFFF] hover:text-black'}
                    `}
                            >
                                {genre.name}
                            </button>
                        );
                    })
                )}
            </div>

            {/* Movie Cards List */}
            <div className="flex-1">
                {error ? (
                    <p className="text-red-500 px-4">{error}</p>
                ) : (
                    <div className="flex justify-center py-6">
                        {movies.length > 0 ? (
                            movies.slice(0,5).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                            
                        ) : (
                            <p>Loading movies...</p>
                        )}
                        <Link to="/upcoming-movies">
                            <div className="w-[180px] h-[400px] bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-cyan-700 transition duration-300 shadow-md">
                                <span className="text-lg font-semibold text-center px-4">See More</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default Browse;
