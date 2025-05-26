import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import dayjs from "dayjs";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const AUTH = process.env.REACT_APP_TMDB_AUTHORIZATION;

function Upcoming() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        monthYear: "",
        sortBy: "popularity", // default
    });

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
                const newMovies = [...movies, ...data.results];
                setMovies(newMovies);
                setFilteredMovies(applyFilters(newMovies, filters));
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

    const applyFilters = (movieList, filterState) => {
        const today = dayjs();

        let filtered = movieList.filter((movie) => {
            const releaseDate = dayjs(movie.release_date);
            return releaseDate.isValid() && !releaseDate.isBefore(today, "day");
        });

        if (filterState.monthYear) {
            filtered = filtered.filter((movie) => {
                const [year, month] = movie.release_date?.split("-") || [];
                return `${month}-${year}` === filterState.monthYear;
            });
        }

        if (filterState.sortBy === "alphabet") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            filtered.sort((a, b) => b.popularity - a.popularity);
        }

        return filtered;
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        setFilteredMovies(applyFilters(movies, updatedFilters));
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    const getAvailableFilterValues = () => {
        const monthYears = new Set();
        const today = dayjs();

        movies.forEach((movie) => {
            const releaseDate = dayjs(movie.release_date);
            if (releaseDate.isValid() && !releaseDate.isBefore(today, "day")) {
                const month = releaseDate.format("MM");
                const year = releaseDate.format("YYYY");
                monthYears.add(`${month}-${year}`);
            }
        });

        const monthList = Array.from(monthYears)
            .sort((a, b) => new Date(`01-${a}`) - new Date(`01-${b}`))
            .map((m) => {
                const [month, year] = m.split("-");
                const label = `${new Date(0, parseInt(month) - 1).toLocaleString("default", {
                    month: "long",
                })} ${year}`;
                return {
                    value: m,
                    label,
                };
            });

        return {
            monthYears: monthList,
        };
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { monthYears } = getAvailableFilterValues();

    return (
        <div className="min-h-screen bg-black text-white pt-16 px-4">
            <h1 className="text-4xl font-bold text-cyan-400 text-center mb-6 pt-11 sm:text-3xl md:text-4xl lg:text-5xl">
                Upcoming Movies
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {/* Month-Year Filter */}
                <select
                    name="monthYear"
                    value={filters.monthYear}
                    onChange={handleFilterChange}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    <option value="">All Dates</option>
                    {monthYears.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>

                {/* Sort By */}
                <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    <option value="popularity">Sort by Popularity</option>
                    <option value="alphabet">Sort Alphabetically</option>
                </select>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Load More */}
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
