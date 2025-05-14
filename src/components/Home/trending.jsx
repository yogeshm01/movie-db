import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MovieCard from "../movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

function Trending() {
    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch trending movies.");
                }

                const data = await response.json();
                if (data?.results) {
                    setTrending(data.results);
                } else {
                    throw new Error("Invalid response format.");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching movies:", err);
            }
        };

        fetchTrendingMovies();
    }, []);

    return (
        <>
            {/* Heading */}
            <div className="flex justify-center items-center mt-14 pt-8">
                <h1 className="text-3xl font-bold text-[#00FFFF] p-4">Trending Movies</h1>
            </div>

            {/* Movie Cards Scrollable */}
            <div className="w-full flex justify-center">
                {error ? (
                    <p className="text-red-500 px-4">{error}</p>
                ) : (
                    <div className="overflow-x-auto max-w-7xl px-4 py-6">
                        <div className="flex gap-4 w-max mx-auto">
                            {trending.slice(0, 10).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                            <Link to="/trending">
                                <div className="min-w-[180px] h-[400px] bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-cyan-700 transition duration-300 shadow-md">
                                    <span className="text-lg font-semibold text-center px-4">See More</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Trending;
