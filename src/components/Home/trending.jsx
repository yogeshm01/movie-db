import React, { useEffect, useState } from "react";
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
            < div className="flex justify-center items-center mt-14" >
                <h1 className="text-3xl font-bold text-[#00FFFF] p-4">Trending Movies</h1>
            </div >

            {/* Movie Cards List */}
            < div className="flex-1" >
                {
                    error ? (
                        <p className="text-red-500 px-4" > {error}</p>
                    ) : (
                        <div className="flex overflow-x-auto space-x-4 px-4 py-6">
                            {trending.length > 0 ? (
                                trending.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))
                            ) : (
                                <p>Loading movies...</p>
                            )}
                        </div>
                    )
                }
            </div >
        </>
    )
}
export default Trending;