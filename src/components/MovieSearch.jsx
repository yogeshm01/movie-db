import { useState } from "react";
import { searchMovies } from "../api/fetchApi";

export default function MovieSearch({ setMovies }) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const handleSearch = async () => {
        const data = await searchMovies(query)
        setResult(data);
    }

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {result.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                        {movie.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}