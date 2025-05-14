import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MovieCard from "../movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const authorization = process.env.REACT_APP_TMDB_AUTHORIZATION;

function Upcoming() {
    const [upcoming, setUpcoming] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${authorization}`,
                    }
                };

                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch upcoming movies.");
                }

                const data = await response.json();
                if (data?.results) {
                    setUpcoming(data.results);
                } else {
                    throw new Error("Invalid response format.");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching movies:", err);
            }
        };

        fetchUpcomingMovies();
    }, []);


    return (
        <>
            {/* Heading */}
            < div className="flex justify-center items-center mt-14" >
                <h1 className="text-3xl font-bold text-[#00FFFF] p-4">Upcoming Movies</h1>
            </div >

            {/* Movie Cards List */}
            <div className="w-full flex justify-center">
                {error ? (
                    <p className="text-red-500 px-4">{error}</p>
                ) : (
                    <div className="overflow-x-auto max-w-7xl px-4 py-6">
                        <div className="flex gap-4 w-max mx-auto">
                            {upcoming.slice(0, 10).map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                            <Link to="/upcoming-movies">
                                <div className="min-w-[180px] h-[400px] bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-cyan-700 transition duration-300 shadow-md">
                                    <span className="text-lg font-semibold text-center px-4">See More</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                )
                }
            </div>
        </>
    )
}
export default Upcoming;