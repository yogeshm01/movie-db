import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useState } from 'react';

function NavBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="bg-[#121212] px-8 py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center h-8 w-auto">
                    <Link to="/" className="flex items-center no-underline text-cyan-300 text-xl font-bold">
                        <img
                            src="assets/MovieDB4.png"
                            alt="Movie DB Logo"
                            className="w-[8vw] h-full rounded-md mr-2"
                        />
                    </Link>
                </div>

                {/* Search bar */}
                {/* <div className="flex-1 max-w-[600px] mx-8">
                    <form onSubmit={handleSubmit} className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#2c2c2c] text-white text-base rounded-l-md focus:outline-none focus:bg-[#3c3c3c] border-none"
                        />
                        <button
                            type="submit"
                            className="bg-cyan-300 text-[#121212] px-4 py-2 rounded-r-md hover:bg-[#00CED1] cursor-pointer"
                        >
                            Search
                        </button>
                    </form>
                </div> */}
                <div className="flex-1 max-w-[600px] mx-8">
                    <SearchBar />
                </div>

                {/* Navigation Links */}
                <div className="text-white">
                    <ul className="flex gap-8 list-none m-0 p-0">
                        <li>
                            <Link to="/trending" className="text-white text-base font-medium hover:text-cyan-300 transition hover:scale-105 focus:border-b-2 focus:border-cyan-300">
                                Trending
                            </Link>
                        </li>
                        <li>
                            <Link to="/browse" className="text-white text-base font-medium hover:text-cyan-300 transition hover:scale-105 focus:border-b-2 focus:border-cyan-300">
                                Browse
                            </Link>
                        </li>
                        <li>
                            <Link to="/upcoming-movies" className="text-white text-base font-medium hover:text-cyan-300 transition hover:scale-105 focus:border-b-2 focus:border-cyan-300">
                                Upcoming Movies
                            </Link>
                        </li>
                        <li>
                            <Link to="/watch-later" className="text-white text-base font-medium hover:text-cyan-300 transition hover:scale-105 focus:border-b-2 focus:border-cyan-300">
                                Watch Later
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
