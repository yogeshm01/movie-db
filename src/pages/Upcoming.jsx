import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const AUTH = process.env.REACT_APP_TMDB_AUTHORIZATION;

function Upcoming() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        month: "",
        adult: "",
        language: "",
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
        return movieList.filter((movie) => {
            const releaseMonth = movie.release_date?.split("-")[1];
            const matchesMonth = filterState.month ? releaseMonth === filterState.month : true;
            const matchesAdult = filterState.adult ? (filterState.adult === "Yes") === movie.adult : true;
            const matchesLang = filterState.language ? movie.original_language === filterState.language : true;
            return matchesMonth && matchesAdult && matchesLang;
        });
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
        const months = new Set();
        const adult = new Set();
        const langs = new Set();

        movies.forEach(movie => {
            const month = movie.release_date?.split("-")[1];
            if (month) months.add(month);
            adult.add(movie.adult ? "Yes" : "No");
            langs.add(movie.original_language);
        });

        const monthList = Array.from(months).sort().map(m => ({
            value: m,
            label: new Date(0, parseInt(m) - 1).toLocaleString('default', { month: 'long' })
        }));

        return {
            months: monthList,
            adult: Array.from(adult).sort(),
            languages: Array.from(langs).sort()
        };
    };

    const { months, adult, languages } = getAvailableFilterValues();

    return (
        <div className="min-h-screen bg-black text-white pt-16 px-4">
            <h1 className="text-4xl font-bold text-cyan-400 text-center mb-6 pt-11 sm:text-3xl md:text-4xl lg:text-5xl">
                Upcoming Movies
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {/* Month */}
                <select
                    name="month"
                    value={filters.month}
                    onChange={handleFilterChange}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    <option value="">All Months</option>
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>

                {/* Adult */}
                <select
                    name="adult"
                    value={filters.adult}
                    onChange={handleFilterChange}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    <option value="">All Ratings</option>
                    {adult.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>

                {/* Language */}
                <select
                    name="language"
                    value={filters.language}
                    onChange={handleFilterChange}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                    <option value="">All Languages</option>
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                    ))}
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
