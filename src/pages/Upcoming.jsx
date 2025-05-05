import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const AUTH = process.env.REACT_APP_TMDB_AUTHORIZATION;

function Upcoming() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async (pageNum = 1) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageNum}`,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${AUTH}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch upcoming movies.");
            }

            const data = await res.json();
            if (data?.results) {
                setMovies((prev) => [...prev, ...data.results]);
            } else {
                throw new Error("Invalid response format.");
            }
        } catch (err) {
            setError(err.message);
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-16 px-4">
            <h1 className="text-4xl font-bold text-center text-[#00FFFF] mb-8 pt-4">Upcoming Movies</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {loading ? (
                <div className="text-center py-8 text-cyan-400">Loading...</div>
            ) : (
                <div className="flex justify-center py-10">
                    <button
                        onClick={handleLoadMore}
                        className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-2 rounded-lg text-lg transition duration-300"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default Upcoming;
